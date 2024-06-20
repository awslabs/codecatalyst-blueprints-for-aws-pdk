/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import {
  OptionsSchema,
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
  Selector,
  SourceFile,
  Issue,
  SourceRepository,
  Workspace,
  KVSchema,
  OptionsSchemaDefinition,
  DynamicKVInput,
  Environment,
  RunModeDefiniton,
  ComputeFleet,
  ComputeType,
} from "@amazon-codecatalyst/blueprints";
import { PDKSynth } from "@amazon-codecatalyst/Centre-of-Prototyping-Excellence.pdk-synth";
import defaults from "./defaults.json";
import { assets, ASL } from "./static-assets";
import { DeploymentStage, Workflow } from "./workflow";

const EC2_COMPUTE: string[] = [
  ComputeFleet.LINUX_X86_64_LARGE,
  ComputeFleet.LINUX_X86_64_XLARGE,
  ComputeFleet.LINUX_X86_64_2XLARGE,
  ComputeFleet.LINUX_ARM64_LARGE,
  ComputeFleet.LINUX_ARM64_XLARGE,
  ComputeFleet.LINUX_ARM64_2XLARGE,
];

const LAMBDA_COMPUTE: string[] = [
  ComputeFleet.LINUX_X86_64_LARGE,
  ComputeFleet.LINUX_X86_64_XLARGE,
  ComputeFleet.LINUX_ARM64_LARGE,
  ComputeFleet.LINUX_ARM64_XLARGE,
];

/**
 * This is the 'Options' interface. The 'Options' interface is interpreted by the wizard to dynamically generate a selection UI.
 * 1. It MUST be called 'Options' in order to be interpreted by the wizard
 * 2. This is how you control the fields that show up on a wizard selection panel. Keeping this small leads to a better user experience.
 * 3. All required members of 'Options' must be defined in 'defaults.json' to synth your blueprint locally. They will become the defaults for the wizard.
 */
export interface Options extends ParentOptions {
  /**
   * @displayName Monorepo
   */
  monorepoConfig: {
    /**
     * Select the language you want to primarily develop with.
     *
     * @displayName Primary programming language
     */
    primaryLanguage: "TypeScript" | "Java" | "Python";

    /**
     * Enter a name for a new repository or search for an existing repository.
     *
     * @displayName Source Repository
     * @validationRegex /(?!.*\.git$)^[a-zA-Z0-9_.-]{3,100}$/
     * @validationMessage Must contain only alphanumeric characters, periods (.), underscores (_), dashes (-) and be between 3 and 100 characters in length. Cannot end in .git or contain spaces
     */
    sourceRepositoryName: Selector<SourceRepository | string>;

    parameters: OptionsSchemaDefinition<"monorepoConfig.parameters", KVSchema>;

    /**
     * Select whether you want to use Projen to manage your projects.
     *
     * @displayName Projen
     */
    projen: boolean;
  };

  /**
   * @displayName Type Safe APIs
   */
  apiConfig: {
    /**
     * Add a new Type Safe API to your project by clicking the button below.
     *
     * @displayName Type Safe APIs
     * @placeholder Enter a name for your new API
     * @validationRegex /^[A-Z]\w{0,99}$/
     * @validationMessage API Names must conform to PascalCase and can only contain alphanumerical characters (with the exception of underscores).
     */
    typeSafeApis: string[];

    parameters: OptionsSchemaDefinition<"apiConfig.parameters", KVSchema>;
  };

  /**
   * @displayName Cloudscape React Websites
   */
  websiteConfig: {
    /**
     * Add a new Website to your project by clicking the button below.
     *
     * @displayName Cloudscape React Websites
     * @validationRegex /^.{0,100}$/
     * @placeholder Enter a name for your new Website
     * @validationMessage Website names can be any string not exceeding 100 chars.
     */
    cloudscapeReactTsWebsites: string[];

    parameters: OptionsSchemaDefinition<"websiteConfig.parameters", KVSchema>;
  };

