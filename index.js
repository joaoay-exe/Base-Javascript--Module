import { Client, Collection, GatewayIntentBits } from "discord.js";
import Events from "./Handler/Events.js";
import Commands from "./Handler/Commands.js";
import "dotenv/config";

const client = new Client({
    intents: Object.keys(GatewayIntentBits)
});

Events.run(client);
Commands.run(client);

client.SlashCommands = new Collection();
client.login(process.env.Token);

export default client;