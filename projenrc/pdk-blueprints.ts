import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { NodePackageManager } from "projen/lib/javascript";

export class PDKBlueprintsProject extends MonorepoTsProject {
  constructor() {
    super({
      defaultReleaseBranch: "main",
      packageManager: NodePackageManager.PNPM,
      devDeps: [
        "@aws/pdk",
        "@amazon-codecatalyst/blueprints",
        "@amazon-codecatalyst/blueprint-util.projen-blueprint",
      ],
      name: "codecatalyst-blueprints-for-aws-pdk",
      projenrcTs: true,
    });

    this.nx.nxIgnore.addPatterns("**/synth/**");
  }
}
