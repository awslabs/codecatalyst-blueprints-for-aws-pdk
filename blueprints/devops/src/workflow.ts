/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import {
  Blueprint,
  PullRequestEvent,
  RunModeDefiniton,
  Workflow as _Workflow,
  WorkflowDefinition,
  addGenericBranchTrigger,
  addGenericPullRequestTrigger,
  makeEmptyWorkflow,
  SourceRepository,
  EnvironmentDefinition,
  AccountConnection,
  Role,
} from "@amazon-codecatalyst/blueprints";
import { Component } from "projen";
import {
  addBuildAction,
  addCdkBootstrapAction,
  addCdkDeployAction,
  addLicenseCheckerAction,
  addTrivyAction,
} from "./utils/actions";

const DEFAULT_BRANCH = "main";

export interface DeploymentStage {
  readonly region: string;

  readonly bootstrapCDK: boolean;

  readonly stackName: string;

  readonly cloudAssemblyRootPath: string;

  readonly environment: EnvironmentDefinition<{
    /**
     * Account connection to use for the environment
     * @displayName Account connection
     * @collapsed
     */
    accountConnection: AccountConnection<{
      /**
       * IAM role for deploying
       * @displayName The role to use for deploying to this account
       */
      deployRole: Role<["CDK Deploy"]>;
    }>;
  }>;
}

export interface WorkflowOptions {
  readonly sourceRepository: SourceRepository;

  readonly defaultBranch?: string;

  readonly deploymentStages?: DeploymentStage[];
}

export class Workflow extends Component {
  private blueprint: Blueprint;
  private options: WorkflowOptions;

  constructor(scope: Blueprint, options: WorkflowOptions) {
    super(scope);
    this.blueprint = scope;
    this.options = { defaultBranch: DEFAULT_BRANCH, ...options };

    this.createPRWorkflow();
    this.createReleaseWorkflow();
  }

  private addCommonWorkflowSteps(workflowDefinition: WorkflowDefinition) {
    addBuildAction(workflowDefinition);
    addTrivyAction(workflowDefinition);
    addLicenseCheckerAction(workflowDefinition);
  }

  /**
   * Create a workflow that runs when a PR is created/updated.
   */
  private createPRWorkflow() {
    const prWorkflow: WorkflowDefinition = {
      ...makeEmptyWorkflow(),
      Name: "pr",
    };

    addGenericPullRequestTrigger(
      prWorkflow,
      [PullRequestEvent.OPEN, PullRequestEvent.REVISION],
      [this.options.defaultBranch!]
    );
    this.addCommonWorkflowSteps(prWorkflow);

    new _Workflow(this.blueprint, this.options.sourceRepository, prWorkflow);
  }

  /**
   * Create a workflow that runs when code gets pushed to the default branch of the repo.
   */
  private createReleaseWorkflow() {
    const releaseWorkflow: WorkflowDefinition = {
      ...makeEmptyWorkflow(),
      Name: "release",
      RunMode: RunModeDefiniton.SUPERSEDED,
    };

    addGenericBranchTrigger(releaseWorkflow, [this.options.defaultBranch!]);
    this.addCommonWorkflowSteps(releaseWorkflow);

    let lastDeployAction: string;
    this.options.deploymentStages?.forEach((stage) => {
      const bootstrap = stage.bootstrapCDK
        ? addCdkBootstrapAction(
            releaseWorkflow,
            stage.environment,
            stage.region,
            lastDeployAction
              ? [lastDeployAction]
              : ["Build", "Trivy", "LicenseChecker"]
          )
        : undefined;

      lastDeployAction = addCdkDeployAction(
        releaseWorkflow,
        stage.environment,
        stage.region,
        stage.stackName,
        stage.cloudAssemblyRootPath,
        {
          environmentName: `${stage.environment.name}-${stage.region}`,
        },
        bootstrap ? [bootstrap] : lastDeployAction ? [lastDeployAction] : []
      );
    });

    new _Workflow(
      this.blueprint,
      this.options.sourceRepository,
      releaseWorkflow
    );
  }
}
