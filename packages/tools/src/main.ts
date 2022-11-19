import Yargs from "yargs";
import { version } from "../package.json";
import restructureCommand from "./restructurer/command";

const commands = [restructureCommand];

const cli = Yargs.strict().help().version(version);
commands.forEach(command => cli.command(command));
cli.demandCommand(1, "You need at least one command before moving on").argv;