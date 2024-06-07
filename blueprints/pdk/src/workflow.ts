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
  addManualApprovalAction,
  addTrivyAction,
} from "./utils/actions";

const DEFAULT_BRANCH = "main";

export interface DeploymentStage {
  readonly region: string;

  readonly bootstrapCDK: boolean;

  readonly requiredApprovals?: number;

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

  readonly runMode: RunModeDefiniton;

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
    addBuildAction(workflowDefinition, this.blueprint.context.environmentId);
    addTrivyAction(workflowDefinition, this.blueprint.context.environmentId);
    addLicenseCheckerAction(
      workflowDefinition,
      this.blueprint.context.environmentId
    );
  }

  /**
   * Create a workflow that runs when a PR is created/updated.
   */
  private createPRWorkflow() {
    const prWorkflow: WorkflowDefinition = {
      ...makeEmptyWorkflow(),
      Name: "pr",
      RunMode: RunModeDefiniton.PARALLEL,
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
      RunMode: this.options.runMode,
    };

    addGenericBranchTrigger(releaseWorkflow, [this.options.defaultBranch!]);
    this.addCommonWorkflowSteps(releaseWorkflow);

    let lastDeployAction: string;
    this.options.deploymentStages?.forEach((stage) => {
      if (stage.requiredApprovals && stage.requiredApprovals > 0) {
        lastDeployAction = addManualApprovalAction(
          releaseWorkflow,
          stage.environment,
          stage.region,
          stage.requiredApprovals,
          lastDeployAction
            ? [lastDeployAction]
            : ["Build", "Trivy", "LicenseChecker"],
          this.blueprint.context.environmentId
        );
      }

      const bootstrap = stage.bootstrapCDK
        ? addCdkBootstrapAction(
            releaseWorkflow,
            stage.environment,
            stage.region,
            lastDeployAction
              ? [lastDeployAction]
              : ["Build", "Trivy", "LicenseChecker"],
            this.blueprint.context.environmentId
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
        bootstrap
          ? [bootstrap]
          : lastDeployAction
          ? [lastDeployAction]
          : ["Build", "Trivy", "LicenseChecker"],
        this.blueprint.context.environmentId
      );
    });

    new _Workflow(
      this.blueprint,
      this.options.sourceRepository,
      releaseWorkflow
    );
  }
}
