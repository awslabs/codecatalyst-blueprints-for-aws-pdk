/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import {
  AccountConnection,
  ComputeFleet,
  ComputeType,
  EnvironmentDefinition,
  Role,
  WorkflowDefinition,
  getDefaultActionIdentifier,
} from "@amazon-codecatalyst/blueprints";

const PDK_IMAGE = {
  Container: {
    Registry: "ECR",
    Image: "public.ecr.aws/p9i6h6j0/aws-pdk:latest",
  },
};

export function makeEmptyWorkflow(): WorkflowDefinition {
  return {
    Name: "build",
    SchemaVersion: "1.0",
    Triggers: [],
    Compute: {
      Type: ComputeType.EC2,
      Fleet: ComputeFleet.LINUX_X86_64_LARGE,
    },
    Actions: {},
  };
}

export function addGenericAction(
  wfDefnition: WorkflowDefinition,
  name: string,
  actionDefinition: any
): WorkflowDefinition {
  if (!wfDefnition.Actions) {
    wfDefnition.Actions = {};
  }
  wfDefnition.Actions[name] = actionDefinition;
  return wfDefnition;
}

export function addGenerateRequiredFilesAction(
  workflowDefinition: WorkflowDefinition,
  environmentId: string | undefined,
  projen: boolean
) {
  addGenericAction(workflowDefinition, "GenerateRequiredFiles", {
    Identifier: getDefaultActionIdentifier("aws/build@v1", environmentId),
    Inputs: {
      Sources: ["WorkflowSource"],
    },
    Configuration: {
      ...PDK_IMAGE,
      Steps: [
        projen ? "npx projen install" : "scripts/run-task install",
        // projen ? "npx projen build" : "scripts/run-task build",
        "rm .codecatalyst/workflows/generate-required-files.yaml",
        'echo "Getting credentials..."',
        "MI=`curl $AWS_CONTAINER_TOKEN_ENDPOINT`",
        `ACCESS_KEY_ID=$(echo "$MI" | jq -r '.AccessKeyId')`,
        `SECRET_ACCESS_KEY=$(echo "$MI" | jq -r '.SecretAccessKey')`,
        "ORIGINAL_REMOTE=`git config --get remote.origin.url`",
        'SOURCE_REPO_URL=`sed -e "s^//^//$ACCESS_KEY_ID:$SECRET_ACCESS_KEY@^" <<< $ORIGINAL_REMOTE`',
        'echo "Configuring git..."',
        "git remote set-url origin $SOURCE_REPO_URL",
        'git config --global user.email "robot@codecatalyst.com"',
        'git config --global user.name "Robot"',
        "git checkout main",
        "git add -A",
        'git commit -m "fix: commit generated files"',
        "git push",
      ].map((step) => {
        return {
          Run: step,
        };
      }),
    },
  });
}

export function addBuildAction(
  workflowDefinition: WorkflowDefinition,
  environmentId: string | undefined,
  projen: boolean
) {
  addGenericAction(workflowDefinition, "Build", {
    Identifier: getDefaultActionIdentifier("aws/build@v1", environmentId),
    Inputs: {
      Sources: ["WorkflowSource"],
    },
    Outputs: {
      Artifacts: [
        {
          Name: "Built",
          Files: ["**/*"],
        },
      ],
      AutoDiscoverReports: {
        IncludePaths: ["**/test-reports/*"],
        ExcludePaths: [
          "*/.aws/workflows/*",
          "*/.codecatalyst/workflows/*",
          "**/generated/**/test-reports/*",
          "**/node_modules/**/*",
        ],
        ReportNamePrefix: "Build",
        Enabled: true,
        // SuccessCriteria: {
        //   PassRate: 100,
        // },
      },
    },
    Configuration: {
      ...PDK_IMAGE,
      Steps: [
        projen ? "npx projen install:ci" : "scripts/run-task install:ci",
        projen ? "npx projen build" : "scripts/run-task build",
      ].map((step) => {
        return {
          Run: step,
        };
      }),
    },
    // Caching: {
    //   FileCaching: {
    //     buildNxcache: {
    //       Path: "node_modules/.cache/nx",
    //     },
    //   },
    // },
  });
}

export function addTrivyAction(
  wfDefinition: WorkflowDefinition,
  environmentId: string | undefined
) {
  addGenericAction(wfDefinition, "Trivy", {
    Identifier: getDefaultActionIdentifier(
      "aws/github-actions-runner@v1",
      environmentId
    ),
    Inputs: {
      Sources: ["WorkflowSource"],
    },
    Configuration: {
      Steps: [
        {
          name: "Trivy Vulnerability Scanner",
          uses: "aquasecurity/trivy-action@master",
          with: {
            "scan-type": "fs",
            "ignore-unfixed": true,
            format: "sarif",
            output: "trivy_report.sarif",
            "security-checks": "vuln,config,secret",
          },
        },
      ],
    },
    Outputs: {
      Reports: {
        Trivy: {
          Format: "SARIFSCA",
          IncludePaths: ["trivy_report.sarif"],
          SuccessCriteria: {
            Vulnerabilities: {
              Severity: "CRITICAL",
              Number: 0,
            },
          },
        },
      },
    },
  });
}

