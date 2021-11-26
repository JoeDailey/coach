"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashSubcommand = exports.SlashCommand = exports.Slash = exports.install = void 0;
var install_1 = require("./install");
Object.defineProperty(exports, "install", { enumerable: true, get: function () { return install_1.install; } });
var root_1 = require("./root");
Object.defineProperty(exports, "Slash", { enumerable: true, get: function () { return root_1.Slash; } });
var command_1 = require("./command");
Object.defineProperty(exports, "SlashCommand", { enumerable: true, get: function () { return command_1.SlashCommand; } });
var subcommand_1 = require("./subcommand");
Object.defineProperty(exports, "SlashSubcommand", { enumerable: true, get: function () { return subcommand_1.SlashSubcommand; } });
//# sourceMappingURL=index.js.map