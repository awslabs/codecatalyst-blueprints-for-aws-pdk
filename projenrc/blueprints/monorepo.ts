/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprintBase } from "../abstract/pdk-blueprint-base";
import { PDKSynth } from "../components/pdk-synth";

export class MonorepoBlueprint extends PDKBlueprintBase {
  constructor(parent: MonorepoTsProject, synth: PDKSynth) {
    super(parent, {
      packageName: "monorepo",
      displayName: "PDK - Monorepo",
      description:
        "This blueprint sets up a NX based monorepo using constructs found in the AWS Project Development Kit (AWS PDK).",
      keywords: ["pdk", "monorepo", "base"],
    });

    this.addDeps("@aws/pdk", synth.package.packageName);
  }
}
