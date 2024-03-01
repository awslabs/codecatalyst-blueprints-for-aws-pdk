import {
  BlueprintInstantiation,
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
} from "@amazon-codecatalyst/blueprints";
import {
  Blueprint as CloudscapeWebsiteBlueprint,
  Options as CloudscapeWebsiteOptions,
  defaults as CloudscapeWebsiteDefaults,
} from "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-cloudscape-react-website";
import {
  Blueprint as DevOpsBlueprint,
  Options as DevOpsOptions,
  defaults as DevOpsDefaults,
} from "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-devops";
import {
  Blueprint as InfraBlueprint,
  Options as InfraOptions,
  defaults as InfraDefaults,
} from "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-infra";
import {
  Blueprint as MonorepoBlueprint,
  Options as MonorepoOptions,
  defaults as MonorepoDefaults,
} from "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-monorepo";
import {
  Blueprint as TypeSafeApiBlueprint,
  Options as TypeSafeApiOptions,
  defaults as TypeSafeApiDefaults,
} from "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-type-safe-api";

const DEVOPS_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-devops";
const MONOREPO_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-monorepo";
const TYPESAFE_API_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-type-safe-api";
const WEBSITE_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-cloudscape-react-website";
const INFRA_PACKAGE =
  "@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-infra";

const generateBlueprintInstantiations = (
  ...blueprints: ParentBlueprint[]
): BlueprintInstantiation[] =>
  blueprints.map((bp) => ({
    packageName: bp.context.package.name!,
    id: bp.context.package.name!,
    options: bp.context.project.options,
    versionId: bp.context.package.name!,
  }));

class TestMonorepoBlueprint extends MonorepoBlueprint {
  constructor(bp: Blueprint) {
    process.env.PACKAGE_NAME = MONOREPO_PACKAGE;

    const options = {
      outdir: bp.outdir,
      ...MonorepoDefaults,
      primaryLanguage:
        MonorepoDefaults.primaryLanguage as MonorepoOptions["primaryLanguage"],
      code: {
        ...MonorepoDefaults.code,
        packageManager: MonorepoDefaults.code
          .packageManager as MonorepoOptions["code"]["packageManager"],
      },
    };

    super(options, (_bp: ParentBlueprint) => {
      _bp.context.project.options = options;
    });
  }
}

class TestTypeSafeApiBlueprint extends TypeSafeApiBlueprint {
  constructor(bp: Blueprint, instantiations: BlueprintInstantiation[]) {
    process.env.PACKAGE_NAME = TYPESAFE_API_PACKAGE;
    process.env.EXISTING_BUNDLE_ABS = bp.outdir;

    const options = {
      outdir: bp.outdir,
      ...TypeSafeApiDefaults,
      primaryLanguage:
        TypeSafeApiDefaults.primaryLanguage as TypeSafeApiOptions["primaryLanguage"],
      modelLanguage:
        TypeSafeApiDefaults.modelLanguage as TypeSafeApiOptions["modelLanguage"],
    };

    super(options, (_bp) => {
      _bp.context.project.blueprint.instantiations = instantiations;
      _bp.context.project.options = options;
    });
  }
}

class TestCloudscapeWebsiteBlueprint extends CloudscapeWebsiteBlueprint {
  constructor(bp: Blueprint, instantiations: BlueprintInstantiation[]) {
    process.env.PACKAGE_NAME = WEBSITE_PACKAGE;
    process.env.EXISTING_BUNDLE_ABS = bp.outdir;

    const options: CloudscapeWebsiteOptions = {
      outdir: bp.outdir,
      ...CloudscapeWebsiteDefaults,
      typeSafeApis: instantiations
        .filter((bpi) => bpi.packageName === TYPESAFE_API_PACKAGE)
        .map((bpi) => bpi.id),
    };

    super(options, (_bp: Blueprint) => {
      _bp.context.project.blueprint.instantiations = instantiations;
      _bp.context.project.options = options;
    });
  }
}

class TestInfraBlueprint extends InfraBlueprint {
  constructor(bp: Blueprint, instantiations: BlueprintInstantiation[]) {
    process.env.PACKAGE_NAME = INFRA_PACKAGE;
    process.env.EXISTING_BUNDLE_ABS = bp.outdir;

    const options: InfraOptions = {
      outdir: bp.outdir,
      ...InfraDefaults,
      language: InfraDefaults.language as InfraOptions["language"],
      typeSafeApis: instantiations
        .filter((bpi) => bpi.packageName === TYPESAFE_API_PACKAGE)
        .map((bpi) => bpi.id),
      cloudscapeReactTsWebsites: instantiations
        .filter((bpi) => bpi.packageName === WEBSITE_PACKAGE)
        .map((bpi) => bpi.id),
    };

    super(options, (_bp: Blueprint) => {
      _bp.context.project.blueprint.instantiations = instantiations;
      _bp.context.project.options = options;
    });
  }
}

class TestDevOpsBlueprint extends DevOpsBlueprint {
  constructor(bp: Blueprint, instantiations: BlueprintInstantiation[]) {
    process.env.PACKAGE_NAME = DEVOPS_PACKAGE;
    process.env.EXISTING_BUNDLE_ABS = bp.outdir;

    const options: DevOpsOptions = {
      outdir: bp.outdir,
      ...DevOpsDefaults,
    };

    super(options, (_bp: Blueprint) => {
      _bp.context.project.blueprint.instantiations = instantiations;
      _bp.context.project.options = options;
    });
  }
}

export class Blueprint extends ParentBlueprint {
  constructor(options: ParentOptions) {
    super(options);

    const monorepoBlueprint = new TestMonorepoBlueprint(this);
    monorepoBlueprint.synth();

    const typeSafeApiBlueprint = new TestTypeSafeApiBlueprint(
      this,
      generateBlueprintInstantiations(monorepoBlueprint)
    );
    typeSafeApiBlueprint.synth();

    const cloudscapeWebsiteBlueprint = new TestCloudscapeWebsiteBlueprint(
      this,
      generateBlueprintInstantiations(monorepoBlueprint, typeSafeApiBlueprint)
    );
    cloudscapeWebsiteBlueprint.synth();

    const infraBlueprint = new TestInfraBlueprint(
      this,
      generateBlueprintInstantiations(
        monorepoBlueprint,
        typeSafeApiBlueprint,
        cloudscapeWebsiteBlueprint
      )
    );
    infraBlueprint.synth();

    const devOpsBlueprint = new TestDevOpsBlueprint(
      this,
      generateBlueprintInstantiations(
        monorepoBlueprint,
        typeSafeApiBlueprint,
        cloudscapeWebsiteBlueprint,
        infraBlueprint
      )
    );
    devOpsBlueprint.synth();
  }
}
