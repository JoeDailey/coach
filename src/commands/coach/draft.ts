import { SlashSubcommand } from "discord-slash"
import { CommandInteraction, GuildMember } from "discord.js"
import { Channel, Lobby, Match, Versus } from "lobby-bot-3/bin/lib/lobbies"
import { redis } from "lobby-bot-3/bin/lib/data";
import { toUser } from "lobby-bot-3/bin/lib/language";

export default new SlashSubcommand(
  "draft",
  "Create balanced teams",
  handle,
  cmd => cmd
);

async function handle(interaction: CommandInteraction) {
  const channel = interaction.channel as Channel;
  const lobby = await Lobby.get(channel);
  const match = await getMatch(lobby);
  await interaction.reply(await lobby.printMatch(channel, match));
}

async function getMatch(lobby: Lobby): Promise<Match> {
  const teams = lobby.getTeams();
  let [matches, index] = await getMatchesAndIndex(lobby);
  const match = matches[index];
  if (match == null) {
    await redis.set(`${lobby.id}:rc:coach-ranksIndex`, -1)
    throw toUser("All Matches Seen");
  }

  if (matches[++index] == null)
    index = -1;
  
  await redis.set(`${lobby.id}:rc:coach-ranksIndex`, index)
  return match;
}

async function getMatchesAndIndex(lobby: Lobby): Promise<[Array<Match>, number]> {
  const result = await redis.multi()
    .get(`${lobby.id}:rc:coach-ranks`)
    .get(`${lobby.id}:rc:coach-ranksIndex`)
    .exec();

  let matches = result[0][1];
  let index = parseInt(result[1][1] ?? 0);

  if (matches == null) {
    matches = await rank(Versus.findAllMatches(lobby.getReadies(), lobby.getTeams()));
    index = 0;
    await redis.multi()
      .set(`${lobby.id}:rc:coach-ranks`, JSON.stringify(matches))
      .set(`${lobby.id}:rc:coach-ranksIndex`, index)
      .exec();
    return [matches, index];
  }

  if (index == -1) {
    throw toUser("All Matches Seen");
  }

  matches = JSON.parse(matches) as Array<Match>;
  return [matches, index];
}

async function rank(matches: Match[]) {
  return matches;
} 