import { SlashCommand, SlashSubcommand } from "discord-slash";

import Draft from "./draft";

export default new SlashCommand(
  "coach",
  "Create balanced L4D2 matches and more",
  Draft,
);