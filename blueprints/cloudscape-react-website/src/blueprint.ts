import {
  BlueprintInstantiation,
  MultiSelect,
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
  SourceFile,
  SourceRepository,
} from "@amazon-codecatalyst/blueprints";
import {
  Initializer,
  PDKSynth,
} from "@amazon-codecatalyst/Centre-of-Prototyping-Excellence.pdk-synth";

import defaults from "./defaults.json";
import { assets } from "./static-assets";

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
   * Name of your website
   *
   * @displayName Website name
   * @validationRegex /^.{0,100}$/
   * @validationMessage Website names can be any string not exceeding 100 chars.
   */
  websiteName: string;

  /**
   * Type Safe APIs
   *
   * @displayName Type-Safe APIs
   * @filter /pdk-type-safe-api$/
   */
  typeSafeApis: MultiSelect<BlueprintInstantiation>;
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
    this.setInstantiation({
      description: this.options.websiteName,
    });

    // Get reference to src repository
    this.sourceRepository = new SourceRepository(this, {
      title: this.context.project.src.listRepositoryNames()[0],
    });

    // Copy all assets
    Object.entries(assets).forEach(
      ([filePath, content]) =>
        new SourceFile(this.sourceRepository, filePath, content)
    );

    new PDKSynth(this, this.sourceRepository, "cloudscape-react-website", {
      ...this.options,
      initializer,
    });
  }
}
