/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import {
  AccountConnection,
  OptionsSchema,
  EnvironmentDefinition,
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
  Region,
  Role,
  Selector,
  SourceFile,
  SourceRepository,
  Workspace,
  KVSchema,
  OptionsSchemaDefinition,
} from "@amazon-codecatalyst/blueprints";
import { Initializer } from "@amazon-codecatalyst/Centre-of-Prototyping-Excellence.pdk-synth";
import defaults from "./defaults.json";
import { assets } from "./static-assets";

/**
 * This is the 'Options' interface. The 'Options' interface is interpreted by the wizard to dynamically generate a selection UI.
 * 1. It MUST be called 'Options' in order to be interpreted by the wizard
 * 2. This is how you control the fields that show up on a wizard selection panel. Keeping this small leads to a better user experience.
 * 3. All required members of 'Options' must be defined in 'defaults.json' to synth your blueprint locally. They will become the defaults for the wizard.
 */
export interface Options extends ParentOptions {
  monorepoConfig: {
    /**
     * Select the language you want to primarily develop with.
     *
     * @displayName Primary programming language
     */
    primaryLanguage: "TypeScript" | "Java" | "Python";

    parameters: OptionsSchemaDefinition<"monorepoConfig.parameters", KVSchema>;

    /**
     * Enter a name for a new repository or search for an existing repository.
     * @displayName Source Repository
     * @validationRegex /(?!.*\.git$)^[a-zA-Z0-9_.-]{3,100}$/
     * @validationMessage Must contain only alphanumeric characters, periods (.), underscores (_), dashes (-) and be between 3 and 100 characters in length. Cannot end in .git or contain spaces
     */
    sourceRepositoryName: Selector<SourceRepository | string>;
  };

  componentConfig: {
    /**
     * Enter a name for your API.
     *
     * @displayName API name
     * @validationRegex /^[A-Z]\w{0,99}$/
     * @validationMessage API Names must conform to PascalCase and can only contain alphanumerical characters (with the exception of underscores).
     */
    typeSafeApis: string[];

    /**
     * Enter a name for your website.
     *
     * @displayName Website name
     * @validationRegex /^.{0,100}$/
     * @validationMessage Website names can be any string not exceeding 100 chars.
     */
    cloudscapeReactTsWebsites: string[];
  };

  /**
   * @displayName Infrastructure
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

    infraParameters: OptionsSchemaDefinition<"infra.infraParameters", KVSchema>;
  };

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

  /**
   * @displayName Type Safe API Configuration
   */
  apiConfig: {
    parameters: OptionsSchemaDefinition<"apiConfig.parameters", KVSchema>;
  };

  /**
   * @displayName Cloudscape React Website Configuration
   */
  websiteConfig: {
    parameters: OptionsSchemaDefinition<"websiteConfig.parameters", KVSchema>;
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

    new OptionsSchema(
      this,
      "monorepoConfig.parameters",
      defaults.monorepoConfig.parameters.map((e) => ({
        ...e,
        hidden: options_.monorepoConfig.primaryLanguage !== "TypeScript",
      }))
    );

    new OptionsSchema(this, "infra.infraParameters", [
      {
        key: "TypeSafeApis",
        value: "",
        displayType: "dropdown",
        multiselect: true,
        possibleValues: options_.componentConfig.typeSafeApis,
        displayName: "Type Safe APIs",
        description: "List of Type Safe APIs",
      },
      {
        key: "CloudscapeReactTSWebsite",
        value: "",
        displayType: "dropdown",
        multiselect: true,
        possibleValues: options_.componentConfig.cloudscapeReactTsWebsites,
        displayName: "Cloudscape React Websites",
        description: "List of Cloudscape React Websites",
      },
    ]);

    new OptionsSchema(
      this,
      "apiConfig.parameters",
      options_.componentConfig.typeSafeApis.length > 0
        ? options_.componentConfig.typeSafeApis
            .map((tsApi, idx) => [
              {
                key: `API${idx}`,
                value: tsApi,
                displayType: "label",
                displayName: tsApi,
              },
              {
                key: `API${idx}_modelLanguage`,
                value: "Smithy",
                displayType: "dropdown",
                possibleValues: ["Smithy", "OpenAPI"],
                displayName: "Model Language",
                description: "Select Model Language",
              },
              {
                key: `API${idx}_namespace`,
                value: "com.aws",
                displayType: "string",
                displayName: "Namespace",
                description: "Select Namespace",
                validationRegex: "/^[a-z]+(?:\\.[a-z]+)+$/",
                validationMessage:
                  "Namespaces must be lowercase alphabetical characters with a period '.' seperator i.e: com.aws",
              },
              {
                key: `API${idx}_cdkLanguage`,
                value: "TypeScript",
                displayType: "dropdown",
                possibleValues: ["TypeScript", "Java", "Python"],
                displayName: "CDK Language",
                description: "Enter CDK Language",
              },
              {
                key: `API${idx}_handlerLanguages`,
                value: ["TypeScript"],
                displayType: "dropdown",
                multiselect: true,
                possibleValues: ["TypeScript", "Java", "Python"],
                displayName: "Handler Language(s)",
                description:
                  "Select the language(s) you want to implement handlers for API operations in.",
              },
              {
                key: `API${idx}_documentationFormats`,
                value: ["HTML_REDOC"],
                displayType: "dropdown",
                multiselect: true,
                possibleValues: ["HTML_REDOC", "HTML2", "MARKDOWN", "PLANTUML"],
                displayName: "Documentation Format(s)",
                description:
                  "Select formats you prefer for generating API documentation.",
              },
            ])
            .flat()
        : defaults.apiConfig.parameters
    );

    new OptionsSchema(
      this,
      "websiteConfig.parameters",
      options_.componentConfig.cloudscapeReactTsWebsites.length > 0
        ? options_.componentConfig.cloudscapeReactTsWebsites
            .map((website, idx) => [
              {
                key: `Website${idx}`,
                value: website,
                displayType: "label",
                displayName: website,
              },
              {
                key: `Website${idx}_typeSafeApis`,
                value: "",
                displayType: "dropdown",
                multiselect: true,
                possibleValues: options_.componentConfig.typeSafeApis,
                displayName: "Type Safe APIs",
                description: "List of Type Safe APIs",
              },
            ])
            .flat()
        : defaults.websiteConfig.parameters
    );

    initializer && initializer(this);
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
        language: defaults.infra.language as Options["infra"]["language"],
        stackName: defaults.infra.stackName,
        infraParameters: defaults.infra.infraParameters,
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

    // new PDKSynth(this, this.sourceRepository, "monorepo", {
    //   ...this.options,
    // });
  }
}
