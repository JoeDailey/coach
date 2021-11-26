"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_slash_1 = require("discord-slash");
const language_1 = require("lobby-bot-3/bin/lib/language");
const coach_1 = __importDefault(require("./commands/coach"));
(async () => {
    const client = new discord_js_1.Client({ intents: [
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        ] });
    client.on('ready', () => console.log(`${client.user.username} Online!`));
    await client.login(process.env.DISCORD_TOKEN);
    await (0, discord_slash_1.install)(client, commands(), onError);
})();
function commands() {
    return new discord_slash_1.Slash([coach_1.default.name, coach_1.default]);
}
async function onError(interaction, e) {
    try {
        if (e instanceof language_1.UsageException) {
            const message = await e.printMessage();
            await interaction.reply(message);
            return true;
        }
        await interaction.reply({ embeds: [{
                    title: "Command Failed",
                    color: "RED",
                    description: "An unexpected error occurred",
                    footer: { text: "Use !help to learn more" },
                }] });
        return false;
    }
    catch (e) {
        console.log(e);
    }
}
//# sourceMappingURL=index.js.map