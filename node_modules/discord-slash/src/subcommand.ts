import { SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export class SlashSubcommand {
  public constructor(
    readonly name: string,
    readonly description: string,
    readonly execute: (interaction: CommandInteraction) => Promise<void>,
    readonly build: (builder: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder,
  ) {}

  public static alias(name: string, cmd: SlashSubcommand): SlashSubcommand {
    return new SlashSubcommand(
      name,
      cmd.description,
      cmd.execute,
      cmd.build,
    );
  }
}

