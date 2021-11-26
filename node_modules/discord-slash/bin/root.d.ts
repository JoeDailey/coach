import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/rest/v9";
import { CommandInteraction } from "discord.js";
import { SlashCommand } from "./command";
export declare class Slash {
    private commands;
    constructor(...commands: Array<[string, SlashCommand]>);
    execute(interaction: CommandInteraction): Promise<void>;
    toJSON(): RESTPostAPIApplicationCommandsJSONBody[];
}