export function addLicenseCheckerAction(
  wfDefinition: WorkflowDefinition,
  environmentId: string | undefined,
  projen: boolean
) {
  addGenericAction(wfDefinition, "LicenseChecker", {
    Identifier: getDefaultActionIdentifier(
      "aws/managed-test@v1",
      environmentId
    ),
    Inputs: {
      Sources: ["WorkflowSource"],
    },
    Configuration: {
      ...PDK_IMAGE,
      Steps: [
        "CWD=`pwd` PROJECT_DIRS=`find . -type f \\( -name pnpm-lock.yaml -o -name pyproject.toml -o -name pom.xml \\) -exec bash -c 'echo $(dirname $0)' {} \\; | sort | uniq`",
        "find . -name pyproject.toml -exec bash -c 'cd $(dirname $0) && poetry export --without-hashes --with dev -f requirements.txt | grep -v \"file:\" > requirements.txt && pip3 install -r requirements.txt' {} \\;",
        projen ? "npx projen install:ci" : "scripts/run-task install:ci",
        projen ? "npx projen build" : "scripts/run-task build",
        "for DIR in $PROJECT_DIRS;\ndo\n  cd $CWD/$DIR\n  pwd;\n  license_finder --decisions_file $CWD/approved-licenses.yaml\ndone",
      ].map((step) => {
        return { Run: step };
      }),
    },
    // Caching: {
    //   FileCaching: {
    //     licenseCheckerNxcache: {
    //       Path: "node_modules/.cache/nx",
    //     },
    //   },
    // },
  });
}

export function addCdkBootstrapAction(
  wfDefinition: WorkflowDefinition,
  environment: EnvironmentDefinition<{
    accountConnection: AccountConnection<{ deployRole: Role<["CDK Deploy"]> }>;
  }>,
  region: string,
  dependsOn: string[],
  environmentId: string | undefined
): string {
  const actionName = `Bootstrap-${environment.name}-${region}`;
  addGenericAction(wfDefinition, actionName, {
    Identifier: getDefaultActionIdentifier(
      "aws/cdk-bootstrap@v1",
      environmentId
    ),
    DependsOn: dependsOn,
    Inputs: {
      Artifacts: ["Built"],
    },
    Environment: {
      Name: environment.name,
      Connections: [
        {
          Name: environment.accountConnection?.name,
          Role: environment.accountConnection?.deployRole?.name,
        },
      ],
    },
    Configuration: {
      Region: region,
      CdkCliVersion: "latest",
    },
  });

  return actionName;
}

export function addCdkDeployAction(
  workflow: WorkflowDefinition,
  environment: EnvironmentDefinition<{
    accountConnection: AccountConnection<{ deployRole: Role<["CDK Deploy"]> }>;
  }>,
  region: string,
  stackName: string,
  cloudAssemblyRootPath: string,
  context: { [key: string]: any },
  dependsOn: string[],
  environmentId: string | undefined
): string {
  const actionName = `Deploy-${environment.name}-${region}`;
  addGenericAction(workflow, actionName, {
    Identifier: getDefaultActionIdentifier("aws/cdk-deploy@v1", environmentId),
    DependsOn: dependsOn,
    Inputs: {
      Artifacts: ["Built"],
    },
    Environment: {
      Name: environment.name,
      Connections: [
        {
          Name: environment.accountConnection?.name,
          Role: environment.accountConnection?.deployRole?.name,
        },
      ],
    },
    Configuration: {
      Region: region,
      Context: JSON.stringify(context),
      CloudAssemblyRootPath: cloudAssemblyRootPath,
      CdkCliVersion: "latest",
      StackName: stackName,
    },
  });

  return actionName;
}

export function addManualApprovalAction(
  workflow: WorkflowDefinition,
  environment: EnvironmentDefinition<{
    accountConnection: AccountConnection<{ deployRole: Role<["CDK Deploy"]> }>;
  }>,
  region: string,
  approvalsRequired: number,
  dependsOn: string[],
  environmentId: string | undefined
): string {
  const actionName = `ManualApproval-${environment.name}-${region}`;
  addGenericAction(workflow, actionName, {
    Identifier: getDefaultActionIdentifier("aws/approval@v1", environmentId),
    DependsOn: dependsOn,
    Configuration: {
      ApprovalsRequired: approvalsRequired,
    },
  });

  return actionName;
}
