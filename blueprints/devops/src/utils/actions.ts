import {
  AccountConnection,
  ComputeFleet,
  ComputeType,
  EnvironmentDefinition,
  Role,
  WorkflowDefinition,
} from "@amazon-codecatalyst/blueprints";

const CACHING = {
  Caching: {
    FileCaching: {
      nxcache: {
        Path: "node_modules/.cache/nx",
      },
    },
  },
};

// TODO: Add all prereqs
export function getPrerequisiteSteps(): string[] {
  return [
    "npm install -g bun pnpm aws-cdk @aws/pdk projen",
    "sudo yum -y groupinstall 'Development Tools'",
    "sudo yum -y install graphviz",
  ];
}

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

export function addBuildAction(workflowDefinition: WorkflowDefinition) {
  addGenericAction(workflowDefinition, "Build", {
    Identifier: "aws/build@v1",
    Inputs: {
      Sources: ["WorkflowSource"],
    },
    Outputs: {
      Artifacts: [
        {
          Name: "Built",
          Files: ["**/*"],
        },
        {
          Name: "Diagram",
          Files: ["packages/infra/main/cdk.out/cdkgraph/diagram.*"],
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
      Steps: [...getPrerequisiteSteps(), "pdk install:ci", "pdk build"].map(
        (step) => {
          return {
            Run: step,
          };
        }
      ),
    },
    ...CACHING,
  });
}

export function addTrivyAction(wfDefinition: WorkflowDefinition) {
  addGenericAction(wfDefinition, "Trivy", {
    Identifier: "aws/github-actions-runner@v1",
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

export function addLicenseCheckerAction(wfDefinition: WorkflowDefinition) {
  addGenericAction(wfDefinition, "LicenseChecker", {
    Identifier: "aws/managed-test@v1",
    Inputs: {
      Sources: ["WorkflowSource"],
    },
    Configuration: {
      Steps: [
        ...getPrerequisiteSteps(),
        "sudo yum -y install rubygems && sudo amazon-linux-extras install ruby3.0",
        "gem install license_finder",
        "pdk install:ci",
        "license_finder --decisions_file approved-licenses.yaml --debug",
      ].map((step) => {
        return { Run: step };
      }),
    },
  });
}

export function addCdkBootstrapAction(
  wfDefinition: WorkflowDefinition,
  environment: EnvironmentDefinition<{
    accountConnection: AccountConnection<{ deployRole: Role<["CDK Deploy"]> }>;
  }>,
  region: string,
  dependsOn: string[]
): string {
  const actionName = `Bootstrap-${environment.name}-${region}`;
  addGenericAction(wfDefinition, actionName, {
    Identifier: "aws/cdk-bootstrap@v1",
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
  cdkRootPath: string,
  context: { [key: string]: any },
  dependsOn: string[]
): string {
  const actionName = `Deploy-${environment.name}-${region}`;
  addGenericAction(workflow, actionName, {
    Identifier: "aws/cdk-deploy@v1",
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
      CdkRootPath: cdkRootPath,
      CdkCliVersion: "latest",
      StackName: stackName,
    },
  });

  return actionName;
}
