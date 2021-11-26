import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/rest/v9";
import { CommandInteraction } from "discord.js";
import { SlashSubcommand } from "./subcommand";

export class SlashCommand {
  public static alias(name: string, cmd: SlashCommand): [string, SlashCommand] {
    return [name, new SlashCommand(
      name,
      cmd.descriptions,
      ...cmd.subcommands.values(),
    )];
  }

  readonly subcommands: Map<string, SlashSubcommand>;
  public constructor(
    readonly name: string,
    readonly descriptions: string,
    ...subcommands: SlashSubcommand[]
  ) {
    
    this.subcommands = new Map(subcommands.map(cmd => ([cmd.name, cmd])));
  }

  public async execute(interaction: CommandInteraction) {
    const subcmd = interaction.options.getSubcommand();
    if (subcmd) {
      return await this.subcommands.get(subcmd)?.execute(interaction);
    }

    this.handleDefault(interaction);
  }

  private handleDefault(interaction: CommandInteraction) {
    throw new Error('Not Implemented');
  }

  public toJSON(): RESTPostAPIApplicationCommandsJSONBody {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.descriptions);
  
    for (const [_name, subcmd] of this.subcommands) {
      builder.addSubcommand(builder => subcmd.build(
        builder
          .setName(subcmd.name)
          .setDescription(subcmd.description)
      ));
    }
    
    return builder.toJSON();
  }
}