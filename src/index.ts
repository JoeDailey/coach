import { Client, CommandInteraction, Intents } from 'discord.js';
import { install, Slash, SlashCommand } from "discord-slash";
import { UsageException } from "lobby-bot-3/bin/lib/language";

import coach from "./commands/coach";

(async () => {
  const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ] });

  client.on('ready', () => console.log(`${client.user.username} Online!`));
  await client.login(process.env.DISCORD_TOKEN);
  await install(client, commands(), onError);
})();

function commands() {
  return new Slash(
    [coach.name, coach],
  );
}

async function onError(interaction: CommandInteraction, e: any): Promise<boolean> {
  if (e instanceof UsageException) {
    const message = await e.printMessage();
    await interaction.reply(message);
    return true;
  }

  await interaction.reply({embeds: [{
    title: "Command Failed",
    color: "RED",
    description: "An unexpected error occurred",
    footer: {text: "Use !help to learn more"},
  }]});

  return false;
}
