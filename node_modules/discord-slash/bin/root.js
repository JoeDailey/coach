"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slash = void 0;
class Slash {
    constructor(...commands) {
        this.commands = new Map(commands);
    }
    async execute(interaction) {
        await this.commands.get(interaction.commandName).execute(interaction);
    }
    toJSON() {
        return [...this.commands.values()].map(cmd => cmd.toJSON());
    }
}
exports.Slash = Slash;
//# sourceMappingURL=root.js.map