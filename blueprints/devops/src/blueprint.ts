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
} from "@amazon-codecatalyst/blueprints";

import {
  Initializer,
  PDKSynth,
  validateMonorepoExists,
} from "@amazon-codecatalyst/Centre-of-Prototyping-Excellence.pdk-synth";
import defaults from "./defaults.json";
import { assets } from "./static-assets";
import { Workflow } from "./workflow";
const INFRA_OUTDIR = "packages/infra/main/cdk.out";

/**
 * This is the 'Options' interface. The 'Options' interface is interpreted by the wizard to dynamically generate a selection UI.
 * 1. It MUST be called 'Options' in order to be interpreted by the wizard
 * 2. This is how you control the fields that show up on a wizard selection panel. Keeping this small leads to a better user experience.
 * 3. All required members of 'Options' must be defined in 'defaults.json' to synth your blueprint locally. They will become the defaults for the wizard.
 *
 * @requires '@amazon-codecatalyst/centre-of-prototyping-excellence.pdk-infra'
 */
export interface Options extends ParentOptions {
  /**
   * @displayName Beta
   */
  beta: {
    /**
     * Select to bootstrap CDK in the AWS environment.
     * @displayName Bootstrap CDK
     */
    bootstrapCDK: boolean;

    /**
     * The name of the AWS CloudFormation stack to deploy. Should match the stack name configured in PDK - Infrastructure.
     * @displayName Stack name
     * @placeholder Enter a stack name contained in your CDK application.
     * @validationRegex /^[a-zA-Z][a-zA-Z0-9-]{0,99}$/
     * @validationMessage Stack names must start with a letter, then contain alphanumeric characters and dashes(-) up to a total length of 128 characters
     */
    stackName: string;

    /**
     * @displayName Configuration
     */
    environment: EnvironmentDefinition<{
      /**
       * An AWS account connection is required by the project workflow to deploy to AWS.
       * @displayName AWS account connection
       */
      accountConnection: AccountConnection<{
        /**
         * IAM role for deploying your application.
         * @displayName The role to use for deploying your application
         */
        deployRole: Role<["CDK Deploy"]>;
      }>;
    }>;

    /**
     * Select the Region where you want to deploy the application.
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

  constructor(options_: Options, initializer?: Initializer) {
    super(options_);

    initializer && initializer(this);
    validateMonorepoExists(this);

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

    // Copy all assets
    Object.entries(assets).forEach(
      ([filePath, content]) =>
        new SourceFile(this.sourceRepository, filePath, content)
    );

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
          cloudAssemblyRootPath: INFRA_OUTDIR,
        },
      ],
    });

    new PDKSynth(this, this.sourceRepository, "devops", {
      ...this.options,
    });
  }
}
