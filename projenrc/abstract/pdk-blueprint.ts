import {
  ProjenBlueprint,
  ProjenBlueprintOptions,
} from "@amazon-codecatalyst/blueprint-util.projen-blueprint";
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { NodePackageManager } from "projen/lib/javascript";

export const PUBLISHING_ORG = "Centre-of-Prototyping-Excellence";
export const PACKAGE_PREFIX = `@amazon-codecatalyst/${PUBLISHING_ORG}.pdk-`;

/**
 * PDKBlueprint props.
 */
export interface PDKBlueprintProps extends Partial<ProjenBlueprintOptions> {
  /**
   * Blueprint package name.
   */
  readonly packageName: string;

  /**
   * Name to show in the CodeCatalyst Blueprint Selector UI
   */
  readonly displayName: string;

  /**
   * Description of the Blueprint.
   */
  readonly description: string;
}

/**
 * Base class all PDK Blueprints should extend from.
 */
export abstract class PDKBlueprint extends ProjenBlueprint {
  constructor(parent: MonorepoTsProject, props: PDKBlueprintProps) {
    super({
      ...props,
      parent,
      outdir: `blueprints/${props.packageName}`,
      packageManager: NodePackageManager.PNPM,
      authorName: PUBLISHING_ORG,
      packageName: `${PACKAGE_PREFIX}${props.packageName}`.toLowerCase(),
      name: props.packageName,
      defaultReleaseBranch: "main",
      displayName: props.displayName,
      license: "MIT",
      projenrcTs: true,
      sampleCode: false,
      github: false,
      eslint: true,
      jest: false,
      npmignoreEnabled: false,
      projenVersion: "0.76.27",
      prettier: true,
      tsconfig: {
        exclude: ["static-assets"],
        compilerOptions: {
          esModuleInterop: true,
          noImplicitAny: false,
        },
      },
      copyrightOwner: PUBLISHING_ORG,
      authorOrganization: true,
      publishingSpace: PUBLISHING_ORG,
      description: props.description,
    });

    this.packageTask.reset("mkdir -p dist/js");
    this.packageTask.exec("mv $(pnpm pack) dist/js/");

    this.addDevDeps("ts-node", "typescript");

    this.addDeps(
      "@amazon-codecatalyst/blueprints",
      "@amazon-codecatalyst/blueprint-util.cli",
      "projen"
    );
  }
}
