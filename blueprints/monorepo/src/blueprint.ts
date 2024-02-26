import {
  Blueprint as ParentBlueprint,
  Options as ParentOptions,
  SampleWorkspaces,
  Selector,
  SourceRepository,
  Workspace,
} from "@amazon-codecatalyst/blueprints";
import { PDKSynth } from "@amazon-codecatalyst/Centre-of-Prototyping-Excellence.pdk-synth";

import defaults from "./defaults.json";

/**
 * This is the 'Options' interface. The 'Options' interface is interpreted by the wizard to dynamically generate a selection UI.
 * 1. It MUST be called 'Options' in order to be interpreted by the wizard
 * 2. This is how you control the fields that show up on a wizard selection panel. Keeping this small leads to a better user experience.
 * 3. All required members of 'Options' must be defined in 'defaults.json' to synth your blueprint locally. They will become the defaults for the wizard.
 */
export interface Options extends ParentOptions {
  /**
   * Select the language you wish to primarily develop with.
   *
   * @displayName Primary Language
   */
  primaryLanguage: "Typescript" | "Java" | "Python";

  /**
   * @displayName Code Configuration
   * @collapsed true
   */
  code: {
    /**
     * @displayName Package Manager (Typescript only)
     */
    packageManager: "BUN" | "PNPM" | "YARN_BERRY" | "NPM";

    /**
     * @displayName Source Repository
     * @validationRegex /(?!.*\.git$)^[a-zA-Z0-9_.-]{3,100}$/
     * @validationMessage Must contain only alphanumeric characters, periods (.), underscores (_), dashes (-) and be between 3 and 100 characters in length. Cannot end in .git or contain spaces
     */
    sourceRepositoryName: Selector<SourceRepository | string>;
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
    /**
     * This is a typecheck to ensure that the defaults passed in are of the correct type.
     * There are some cases where the typecheck will fail, but the defaults will still be valid, such when using enums.
     * you can override this ex. myEnum: defaults.myEnum as Options['myEnum'],
     */
    const typeCheck: Options = {
      outdir: this.outdir,
      ...defaults,
      primaryLanguage: defaults.primaryLanguage as Options["primaryLanguage"],
      code: {
        ...defaults.code,
        packageManager: defaults.code
          .packageManager as Options["code"]["packageManager"],
      },
    };
    this.options = Object.assign(typeCheck, options_);

    // add a repository
    this.sourceRepository = new SourceRepository(this, {
      title: this.options.code.sourceRepositoryName,
    });

    // Create a devfile with all pdk deps pre-installed
    new Workspace(this, this.sourceRepository, {
      ...SampleWorkspaces.default,
      commands: [
        {
          id: "install-pdk-deps",
          exec: {
            commandLine:
              "source /usr/local/.mde-user/.nvm/nvm.sh && nvm use 20 && npm install -g @aws/pdk bun --force && sudo yum -y install graphviz",
            component: "aws-runtime",
          },
        },
      ],
      events: {
        postStart: ["install-pdk-deps"],
      },
    });

    new PDKSynth(this, this.sourceRepository, "monorepo", this.options);
  }
}
