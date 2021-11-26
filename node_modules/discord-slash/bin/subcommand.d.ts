import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
export declare class SlashSubcommand {
    readonly name: string;
    readonly description: string;
    readonly execute: (interaction: CommandInteraction) => Promise<void>;
    readonly build: (builder: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder;
    constructor(name: string, description: string, execute: (interaction: CommandInteraction) => Promise<void>, build: (builder: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder);
    static alias(name: string, cmd: SlashSubcommand): SlashSubcommand;
}
