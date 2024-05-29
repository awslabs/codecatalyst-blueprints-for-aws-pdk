/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprintBase } from "../abstract/pdk-blueprint-base";
import { PDKSynth } from "../components/pdk-synth";

export class PDKBlueprint extends PDKBlueprintBase {
  constructor(parent: MonorepoTsProject, synth: PDKSynth) {
    super(parent, {
      packageName: "pdk",
      displayName: "Project Devlopment Kit (PDK)",
      description:
        "This blueprint sets up and application using composable constructs found within the AWS Project Development Kit (AWS PDK).",
      keywords: ["pdk"],
    });

    this.addDeps("@aws/pdk", synth.package.packageName);
  }
}
