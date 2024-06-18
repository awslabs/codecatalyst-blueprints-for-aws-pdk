import { execSync } from 'child_process';
import {
  Blueprint,
  MergeStrategies,
  SourceFile, SourceRepository, BlueprintSynthesisError, BlueprintSynthesisErrorTypes,
} from '@amazon-codecatalyst/blueprints';
import { CloudscapeReactTsWebsiteProject } from '@aws/pdk/cloudscape-react-ts-website';
import {
  InfrastructureJavaProject,
  InfrastructurePyProject,
  InfrastructureTsProject,
} from '@aws/pdk/infrastructure';
import {
  LicenseOptions,
  MonorepoJavaProject,
  MonorepoPythonProject,
  MonorepoTsProject,
} from '@aws/pdk/monorepo';
import {
  DocumentationFormat,
  Language,
  Library,
  ModelLanguage,
  SmithyModelOptions,
  TypeSafeApiProject,
} from '@aws/pdk/type-safe-api';
import * as Mustache from 'mustache';

import { Component, Project, SampleReadme } from 'projen';
import { NodePackageManager, NpmConfig, YarnNodeLinker } from 'projen/lib/javascript';
import { projenrcMap } from './projen-template';

const INFRA_OUTDIR = 'packages/infra/main';
const YARN_VERSION = '4.1.0';

export type DocumentationFormats = 'HTML_REDOC' | 'HTML2' | 'MARKDOWN' | 'PLANTUML';
export type LanguageOptions = 'TypeScript' | 'Java' | 'Python';

interface MonorepoOptions {
  readonly primaryLanguage: 'TypeScript' | 'Java' | 'Python';
  readonly packageManager?: 'BUN' | 'PNPM' | 'YARN_BERRY' | 'NPM';
  readonly projen: boolean;
  readonly licenseOptions?: LicenseOptions;
}

interface ApiOptions {
  cdkLanguage: LanguageOptions;
  handlerLanguages: LanguageOptions[];
  documentationFormats: DocumentationFormats[];
  modelLanguage: 'Smithy' | 'OpenAPI';
  namespace: string;
  apiName: string;
}

interface WebsiteOptions {
  websiteName: string;
  typeSafeApis: string[];
}

interface InfraOptions {
  language: 'TypeScript' | 'Java' | 'Python';
  stackName: string;
  allowSelfRegistration: boolean;
  typeSafeApis: string[];
  cloudscapeReactTsWebsites: string[];
}

export interface Options {
  monorepo: MonorepoOptions;

  api?: ApiOptions[];

  infra?: InfraOptions;

  website?: WebsiteOptions[];
}

export class PDKSynth extends Component {
  private readonly sourceRepository: SourceRepository;
  private readonly options: Options;

  constructor(project: Blueprint, sourceRepository: SourceRepository, projectName: string, options: Options) {
    if (options.monorepo.projen === false) {
      process.env.PROJEN_EJECTING = '1';
    }
    super(project);

    this.sourceRepository = sourceRepository;
    this.options = options;

    // Copy language specific projenrc
    const projenRcFile = projenrcMap[this.options.monorepo.primaryLanguage.toLowerCase()];
    new SourceFile(
      this.sourceRepository,
      projenRcFile.path,
      Mustache.render(projenRcFile.content, {
        hasInfra: this.options.infra,
        isYarnBerry: this.getPackageManager() === NodePackageManager.YARN_BERRY,
        yarnBerryOptions: `{
          yarnRcOptions: {
            yarnPath: ".yarn/releases/yarn-${YARN_VERSION}.cjs",
            nodeLinker: javascript.YarnNodeLinker.PNPM,
          },
        }`,
        packageManager: this.options.monorepo.packageManager,
        typeSafeApis: this.options.api?.map(api => ({
          isSmithy: this.getModelLanguage(api) === ModelLanguage.SMITHY,
          apiNamespace: api.namespace,
          apiName: api.apiName,
          apiNameLowercase: this.sanitizeName(api.apiName),
          apiModelLanguage: `ModelLanguage.${this.getModelLanguage(api)}`,
          apiCdkLanguage: `Language.${this.getApiCdkLanguage(api).toUpperCase()}`,
          apiHandlerLanguages: this.getApiHandlerLanguages(api).map(e => `Language.${e.toUpperCase()}`).join(', '),
          apiDocumentationFormats: this.getDocumentationFormats(api).map(e => `DocumentationFormat.${e.toUpperCase()}`).join(', '),
          hasApiDocumentation: this.getDocumentationFormats(api).length > 0,
        })),
        cloudscapeReactTsWebsiteNames: this.options.website
          ?.map(c => this.sanitizeName(c.websiteName))
          .join(', '),
        typeSafeApiNames: this.options.api
          ?.map(t => this.sanitizeName(t.apiName))
          .join(', '),
        cloudscapeReactTsWebsites: this.options.website?.map(csWebsite => ({
          websiteName: csWebsite.websiteName,
          websiteNameLowercase: this.sanitizeName(csWebsite.websiteName),
          typeSafeApiNames: csWebsite.typeSafeApis
            .map(api => this.sanitizeName(api))
            .join(', '),
        })),
      }),
    );

    this.sourceRepository.setResynthStrategies([{
      globs: ['.projen/*', '**/.projen/*', '**/.git*', '.git*', '.projenrc*', '**/projenrc*', 'package.json', '**/package.json', 'project.json', '**/project.json', 'pnpm-workspace.yaml', 'pnpm-lock.yaml', 'yarn.lock', 'package-lock.json', 'bun.lockb', 'poetry.lock', '**/poetry.lock'],
      identifier: `${projectName}-alwaysUpdate`,
      strategy: MergeStrategies.alwaysUpdate,
    }, {
      globs: ['README.md', '**/README.md'],
      identifier: `${projectName}-onlyAdd`,
      strategy: MergeStrategies.onlyAdd,
    }]);
  }

