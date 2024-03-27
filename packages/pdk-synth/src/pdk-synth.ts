// import { execSync } from 'child_process';
import { execSync } from 'child_process';
import {
  Blueprint,
  MergeStrategies,
  Options as BlueprintOptions,
  SourceFile, SourceRepository, BlueprintSynthesisError, BlueprintSynthesisErrorTypes, MultiSelect, BlueprintInstantiation,
} from '@amazon-codecatalyst/blueprints';
import { CloudscapeReactTsWebsiteProject } from '@aws/pdk/cloudscape-react-ts-website';
import {
  InfrastructureJavaProject,
  InfrastructurePyProject,
  InfrastructureTsProject,
} from '@aws/pdk/infrastructure';
import {
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
import { NodePackageManager, YarnNodeLinker } from 'projen/lib/javascript';
import { projenrcMap } from './projen-template';

const INFRA_OUTDIR = 'packages/infra/main';
const YARN_VERSION = '4.1.0';

const DEVOPS_PACKAGE = '@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-devops';
const MONOREPO_PACKAGE = '@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-monorepo';
const TYPESAFE_API_PACKAGE = '@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-type-safe-api';
const WEBSITE_PACKAGE = '@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-cloudscape-react-website';
const INFRA_PACKAGE = '@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-infra';

export type DocumentationFormats = 'HTML_REDOC' | 'HTML2' | 'MARKDOWN' | 'PLANTUML';
export type LanguageOptions = 'Typescript' | 'Java' | 'Python';

interface MonorepoOptions {
  readonly primaryLanguage: 'Typescript' | 'Java' | 'Python';
  readonly code: {
    readonly packageManager: 'BUN' | 'PNPM' | 'YARN_BERRY' | 'NPM';
  };
}

interface ApiOptions {
  cdkLanguage: LanguageOptions;
  handlerLanguages: MultiSelect<LanguageOptions>;
  documentationFormats: MultiSelect<DocumentationFormats>;
  modelLanguage: 'Smithy' | 'Open API';
  namespace: string;
  apiName: string;
}

interface WebsiteOptions {
  websiteName: string;
  typeSafeApis: MultiSelect<BlueprintInstantiation>;
}

interface InfraOptions {
  language: 'Typescript' | 'Java' | 'Python';
  stackName: string;
  typeSafeApis: MultiSelect<BlueprintInstantiation>;
  cloudscapeReactTsWebsites: MultiSelect<BlueprintInstantiation>;
}

export interface Options {
  monorepo: MonorepoOptions;

  api?: ApiOptions[];

  infra?: InfraOptions;

  website?: WebsiteOptions[];
}

export type Initializer = (blueprint: Blueprint) => void;

export interface PDKSynthOptions extends BlueprintOptions {
  readonly initializer?: (blueprint: Blueprint) => void;
}

export class PDKSynth extends Component {
  private readonly sourceRepository: SourceRepository;
  private readonly options: Options;
  private readonly blueprintOptions: BlueprintOptions;

  constructor(project: Blueprint, sourceRepository: SourceRepository, projectName: string, blueprintOptions: PDKSynthOptions) {
    super(project);

    blueprintOptions.initializer && blueprintOptions.initializer(project);
    this.sourceRepository = sourceRepository;
    this.blueprintOptions = blueprintOptions;
    this.options = this.getOptions();

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
        packageManager: this.options.monorepo.code.packageManager,
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
            .map(bpi => (bpi as BlueprintInstantiation).options)
            .map(options => this.sanitizeName(options.apiName))
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
      identifier: `${projectName}-neverUpdate`,
      strategy: MergeStrategies.neverUpdate,
    }]);
  }

  private getBlueprintInstantiationById(id: string) {
    return (this.project as Blueprint).context.project.blueprint.instantiations.find(bpi => bpi.id === id);
  }

  private getOptions(): Options {
    let monorepo;
    let infra;
    let api: any[] = [];
    let website: any[] = [];
    const blueprint = this.project as Blueprint;

    switch (blueprint.context.package.name) {
      case MONOREPO_PACKAGE:
        monorepo = this.blueprintOptions;
        break;
      case INFRA_PACKAGE:
        infra = this.blueprintOptions;
        break;
      case TYPESAFE_API_PACKAGE:
        api = [this.blueprintOptions];
        break;
      case WEBSITE_PACKAGE:
        website = [this.blueprintOptions];
        break;
      default:
        break;
    }

    const options = {
      monorepo: monorepo ?? this.findBlueprintInstantiations(MONOREPO_PACKAGE).find(s => s)?.options,
      infra: infra ?? this.findBlueprintInstantiations(INFRA_PACKAGE).find(s => s)?.options,
      api: [...this.findBlueprintInstantiations(TYPESAFE_API_PACKAGE)
        .filter(bpi => bpi.id !== blueprint.context.project.blueprint.instantiationId)
        .map(bpi => bpi.options), ...api]
        .sort((a, b) => (a as ApiOptions).apiName.localeCompare((b as ApiOptions).apiName)),
      website: [...this.findBlueprintInstantiations(WEBSITE_PACKAGE)
        .filter(bpi => bpi.id !== blueprint.context.project.blueprint.instantiationId)
        .map(bpi => bpi.options), ...website]
        .sort((a, b) => (a as WebsiteOptions).websiteName.localeCompare((b as WebsiteOptions).websiteName)),
    };

    options.website?.forEach(w => {
      const websiteOptions = w as WebsiteOptions;
      if (typeof websiteOptions.typeSafeApis?.[0] === 'string') {
        websiteOptions.typeSafeApis = websiteOptions.typeSafeApis
          .map(id => this.getBlueprintInstantiationById(id as string)!)
          .sort((a, b) => (a.options as ApiOptions).apiName.localeCompare((b.options as ApiOptions).apiName));
      }
      return websiteOptions;
    });
    return options;
  }

  private findBlueprintInstantiations(packageName: string): BlueprintInstantiation[] {
    return (this.project as Blueprint).context.project.blueprint.instantiations.filter(p => p.packageName === packageName);
  }

  synthesize(): void {
    switch (this.options.monorepo.primaryLanguage) {
      case 'Typescript':
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
    this.hasDevOpsBlueprint() && execSync(this.renderLockfileCommand()!, {
      cwd: this.sourceRepository.path,
      stdio: [0, 1, 1],
    });

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
      projenrcTs: true,
    });

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

  private hasDevOpsBlueprint() {
    return this.findBlueprintInstantiations(DEVOPS_PACKAGE).length > 0 || (this.project as Blueprint).context.package.name === DEVOPS_PACKAGE;
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
        return 'npm config set ignore-scripts true && npx -y npm@9.6.7 install --legacy-peer-deps --package-lock-only';
      case NodePackageManager.PNPM:
        return 'npx -y pnpm i --lockfile-only --ignore-scripts';
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
      case 'Typescript':
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
    switch (this.options.monorepo.code.packageManager) {
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
      case 'Typescript':
        new InfrastructureTsProject({
          parent,
          outdir: INFRA_OUTDIR,
          name: 'infra',
          cloudscapeReactTsWebsites: props.websites,
          typeSafeApis: props.apis,
          stackName: this.options.infra?.stackName,
        });
        break;
      case 'Java':
        new InfrastructureJavaProject({
          parent,
          outdir: INFRA_OUTDIR,
          name: 'infra',
          cloudscapeReactTsWebsites: props.websites,
          typeSafeApis: props.apis,
          stackName: this.options.infra?.stackName,
        });
        break;
      case 'Python':
        new InfrastructurePyProject({
          parent,
          outdir: INFRA_OUTDIR,
          name: 'infra',
          cloudscapeReactTsWebsites: props.websites,
          typeSafeApis: props.apis,
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
          applicationName: options.websiteName,
          typeSafeApis: apis?.filter(api => options.typeSafeApis
            .find((api2) => ((api2 as BlueprintInstantiation).options as ApiOptions).apiName === api.model.apiName)),
        });
      });
  }

  private sanitizeName(name: string) {
    return name.replace(/[^a-z0-9_]+/gi, '')
      .replace(/^[0-9]+/gi, '')
      .toLowerCase();
  }
}
