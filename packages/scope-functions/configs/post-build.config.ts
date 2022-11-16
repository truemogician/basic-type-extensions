export interface PostBuildConfig {
	copy?: [source: string, destination: string][];

	move?: [source: string, destination: string][];

	delete?: string[];
}

const config: PostBuildConfig | PostBuildConfig[] = {
	delete: ["index.d.ts", "index.disabled.d.ts"]
};

export default config;