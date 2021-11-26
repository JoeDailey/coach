"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashSubcommand = void 0;
class SlashSubcommand {
    constructor(name, description, execute, build) {
        this.name = name;
        this.description = description;
        this.execute = execute;
        this.build = build;
    }
    static alias(name, cmd) {
        return new SlashSubcommand(name, cmd.description, cmd.execute, cmd.build);
    }
}
exports.SlashSubcommand = SlashSubcommand;
//# sourceMappingURL=subcommand.js.map