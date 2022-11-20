import Yargs from "yargs";
import FileSystem from "fs";
import Path from "path";
import restructure from "./main";
import { loadModule } from "../loader";
import { isRestructurerConfig, type RestructurerConfig } from "./types";

const command: Yargs.CommandModule = {
	command: "restructure <config>",
	describe: "Restructure the output directory",
	builder: yargs => yargs
		.positional("config", {
			type: "string",
			describe: "Path to the restructurer config file (*.json|*.js|*.ts), or a json string to use as config",
			async coerce(arg: string) {
				if (arg.startsWith("{"))
					return JSON.parse(arg);
				arg = Path.resolve(process.cwd(), arg);
				if (!FileSystem.existsSync(arg))
					throw new Error(`Config file ${arg} does not exist`);
				return await loadModule(arg);
			}
		})
		.check(argv => {
			const config = argv.config as any;
			if (!isRestructurerConfig(config))
				throw new Error("Invalid config");
			return true;
		}),
	handler: argv => restructure(argv.config as RestructurerConfig)
};

export default command;