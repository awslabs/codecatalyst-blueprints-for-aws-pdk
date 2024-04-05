import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";
import { PDKSynth } from "../components/pdk-synth";

export class CloudscapeReactWebsiteBlueprint extends PDKBlueprint {
  constructor(parent: MonorepoTsProject, synth: PDKSynth) {
    super(parent, {
      packageName: "cloudscape-react-website",
      displayName: "PDK - Cloudscape React Website",
      description:
        "This blueprint creates a React Single Page Application (SPA) using the Cloudscape design system with preconfigured integration to a Type-Safe API (optional) using constructs found in the AWS Project Development Kit (AWS PDK).",
      keywords: ["pdk", "cloudscape", "frontend", "spa", "react", "typescript"],
    });

    this.addDeps("@aws/pdk", synth.package.packageName);
  }
}
