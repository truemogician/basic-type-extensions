import type { RestructurerConfig } from "@basic-type-extensions/tools";
import Path from "path";

const config: RestructurerConfig = {
	root: Path.resolve(__dirname, "lib"),
	operations: {
		delete: ["index.d.ts", "index.disabled.d.ts"]
	}
};

export default config;