import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";
import { PDKSynth } from "../components/pdk-synth";

export class TypeSafeApiBlueprint extends PDKBlueprint {
  constructor(parent: MonorepoTsProject, synth: PDKSynth) {
    super(parent, {
      packageName: "type-safe-api",
      displayName: "PDK - Type Safe API",
      description:
        "This blueprint creates a type safe api using constructs found in the AWS Project Development Kit (AWS PDK).",
    });

    this.addDeps("@aws/pdk", synth.package.packageName);
  }
}
