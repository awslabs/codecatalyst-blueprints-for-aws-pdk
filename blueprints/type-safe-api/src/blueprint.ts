import {
  MultiSelect,
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
  SourceRepository,
} from "@amazon-codecatalyst/blueprints";
import {
  Initializer,
  PDKSynth,
  validateMonorepoExists,
} from "@amazon-codecatalyst/Centre-of-Prototyping-Excellence.pdk-synth";

import defaults from "./defaults.json";

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
   * The language the API model is defined in.
   *
   * @displayName Model Language
   */
  modelLanguage: "Smithy" | "OpenAPI";

  /**
   * Enter a namespace for your API.
   *
   * @displayName Namespace
   * @validationRegex /^[a-z]+(?:\.[a-z]+)+$/
   * @validationMessage Namespaces must be lowercase alphabetical characters with a period '.' seperator i.e: com.aws
   */
  namespace: string;

  /**
   * Enter a name for your API.
   *
   * @displayName API name
   * @validationRegex /^[A-Z]\w{0,99}$/
   * @validationMessage API Names must conform to PascalCase and can only contain alphanumerical characters (with the exception of underscores).
   */
  apiName: string;

  /**
   * Select the language you want to write CDK infrastructure to deploy the API in.
   *
   * @displayName CDK language
   */
  cdkLanguage: "TypeScript" | "Java" | "Python";

  /**
   * Select the language(s) you want to implement handlers for API operations in.
   *
   * @displayName Handler language(s)
   */
  handlerLanguages: MultiSelect<"TypeScript" | "Java" | "Python">;

  /**
   * Select formats you prefer for generating API documentation.
   *
   * @displayName Documentation format(s)
   */
  documentationFormats: MultiSelect<
    "HTML_REDOC" | "HTML2" | "MARKDOWN" | "PLANTUML"
  >;
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
      cdkLanguage: defaults.cdkLanguage as Options["cdkLanguage"],
      modelLanguage: defaults.modelLanguage as Options["modelLanguage"],
      handlerLanguages:
        defaults.handlerLanguages as Options["handlerLanguages"],
      documentationFormats:
        defaults.documentationFormats as Options["documentationFormats"],
    };
    this.options = Object.assign(typeCheck, options_);
    this.setInstantiation({
      description: this.options.apiName,
    });

    // Get a reference to the src repository
    this.sourceRepository = new SourceRepository(this, {
      title: this.context.project.src.listRepositoryNames()[0],
    });

    new PDKSynth(this, this.sourceRepository, "type-safe-api", {
      ...this.options,
    });
  }
}
