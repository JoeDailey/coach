import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/rest/v9";
import { CommandInteraction } from "discord.js";
import { SlashSubcommand } from "./subcommand";
export declare class SlashCommand {
    readonly name: string;
    readonly descriptions: string;
    static alias(name: string, cmd: SlashCommand): [string, SlashCommand];
    readonly subcommands: Map<string, SlashSubcommand>;
    constructor(name: string, descriptions: string, ...subcommands: SlashSubcommand[]);
    execute(interaction: CommandInteraction): Promise<void>;
    private handleDefault;
    toJSON(): RESTPostAPIApplicationCommandsJSONBody;
}