  synthesize(): void {
    switch (this.options.monorepo.primaryLanguage) {
      case 'TypeScript':
        this.synthTypescriptBlueprint();
        break;
      case 'Java':
        this.synthJavaBlueprint();
        break;
      case 'Python':
        this.synthPythonBlueprint();
        break;
      default:
        new Error('Not implemented!');
    }

    // Generate lockfile only if a DEVOPS blueprint exists to improve initial performance
    // TODO: Uncomment
    this.renderLockfileCommand();
    // execSync(this.renderLockfileCommand()!, {
    //   cwd: this.sourceRepository.path,
    //   stdio: [0, 1, 1],
    // });

    super.synthesize();
  }

  private deleteDefaultMonorepoReadme(project: Project) {
    const readmeConstructId = project.components.find(c => c instanceof SampleReadme)?.node.id;
    readmeConstructId && project.node.tryRemoveChild(readmeConstructId);
  }

  private synthWithoutPostInstall(project: Project) {
    process.env.PROJEN_DISABLE_POST = 'true';
    this.deleteDefaultMonorepoReadme(project);
    project.synth();
    process.env.PROJEN_DISABLE_POST = 'false';
  }

  private synthTypescriptBlueprint() {
    const monorepo = new MonorepoTsProject({
      outdir: this.sourceRepository.path,
      name: 'monorepo',
      packageManager: this.getPackageManager(),
      yarnBerryOptions: {
        yarnRcOptions: {
          yarnPath: `.yarn/releases/yarn-${YARN_VERSION}.cjs`,
          nodeLinker: YarnNodeLinker.PNPM,
        },
      },
      licenseOptions: this.options.monorepo.licenseOptions,
      projenrcTs: true,
    });

    if (this.getPackageManager() === NodePackageManager.NPM) {
      const config: NpmConfig = monorepo.components.find((c) => c instanceof NpmConfig) as NpmConfig | undefined ?? new NpmConfig(monorepo);
      config.addConfig('legacy-peer-deps', 'true');
    }

    const apis = this.createTypeSafeApiProjects(monorepo);
    const websites = this.createCloudscapeReactTsWebsiteProjects(monorepo, apis);
    this.createInfrastructureProject(monorepo, { websites, apis });

    if (this.getPackageManager() === NodePackageManager.YARN_BERRY) {
      execSync(`YARN_IGNORE_NODE=1 npx -y yarn set version ${YARN_VERSION}`, {
        cwd: this.sourceRepository.path,
        stdio: [0, 1, 1],
      });
    } else {
      delete monorepo.package.manifest.packageManager;
    }

    this.synthWithoutPostInstall(monorepo);
  }

  private renderLockfileCommand(): string {
    return `${this.renderTypescriptLockfileCommand()} && ${this.renderPythonLockfileCommand()}`;
  }

