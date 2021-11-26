"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_slash_1 = require("discord-slash");
const lobbies_1 = require("lobby-bot-3/bin/lib/lobbies");
const data_1 = require("lobby-bot-3/bin/lib/data");
const language_1 = require("lobby-bot-3/bin/lib/language");
exports.default = new discord_slash_1.SlashSubcommand("draft", "Create balanced teams", handle, cmd => cmd);
async function handle(interaction) {
    const channel = interaction.channel;
    const lobby = await lobbies_1.Lobby.get(channel);
    const match = await getMatch(lobby);
    await interaction.reply(await lobby.printMatch(channel, match));
}
async function getMatch(lobby) {
    const teams = lobby.getTeams();
    let [matches, index] = await getMatchesAndIndex(lobby);
    const match = matches[index];
    if (match == null) {
        await data_1.redis.set(`${lobby.id}:rc:coach-ranksIndex`, -1);
        throw (0, language_1.toUser)("All Matches Seen");
    }
    if (matches[++index] == null)
        index = -1;
    await data_1.redis.set(`${lobby.id}:rc:coach-ranksIndex`, index);
    return match;
}
async function getMatchesAndIndex(lobby) {
    var _a;
    const result = await data_1.redis.multi()
        .get(`${lobby.id}:rc:coach-ranks`)
        .get(`${lobby.id}:rc:coach-ranksIndex`)
        .exec();
    let matches = result[0][1];
    let index = parseInt((_a = result[1][1]) !== null && _a !== void 0 ? _a : 0);
    if (matches == null) {
        matches = await rank(lobbies_1.Versus.findAllMatches(lobby.getReadies(), lobby.getTeams()));
        index = 0;
        await data_1.redis.multi()
            .set(`${lobby.id}:rc:coach-ranks`, JSON.stringify(matches))
            .set(`${lobby.id}:rc:coach-ranksIndex`, index)
            .exec();
        return [matches, index];
    }
    if (index == -1) {
        throw (0, language_1.toUser)("All Matches Seen");
    }
    matches = JSON.parse(matches);
    return [matches, index];
}
async function rank(matches) {
    return matches;
}
//# sourceMappingURL=draft.js.map