/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { NodePackageManager } from "projen/lib/javascript";
import { TypeScriptProject } from "projen/lib/typescript";
import { PACKAGE_PREFIX } from "../abstract/pdk-blueprint";

export class PDKSynth extends TypeScriptProject {
  constructor(parent: MonorepoTsProject) {
    super({
      parent,
      outdir: "packages/pdk-synth",
      name: `${PACKAGE_PREFIX}synth`,
      defaultReleaseBranch: "main",
      packageManager: NodePackageManager.PNPM,
      sampleCode: false,
      devDeps: ["@types/glob", "@types/mustache"],
      deps: [
        "@amazon-codecatalyst/blueprints",
        "projen",
        "@aws/pdk",
        "glob",
        "mustache",
      ],
    });
  }
}
