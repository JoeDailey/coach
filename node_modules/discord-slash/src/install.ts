import { REST } from "@discordjs/rest"
import { Client, Interaction } from "discord.js"
import { Routes } from "discord-api-types/v9";
import { Slash } from "./root";

declare module "discord.js" {
  interface Client<Ready extends boolean = boolean> {
    slash: Slash;
  }
}

export type SlashErrorHandler = (interaction: Interaction, e: any) => Promise<boolean>;

export async function install(client: Client, slash: Slash, onError: SlashErrorHandler) {
  client.slash = slash;

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    try {
      await client.slash.execute(interaction);
    } catch (e) {
      try {
        await onError(interaction, e);
      } catch (ee) {
        console.error(`Error while handling ${e}`, ee);
      }
    }
  });

  const rest = new REST({version: '9'}).setToken(client.token);
  const route = Routes.applicationCommands(client.application.id);
  const data = { body: client.slash.toJSON() };
  const response = await rest.put(route, data);
  console.log("Global commands registered.", {route, data, response});
}