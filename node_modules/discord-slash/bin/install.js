"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
async function install(client, slash, onError) {
    client.slash = slash;
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand())
            return;
        try {
            await client.slash.execute(interaction);
        }
        catch (e) {
            await onError(interaction, e);
        }
    });
    const rest = new rest_1.REST({ version: '9' }).setToken(client.token);
    const route = v9_1.Routes.applicationCommands(client.application.id);
    const data = { body: client.slash.toJSON() };
    const response = await rest.put(route, data);
    console.log("Global commands registered.", { route, data, response });
}
exports.install = install;
//# sourceMappingURL=install.js.map