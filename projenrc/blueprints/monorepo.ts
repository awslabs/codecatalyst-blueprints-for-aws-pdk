/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";
import { PDKSynth } from "../components/pdk-synth";

export class MonorepoBlueprint extends PDKBlueprint {
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