  /**
   * @displayName CDK Infrastructure
   */
  infra: {
    /**
     * Select the language you want to develop your infrastructure with.
     *
     * @displayName CDK language
     */
    language: "TypeScript" | "Java" | "Python";

    /**
     * The name of the AWS CloudFormation stack generated for the blueprint. It must be unique for the AWS account it's being deployed to.
     *
     * @displayName Stack name
     * @validationRegex /^[a-zA-Z][a-zA-Z0-9-]{0,99}$/
     * @validationMessage Stack names must start with a letter, then contain alphanumeric characters and dashes(-) up to a total length of 128 characters
     * @defaultEntropy 5
     */
    stackName: string;

    /**
     * Allow Cognito self-registration.
     *
     * @displayName Cognito self-registration
     */
    allowSelfRegistration: boolean;

    parameters: OptionsSchemaDefinition<"infra.parameters", KVSchema>;
  };

  /**
   * @displayName DevOps
   */
  devOps: {
    /**
     * Queued: Workflow runs are queued. Superseded: Later workflow runs overtake earlier ones, and the earlier ones are canceled. Parallel: Workflow runs occur in parallel.
     *
     * @displayName Run mode
     */
    runMode: "Superseded" | "Queued" | "Parallel";

    computeParameters: OptionsSchemaDefinition<
      "devOps.computeParameters",
      KVSchema
    >;

    /**
     * Add stages to your workflow.
     */
    stages: string[];

    parameters: OptionsSchemaDefinition<"devOps.parameters", KVSchema>;
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

    const deploymentStages: DeploymentStage[] = Object.entries(
      options_.devOps.parameters.reduce(
        (p: DynamicKVInput, c: DynamicKVInput) => ({
          ...p,
          [c.key.split("_")[0]]: {
            ...p[c.key.split("_")[0]],
            [c.key.split("_")[1]]: c.value,
          },
        }),
        {}
      )
    ).map(([stage, values]: any) => ({
      requiredApprovals: Number(values.RequiredApprovals ?? 0),
      bootstrapCDK: values.BootstrapCDK,
      region: values.Region,
      environment: {
        name: stage,
        environmentType: values.Environment?.environmentType ?? "DEVELOPMENT",
        accountConnection: {
          name: stage,
          id: stage,
          deployRole: values.Environment?.[stage]?.deployRole,
        },
      },
      stackName: options_.infra.stackName,
      cloudAssemblyRootPath: "packages/infra/main/cdk.out",
    }));

    const licenseType = (
      options_.monorepoConfig.parameters as DynamicKVInput[]
    ).find((i) => i.key === "LicenseType")?.value;
    new OptionsSchema(this, "monorepoConfig.parameters", [
      ...(options_.monorepoConfig.primaryLanguage === "TypeScript"
        ? [
            options_.monorepoConfig.parameters.find(
              (v) => v.key === "PackageManager"
            ),
          ]
        : []),
      ...(options_.monorepoConfig.primaryLanguage !== "Java"
        ? [
            {
              ...defaults.monorepoConfig.parameters.find(
                (v) => v.key === "LicenseType"
              ),
              value: licenseType ?? "Apache-2.0",
            },
            ...(["MIT", "MIT-0"].includes(licenseType)
              ? [
                  {
                    key: "CopyrightOwner",
                    value: (
                      options_.monorepoConfig.parameters as DynamicKVInput[]
                    ).find((v) => v.key === "CopyrightOwner")?.value,
                    displayType: "string",
                    displayName: "Copyright owner",
                    description: "Enter the name for the copyright owner",
                    validationRegex: "/^[a-zA-Z][a-zA-Z0-9_\\-\\.]{2,62}$/",
                    validationMessage:
                      "Namespaces must be greater than 3 characters and less than 100 characters, containing alphabetical characters and spaces only.",
                  },
                ]
              : []),
          ]
        : []),
    ]);

    new OptionsSchema(
      this,
      "apiConfig.parameters",
      options_.apiConfig.typeSafeApis.length > 0
        ? options_.apiConfig.typeSafeApis
            .map((tsApi, idx) => {
              const apiInputs = options_.apiConfig
                .parameters as DynamicKVInput[];
              const startIdx = apiInputs.findIndex(
                (v) => v.displayType === "label" && v.value === tsApi
              );
              const endIdx = apiInputs.findIndex(
                (v, idx2) => v.displayType === "label" && idx2 > startIdx
              );
              const chunk: DynamicKVInput[] = apiInputs.slice(
                startIdx + 1,
                endIdx > 0 ? endIdx : undefined
              );
              return [
                {
                  key: `API${idx}`,
                  value: tsApi,
                  displayType: "label",
                  displayName: tsApi,
                },
                {
                  key: `API${idx}_modelLanguage`,
                  value:
                    (chunk.find((v) => v.key.endsWith("_modelLanguage"))
                      ?.value as any) ?? "Smithy",
                  displayType: "dropdown",
                  possibleValues: ["Smithy", "OpenAPI"],
                  displayName: "Model Language",
                  description: "Select Model Language",
                },
                {
                  key: `API${idx}_namespace`,
                  value:
                    (chunk.find((v) => v.key.endsWith("_namespace"))
                      ?.value as any) ?? "com.aws",
                  displayType: "string",
                  displayName: "Namespace",
                  description: "Select Namespace",
                  validationRegex: "/^[a-z]+(?:\\.[a-z]+)+$/",
                  validationMessage:
                    "Namespaces must be lowercase alphabetical characters with a period '.' seperator i.e: com.aws",
                },
                {
                  key: `API${idx}_handlerLanguages`,
                  value: (chunk.find((v) => v.key.endsWith("_handlerLanguages"))
                    ?.value as any) ?? ["TypeScript"],
                  displayType: "dropdown",
                  multiselect: true,
                  possibleValues: ["TypeScript", "Java", "Python"],
                  displayName: "Handler Language(s)",
                  description:
                    "Select the language(s) you want to implement handlers for API operations in.",
                },
                {
                  key: `API${idx}_documentationFormats`,
                  value: (chunk.find((v) =>
                    v.key.endsWith("_documentationFormats")
                  )?.value as any) ?? ["HTML_REDOC"],
                  displayType: "dropdown",
                  multiselect: true,
                  possibleValues: [
                    "HTML_REDOC",
                    "HTML2",
                    "MARKDOWN",
                    "PLANTUML",
                  ],
                  displayName: "Documentation Format(s)",
                  description:
                    "Select formats you prefer for generating API documentation.",
                },
              ];
            })
            .flat()
        : []
    );

    new OptionsSchema(
      this,
      "websiteConfig.parameters",
      options_.websiteConfig.cloudscapeReactTsWebsites.length > 0
        ? options_.websiteConfig.cloudscapeReactTsWebsites
            .map((website, idx) => {
              const websiteInputs = options_.websiteConfig
                .parameters as DynamicKVInput[];
              const startIdx = websiteInputs.findIndex(
                (v) => v.displayType === "label" && v.value === website
              );
              const endIdx = websiteInputs.findIndex(
                (v, idx2) => v.displayType === "label" && idx2 > startIdx
              );
              const chunk: DynamicKVInput[] = websiteInputs.slice(
                startIdx + 1,
                endIdx > 0 ? endIdx : undefined
              );
              return [
                {
                  key: `Website${idx}`,
                  value: website,
                  displayType: "label",
                  displayName: website,
                },
                {
                  key: `Website${idx}_typeSafeApis`,
                  value: (
                    (chunk.find((v) => v.key.endsWith("_typeSafeApis"))
                      ?.value as string[]) ?? []
                  ).filter((v) =>
                    options_.apiConfig.typeSafeApis.find((v2) => v2 === v)
                  ),
                  displayType: "dropdown",
                  multiselect: true,
                  possibleValues: options_.apiConfig.typeSafeApis,
                  displayName: "Type Safe APIs",
                  description: "List of Type Safe APIs",
                },
              ];
            })
            .flat()
        : []
    );

    new OptionsSchema(this, "infra.parameters", [
      {
        key: "TypeSafeApis",
        value: (
          ((options_.infra.parameters as DynamicKVInput[]).find(
            (v) => v.key === "TypeSafeApis"
          )?.value as string[]) ?? []
        ).filter((v) => options_.apiConfig.typeSafeApis.find((v2) => v2 === v)),
        displayType: "dropdown",
        multiselect: true,
        // hidden: generateAll,
        possibleValues: options_.apiConfig.typeSafeApis,
        displayName: "Type Safe APIs",
        description: "List of Type Safe APIs",
      },
      {
        key: "CloudscapeReactTSWebsites",
        value: (
          ((options_.infra.parameters as DynamicKVInput[]).find(
            (v) => v.key === "CloudscapeReactTSWebsites"
          )?.value as string[]) ?? []
        ).filter((v) =>
          options_.websiteConfig.cloudscapeReactTsWebsites.find(
            (v2) => v2 === v
          )
        ),
        displayType: "dropdown",
        multiselect: true,
        possibleValues: options_.websiteConfig.cloudscapeReactTsWebsites,
        displayName: "Cloudscape React Websites",
        description: "List of Cloudscape React Websites",
      },
    ]);

    const computeType = (
      options_.devOps.computeParameters as DynamicKVInput[]
    ).find((v) => v.key === "ComputeType")!;
    const computeFleet = (
      options_.devOps.computeParameters as DynamicKVInput[]
    ).find((v) => v.key === "ComputeFleet")?.value as string;
    const resolvedComputeFleet =
      computeType.value === ComputeType.LAMBDA
        ? LAMBDA_COMPUTE.includes(computeFleet)
          ? computeFleet
          : ComputeFleet.LINUX_X86_64_LARGE
        : computeFleet ?? ComputeFleet.LINUX_X86_64_LARGE;
    new OptionsSchema(this, "devOps.computeParameters", [
      computeType,
      {
        key: "ComputeFleet",
        value: resolvedComputeFleet,
        displayType: "dropdown",
        possibleValues:
          computeType.value === ComputeType.LAMBDA
            ? LAMBDA_COMPUTE
            : EC2_COMPUTE,
        displayName: "Compute fleet",
        description: "Machines that are used to run workflows actions.",
      },
    ]);

    new OptionsSchema(
      this,
      "devOps.parameters",
      options_.devOps.stages.length > 0
        ? options_.devOps.stages
            .map((stage) => {
              const devOpsInputs = options_.devOps
                .parameters as DynamicKVInput[];
              const startIdx = devOpsInputs.findIndex(
                (v) =>
                  v.displayType === "environment" && v.displayName === stage
              );
              const endIdx = devOpsInputs.findIndex(
                (v, idx2) => v.displayType === "environment" && idx2 > startIdx
              );
              const chunk: DynamicKVInput[] = devOpsInputs.slice(
                startIdx,
                endIdx > 0 ? endIdx : undefined
              );

              return [
                {
                  key: `${stage}_Environment`,
                  displayType: "environment",
                  displayName: stage,
                  value:
                    (chunk.find((v) => v.key.endsWith("_Environment"))
                      ?.value as any) ?? undefined,
                  environmentOptions: {
                    showEnvironmentType: true,
                    accountConnections: [
                      {
                        name: stage,
                        description: "AWS account to deploy into.",
                        roles: [
                          {
                            name: "deployRole",
                            displayName:
                              "The role to use for deploying your application",
                            description:
                              "IAM role for deploying your application.",
                            capabilities: ["CDK Deploy"],
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  key: `${stage}_Region`,
                  displayType: "region",
                  displayName: "Region",
                  description:
                    "Select the Region where you want to deploy the application.",
                  value:
                    (chunk.find((v) => v.key.endsWith("_Region"))
                      ?.value as any) ?? "us-west-2",
                  possibleValues: ["*"],
                },
                {
                  key: `${stage}_RequiredApprovals`,
                  displayType: "string",
                  displayName: "Required Approvals",
                  description:
                    "Add number of required approvals for this stage.",
                  value:
                    (chunk.find((v) => v.key.endsWith("_RequiredApprovals"))
                      ?.value as any) ?? "0",
                  validationRegex: "/^([0-2])$/",
                  validationMessage:
                    "Enter a number between 0 and 2 (inclusive).",
                },
                {
                  key: `${stage}_BootstrapCDK`,
                  displayType: "checkbox",
                  displayName: "Bootstrap CDK",
                  description:
                    "Select to bootstrap CDK in the AWS environment.",
                  value:
                    (chunk.find((v) => v.key.endsWith("_BootstrapCDK"))
                      ?.value as any) ?? false,
                },
              ];
            })
            .flat()
        : []
    );

    /**
     * This is a typecheck to ensure that the defaults passed in are of the correct type.
     * There are some cases where the typecheck will fail, but the defaults will still be valid, such when using enums.
     * you can override this ex. myEnum: defaults.myEnum as Options['myEnum'],
     */
    const typeCheck: Options = {
      outdir: this.outdir,
      ...defaults,
      monorepoConfig: {
        ...defaults.monorepoConfig,
        primaryLanguage: defaults.monorepoConfig
          .primaryLanguage as Options["monorepoConfig"]["primaryLanguage"],
      },
      infra: {
        ...defaults.infra,
        language: defaults.infra.language as Options["infra"]["language"],
      },
      devOps: {
        ...defaults.devOps,
        runMode: defaults.devOps.runMode as Options["devOps"]["runMode"],
      },
    };
    this.options = Object.assign(typeCheck, options_);

    // add a repository
    this.sourceRepository = new SourceRepository(this, {
      title: this.options.monorepoConfig.sourceRepositoryName,
    });

    // Create a devfile with the aws-pdk image
    new Workspace(this, this.sourceRepository, {
      schemaVersion: "2.0.0",
      metadata: {
        name: "aws-pdk",
        version: "1.0.1",
        displayName: "AWS PDK",
        description: "Stack with AWS PDK Tooling",
        tags: ["aws-pdk"],
        projectType: "aws",
      },
      components: [
        {
          name: "aws-pdk",
          container: {
            image: "public.ecr.aws/p9i6h6j0/aws-pdk:latest",
            mountSources: true,
            volumeMounts: [
              {
                name: "docker-store",
                path: "/var/lib/docker",
              },
            ],
          },
        },
        {
          name: "docker-store",
          volume: {
            size: "16Gi",
          },
        },
      ],
    });

    // Copy all assets
    Object.entries(assets).forEach(
      ([filePath, content]) =>
        new SourceFile(this.sourceRepository, filePath, content)
    );

    // Create environments
    deploymentStages.forEach(
      (stage) =>
        new Environment(this, {
          name: stage.environment.name,
          environmentType: stage.environment.environmentType ?? "DEVELOPMENT",
        })
    );

    new Workflow(this, {
      sourceRepository: this.sourceRepository,
      runMode: options_.devOps.runMode.toUpperCase() as RunModeDefiniton,
      compute: {
        Type: computeType?.value ?? (ComputeType.EC2 as ComputeType),
        Fleet: resolvedComputeFleet as ComputeFleet,
      },
      deploymentStages,
    });

    const spdx = licenseType !== "ASL-1.0" ? licenseType : undefined;
    const copyrightOwner = ["MIT", "MIT-0"].includes(licenseType)
      ? (this.options.monorepoConfig.parameters as DynamicKVInput[]).find(
          (i) => i.key === "CopyrightOwner"
        )?.value ?? " "
      : (this.options.monorepoConfig.parameters as DynamicKVInput[]).find(
          (i) => i.key === "CopyrightOwner"
        )?.value;
    const licenseText = licenseType === "ASL-1.0" ? ASL : undefined;
    new PDKSynth(this, this.sourceRepository, "monorepo", {
      monorepo: {
        primaryLanguage: this.options.monorepoConfig.primaryLanguage,
        projen: this.options.monorepoConfig.projen,
        packageManager: (
          this.options.monorepoConfig.parameters as DynamicKVInput[]
        ).find((i) => i.key === "PackageManager")?.value as any,
        licenseOptions:
          spdx || copyrightOwner || licenseText
            ? {
                spdx,
                copyrightOwner,
                licenseText,
              }
            : undefined,
      },
      api: options_.apiConfig.typeSafeApis.map((tsApi) => {
        const apiInputs = options_.apiConfig.parameters as DynamicKVInput[];
        const startIdx = apiInputs.findIndex(
          (v) => v.displayType === "label" && v.value === tsApi
        );
        const endIdx = apiInputs.findIndex(
          (v, idx) => v.displayType === "label" && idx > startIdx
        );
        const chunk: DynamicKVInput[] = apiInputs.slice(
          startIdx + 1,
          endIdx > 0 ? endIdx : undefined
        );
        return {
          apiName: tsApi,
          modelLanguage:
            (chunk.find((v) => v.key.endsWith("_modelLanguage"))
              ?.value as any) ?? "Smithy",
          namespace:
            (chunk.find((v) => v.key.endsWith("_namespace"))?.value as any) ??
            "com.aws",
          cdkLanguage: options_.infra.language,
          documentationFormats: (chunk.find((v) =>
            v.key.endsWith("_documentationFormats")
          )?.value as any) ?? ["HTML_REDOC"],
          handlerLanguages: (chunk.find((v) =>
            v.key.endsWith("_handlerLanguages")
          )?.value as any) ?? ["TypeScript"],
        };
      }),
      website: options_.websiteConfig.cloudscapeReactTsWebsites.map(
        (website) => {
          const websiteInputs = options_.websiteConfig
            .parameters as DynamicKVInput[];
          const startIdx = websiteInputs.findIndex(
            (v) => v.displayType === "label" && v.value === website
          );
          const endIdx = websiteInputs.findIndex(
            (v, idx) => v.displayType === "label" && idx > startIdx
          );
          const chunk: DynamicKVInput[] = websiteInputs.slice(
            startIdx + 1,
            endIdx > 0 ? endIdx : undefined
          );

          return {
            websiteName: website,
            typeSafeApis:
              (chunk.find((v) => v.key.endsWith("_typeSafeApis"))
                ?.value as any) ?? [],
          };
        }
      ),
      infra: {
        stackName: this.options.infra.stackName,
        language: this.options.infra.language,
        allowSelfRegistration: this.options.infra.allowSelfRegistration,
        typeSafeApis:
          ((this.options.infra.parameters as DynamicKVInput[]).find(
            (v) => v.key === "TypeSafeApis"
          )?.value as any) ?? [],
        cloudscapeReactTsWebsites:
          ((this.options.infra.parameters as DynamicKVInput[]).find(
            (v) => v.key === "CloudscapeReactTSWebsites"
          )?.value as any) ?? [],
      },
    });

    new Issue(this, "MissingLockFile", {
      title: "Missing Lock File",
      content:
        'The generated project does not have lockfiles automatically generated. To resolve this, either create a new dev environment or clone this project locally and run the following from the root directory of this project:\n\n```\nnpx projen install\ngit add -A\ngit commit -m "fix: add lockfile"\ngit push\n```\n\nThis will trigger your CI pipeline to execute which should result in a successful deployment after whichyou can resolve this ticket.',
      priority: "HIGH",
      labels: ["CI", "Build"],
    });
  }
}
