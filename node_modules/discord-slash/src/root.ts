import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/rest/v9";
import { CommandInteraction } from "discord.js";
import { SlashCommand } from "./command";

export class Slash {
  private commands: Map<string, SlashCommand>;
  public constructor(
    ...commands: Array<[string, SlashCommand]>
  ) {
    this.commands = new Map(commands);
  }

  public async execute(interaction: CommandInteraction) {
    await this.commands.get(interaction.commandName).execute(interaction);
  }

  public toJSON(): RESTPostAPIApplicationCommandsJSONBody[] {
    return [...this.commands.values()].map(cmd => cmd.toJSON());
  }
}