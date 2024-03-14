import {
  AccountConnection,
  EnvironmentDefinition,
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
  Role,
} from "@amazon-codecatalyst/blueprints";
import {
  TestMonorepoBlueprint,
  TestTypeSafeApiBlueprint,
  generateBlueprintInstantiations,
  TestCloudscapeWebsiteBlueprint,
  TestInfraBlueprint,
  TestDevOpsBlueprint,
} from "./dependent-blueprints";

export interface Options extends ParentOptions {
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
}
export class Blueprint extends ParentBlueprint {
  private readonly options: Options;

  constructor(options: Options) {
    super(options);
    this.options = options;
  }

  synth(): void {
    process.env.PROJEN_DISABLE_POST = "true";

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
      ),
      {
        deploymentTarget: this.options.environment,
      }
    );
    devOpsBlueprint.synth();

    process.env.PROJEN_DISABLE_POST = "false";
  }
}
