import { Client, Interaction } from "discord.js";
import { Slash } from "./root";
declare module "discord.js" {
    interface Client<Ready extends boolean = boolean> {
        slash: Slash;
    }
}
export declare type SlashErrorHandler = (interaction: Interaction, e: any) => Promise<boolean>;
export declare function install(client: Client, slash: Slash, onError: SlashErrorHandler): Promise<void>;
