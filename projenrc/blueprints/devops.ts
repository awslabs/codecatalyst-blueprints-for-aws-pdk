/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";
import { PDKSynth } from "../components/pdk-synth";

export class DevOpsBlueprint extends PDKBlueprint {
  constructor(parent: MonorepoTsProject, synth: PDKSynth) {
    super(parent, {
      packageName: "devops",
      displayName: "PDK - DevOps",
      description:
        "This blueprint creates DevOps workflows compatible with constructs found in the AWS Project Development Kit (AWS PDK).",
      keywords: ["pdk", "devops", "release"],
    });

    this.addDeps("@aws/pdk", synth.package.packageName);
  }
}
