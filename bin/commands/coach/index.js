"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_slash_1 = require("discord-slash");
const draft_1 = __importDefault(require("./draft"));
exports.default = new discord_slash_1.SlashCommand("coach", "Create balanced L4D2 matches and more", draft_1.default);
//# sourceMappingURL=index.js.map