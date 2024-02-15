import {
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
  Environment,
  Region,
  AccountConnection,
  EnvironmentDefinition,
  Role,
  SourceRepository,
  SourceFile,
  StaticAsset,
} from "@amazon-codecatalyst/blueprints";

import defaults from "./defaults.json";
import { Workflow } from "./workflow";

const INFRA_OUTDIR = "packages/infra/main";

/**
 * This is the 'Options' interface. The 'Options' interface is interpreted by the wizard to dynamically generate a selection UI.
 * 1. It MUST be called 'Options' in order to be interpreted by the wizard
 * 2. This is how you control the fields that show up on a wizard selection panel. Keeping this small leads to a better user experience.
 * 3. All required members of 'Options' must be defined in 'defaults.json' to synth your blueprint locally. They will become the defaults for the wizard.
 *
 * @requires '@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-monorepo'
 */
export interface Options extends ParentOptions {
  /**
   * @displayName Beta
   */
  beta: {
    /**
     * Whether CDK is bootstrapped in this environment.
     * @displayName Bootstrap CDK
     */
    bootstrapCDK: boolean;

    /**
     * The name of the AWS CloudFormation stack generated for the blueprint. It must be unique for the AWS account it's being deployed to.
     * @displayName Stack name
     * @validationRegex /^[a-zA-Z][a-zA-Z0-9-]{0,99}$/
     * @validationMessage Stack names must start with a letter, then contain alphanumeric characters and dashes(-) up to a total length of 128 characters
     * @defaultEntropy 5
     */
    stackName: string;

    /**
     * @displayName Configuration
     */
    environment: EnvironmentDefinition<{
      /**
       * Account connection to use for the environment
       * @displayName AWS account connection
       */
      accountConnection: AccountConnection<{
        /**
         * IAM role for deploying your application.
         * @displayName The role to use for deploying your application.
         */
        deployRole: Role<["CDK Deploy"]>;
      }>;
    }>;

    /**
     * region
     * @displayName Region
     */
    region: Region<["*"]>;
  };
}

/**
 * This is the actual blueprint class.
 * 1. This MUST be the only 'class' exported, as 'Blueprint'
 * 2. This Blueprint should extend another ParentBlueprint
 */
export class Blueprint extends ParentBlueprint {
  private readonly sourceRepository: SourceRepository;
  private readonly options: Options;

  constructor(options_: Options) {
    super(options_);
    /**
     * This is a typecheck to ensure that the defaults passed in are of the correct type.
     * There are some cases where the typecheck will fail, but the defaults will still be valid, such when using enums.
     * you can override this ex. myEnum: defaults.myEnum as Options['myEnum'],
     */
    const typeCheck: Options = {
      outdir: this.outdir,
      ...defaults,
    };
    this.options = Object.assign(typeCheck, options_);

    // Get reference to src repository
    this.sourceRepository = new SourceRepository(this, {
      title: this.context.project.src.listRepositoryNames()[0],
    });

    // Copy all common assets
    StaticAsset.findAll("*").forEach((staticCode) => {
      new SourceFile(
        this.sourceRepository,
        staticCode.path(),
        new StaticAsset(staticCode.path()).content().toString()
      );
    });

    // Create environments
    new Environment(this, this.options.beta.environment);

    new Workflow(this, {
      sourceRepository: this.sourceRepository,
      deploymentStages: [
        {
          bootstrapCDK: this.options.beta.bootstrapCDK,
          region: this.options.beta.region.toString(),
          environment: this.options.beta.environment,
          stackName: this.options.beta.stackName,
          cdkRootPath: INFRA_OUTDIR,
        },
      ],
    });
  }
}
