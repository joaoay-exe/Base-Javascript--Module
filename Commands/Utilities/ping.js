export default {
    name: "ping",
    description: "[]",
    async run(client, interaction) {
        await interaction.reply(`🏓 Pong! A latência do bot é de ${client.ws.ping}ms`);
    }
}