  private renderPythonLockfileCommand(): string {
    return [
      'curl -sSL https://install.python-poetry.org | LD_LIBRARY_PATH="" python3.11',
      // find is not installable so have to implement our own :(
      // list all directories containing a pyproject.toml and call poetry lock
      'for _DIR in `ls -R . | awk \'/:$/&&f{s=$0;f=0}/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}NF&&f{ print s"/"$0 }\' | grep pyproject.toml | awk \'{sub(/pyproject.toml/,""); print}\'`; do bash -c "cd $_DIR && PATH=$PATH:$HOME/.local/bin LD_LIBRARY_PATH="" poetry lock"; done;',
    ].join(' && ');
  }

  private renderTypescriptLockfileCommand() {
    switch (this.getPackageManager()) {
      case NodePackageManager.YARN_BERRY:
        return 'YARN_IGNORE_NODE=1 YARN_ENABLE_SCRIPTS=false npx -y yarn install --mode update-lockfile';
      case NodePackageManager.NPM:
        // Need to install twice due to https://github.com/npm/cli/issues/6787
        return 'npm config set ignore-scripts true && npx -y npm@9.6.7 install --package-lock-only --legacy-peer-deps && npx -y npm@9.6.7 install --package-lock-only --legacy-peer-deps';
      case NodePackageManager.PNPM:
        return 'npx -y pnpm config set link-workspace-packages true && npx -y pnpm@8 i --lockfile-only --ignore-scripts';
      case NodePackageManager.BUN:
        return 'npx -y bun install --ignore-scripts && rm -rf node_modules **/node_modules';
      default:
        (this.project as Blueprint).throwSynthesisError(new BlueprintSynthesisError({
          message: `Unsupported package manager: ${this.getPackageManager()}`,
          type: BlueprintSynthesisErrorTypes.ValidationError,
        }));
        return undefined;
    }
  }

  private synthJavaBlueprint() {
    const monorepo = new MonorepoJavaProject({
      outdir: this.sourceRepository.path,
      name: 'monorepo',
      disableDefaultLicenses: this.options.monorepo.licenseOptions?.disableDefaultLicenses,
    });

    const apis = this.createTypeSafeApiProjects(monorepo);
    const websites = this.createCloudscapeReactTsWebsiteProjects(monorepo, apis);
    this.createInfrastructureProject(monorepo, { websites, apis });

    this.synthWithoutPostInstall(monorepo);
  }

  private synthPythonBlueprint() {
    const monorepo = new MonorepoPythonProject({
      outdir: this.sourceRepository.path,
      name: 'monorepo',
      moduleName: 'monorepo',
      licenseOptions: this.options.monorepo.licenseOptions,
    });

    const apis = this.createTypeSafeApiProjects(monorepo);
    const websites = this.createCloudscapeReactTsWebsiteProjects(monorepo, apis);
    this.createInfrastructureProject(monorepo, { websites, apis });

    this.synthWithoutPostInstall(monorepo);
  }

  private getModelLanguage(options: ApiOptions): ModelLanguage {
    return options.modelLanguage === 'Smithy'
      ? ModelLanguage.SMITHY
      : ModelLanguage.OPENAPI;
  }

  private getDocumentationFormats(options: ApiOptions): DocumentationFormat[] {
    return options.documentationFormats.map(d => {
      switch (d) {
        case 'HTML_REDOC':
          return DocumentationFormat.HTML_REDOC;
        case 'HTML2':
          return DocumentationFormat.HTML2;
        case 'MARKDOWN':
          return DocumentationFormat.MARKDOWN;
        case 'PLANTUML':
          return DocumentationFormat.PLANTUML;
        default:
          throw Error(`Unknown documentation format: ${d}`);
      }
    });
  }

  private getApiCdkLanguage(options: ApiOptions): Language {
    return this.getLanguage(options.cdkLanguage);
  }

  private getApiHandlerLanguages(options: ApiOptions): Language[] {
    return options.handlerLanguages.map(e => this.getLanguage(e as string));
  }

  private getLanguage(lang: string): Language {
    switch (lang) {
      case 'TypeScript':
        return Language.TYPESCRIPT;
      case 'Java':
        return Language.JAVA;
      case 'Python':
        return Language.PYTHON;
      default:
        throw Error(`Unknown language: ${lang}`);
    }
  }

  private getPackageManager(): NodePackageManager {
    switch (this.options.monorepo.packageManager) {
      case 'BUN':
        return NodePackageManager.BUN;
      case 'YARN_BERRY':
        return NodePackageManager.YARN_BERRY;
      case 'NPM':
        return NodePackageManager.NPM;
      case 'PNPM':
      default:
        return NodePackageManager.PNPM;
    }
  }

