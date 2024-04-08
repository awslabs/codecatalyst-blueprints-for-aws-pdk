/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { NodePackageManager } from "projen/lib/javascript";

export const HEADER_RULE = {
  "header/header": [
    2,
    "block",
    [
      "! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.",
      "SPDX-License-Identifier: Apache-2.0 ",
    ],
  ],
};

export class PDKBlueprintsProject extends MonorepoTsProject {
  constructor() {
    super({
      defaultReleaseBranch: "main",
      packageManager: NodePackageManager.PNPM,
      devDeps: [
        "@aws/pdk",
        "@amazon-codecatalyst/blueprints",
        "@amazon-codecatalyst/blueprint-util.projen-blueprint",
        "eslint-plugin-header",
      ],
      name: "codecatalyst-blueprints-for-aws-pdk",
      projenrcTs: true,
      eslint: true,
      eslintOptions: {
        dirs: ["projects", "private", "projenrc"],
        ignorePatterns: ["blueprints/**/*.*", "packages/**/*.*"],
      },
    });

    this.eslint?.addPlugins("header");
    this.eslint?.addRules(HEADER_RULE);

    const lintTask = this.addTask("monorepo:eslint");
    lintTask.reset(
      "eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern .projenrc.ts projenrc"
    );
    this.buildTask.spawn(lintTask);

    this.nx.nxIgnore.addPatterns("**/synth/**");
    this.nx.setTargetDefault("blueprint:release", {
      dependsOn: ["^blueprint:release"],
    });

    this.tasks.addTask("generate:attribution", {
      exec: "npx -y @quantco/pnpm-licenses generate-disclaimer --prod -o LICENSE_THIRD_PARTY",
    });
  }
}
