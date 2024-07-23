/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
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

  /**
   * The name of the AWS CloudFormation stack to deploy.
   * @displayName Stack name
   * @validationRegex /^[a-zA-Z][a-zA-Z0-9-]{0,99}$/
   * @validationMessage Stack names must start with a letter, then contain alphanumeric characters and dashes(-) up to a total length of 100 characters
   * @defaultEntropy 5
   */
  stackName?: string;
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
      ),
      {
        stackName: this.options.stackName,
      }
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
        stackName: this.options.stackName,
      }
    );
    devOpsBlueprint.synth();

    process.env.PROJEN_DISABLE_POST = "false";
  }
}