  private renderSmithyOptions(options: ApiOptions): SmithyModelOptions | undefined {
    return this.getModelLanguage(options) === ModelLanguage.SMITHY
      ? {
        serviceName: {
          namespace: options.namespace,
          serviceName: options.apiName,
        },
      }
      : undefined;
  }

  private renderOpenApiOptions(options: ApiOptions) {
    return this.getModelLanguage(options) === ModelLanguage.OPENAPI
      ? {
        title: `${options.namespace}.${options.apiName}`,
      }
      : undefined;
  }

  private createInfrastructureProject(parent: Project, props: { websites?: CloudscapeReactTsWebsiteProject[]; apis?: TypeSafeApiProject[] }): void {
    switch (this.options.infra?.language) {
      case 'TypeScript':
        new InfrastructureTsProject({
          parent,
          outdir: INFRA_OUTDIR,
          name: 'infra',
          allowSignup: this.options.infra.allowSelfRegistration,
          cloudscapeReactTsWebsites: props.websites?.filter(w => (this.options.infra?.cloudscapeReactTsWebsites || [])
            .find(v => v.toLowerCase() === w.name.toLowerCase())),
          typeSafeApis: props.apis?.filter(w => (this.options.infra?.typeSafeApis || [])
            .find(v => v.toLowerCase() === w.model.apiName?.toLowerCase())),
          stackName: this.options.infra?.stackName,
        });
        break;
      case 'Java':
        new InfrastructureJavaProject({
          parent,
          outdir: INFRA_OUTDIR,
          name: 'infra',
          allowSignup: this.options.infra.allowSelfRegistration,
          cloudscapeReactTsWebsites: props.websites?.filter(w => (this.options.infra?.cloudscapeReactTsWebsites || [])
            .find(v => v.toLowerCase() === w.name.toLowerCase())),
          typeSafeApis: props.apis?.filter(w => (this.options.infra?.typeSafeApis || [])
            .find(v => v.toLowerCase() === w.model.apiName?.toLowerCase())),
          stackName: this.options.infra?.stackName,
        });
        break;
      case 'Python':
        new InfrastructurePyProject({
          parent,
          outdir: INFRA_OUTDIR,
          name: 'infra',
          allowSignup: this.options.infra.allowSelfRegistration,
          cloudscapeReactTsWebsites: props.websites?.filter(w => (this.options.infra?.cloudscapeReactTsWebsites || [])
            .find(v => v.toLowerCase() === w.name.toLowerCase())),
          typeSafeApis: props.apis?.filter(w => (this.options.infra?.typeSafeApis || [])
            .find(v => v.toLowerCase() === w.model.apiName?.toLowerCase())),
          stackName: this.options.infra?.stackName,
        });
        break;
      default:
        break;
    }
  }

  private createTypeSafeApiProjects(
    parent: Project,
  ): TypeSafeApiProject[] {
    return (this.options.api ?? [])
      .map(options => {
        const lowercasePackageName = this.sanitizeName(options.apiName);
        return new TypeSafeApiProject({
          parent,
          outdir: `packages/apis/${lowercasePackageName}`,
          name: `${lowercasePackageName}`,
          infrastructure: {
            language: this.getApiCdkLanguage(options),
          },
          model: {
            language: this.getModelLanguage(options),
            options: {
              smithy: this.renderSmithyOptions(options),
              openapi: this.renderOpenApiOptions(options),
            },
          },
          documentation: {
            formats: this.getDocumentationFormats(options),
          },
          library: {
            libraries: [Library.TYPESCRIPT_REACT_QUERY_HOOKS],
          },
          handlers: {
            languages: this.getApiHandlerLanguages(options),
          },
        });
      });
  }

  private createCloudscapeReactTsWebsiteProjects(
    parent: Project,
    apis?: TypeSafeApiProject[],
  ): CloudscapeReactTsWebsiteProject[] {
    return (this.options.website ?? [])
      .map(options => {
        const websiteName = this.sanitizeName(options.websiteName);

        return new CloudscapeReactTsWebsiteProject({
          parent,
          outdir: `packages/websites/${websiteName}`,
          name: websiteName,
          allowSignup: this.options.infra?.allowSelfRegistration,
          applicationName: options.websiteName,
          typeSafeApis: apis?.filter(api => options.typeSafeApis
            .find((api2) => api2 === api.model.apiName)),
        });
      });
  }

  private sanitizeName(name: string) {
    return name.replace(/[^a-z0-9_]+/gi, '')
      .replace(/^[0-9]+/gi, '')
      .toLowerCase();
  }
}
