import { MonorepoTsProject } from "@aws/pdk/monorepo";
import { PDKBlueprint } from "../abstract/pdk-blueprint";
import { PDKSynth } from "../components/pdk-synth";

export class CloudscapeReactWebsiteBlueprint extends PDKBlueprint {
  constructor(parent: MonorepoTsProject, synth: PDKSynth) {
    super(parent, {
      packageName: "cloudscape-react-website",
      displayName: "PDK - Cloudscape React Website",
      description:
        "This blueprint creates a Cloudscape/React Single Page Application (SPA) with pre-configured integration (optional) to a Type-Safe API using constructs found in the AWS Project Development Kit (AWS PDK).",
    });

    this.addDeps("@aws/pdk", synth.package.packageName);
  }
}
