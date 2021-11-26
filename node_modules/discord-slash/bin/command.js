"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
const builders_1 = require("@discordjs/builders");
class SlashCommand {
    constructor(name, descriptions, ...subcommands) {
        this.name = name;
        this.descriptions = descriptions;
        this.subcommands = new Map(subcommands.map(cmd => ([cmd.name, cmd])));
    }
    static alias(name, cmd) {
        return [name, new SlashCommand(name, cmd.descriptions, ...cmd.subcommands.values())];
    }
    async execute(interaction) {
        var _a;
        const subcmd = interaction.options.getSubcommand();
        if (subcmd) {
            return await ((_a = this.subcommands.get(subcmd)) === null || _a === void 0 ? void 0 : _a.execute(interaction));
        }
        this.handleDefault(interaction);
    }
    handleDefault(interaction) {
        throw new Error('Not Implemented');
    }
    toJSON() {
        const builder = new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.descriptions);
        for (const [_name, subcmd] of this.subcommands) {
            builder.addSubcommand(builder => subcmd.build(builder
                .setName(subcmd.name)
                .setDescription(subcmd.description)));
        }
        return builder.toJSON();
    }
}
exports.SlashCommand = SlashCommand;
//# sourceMappingURL=command.js.map