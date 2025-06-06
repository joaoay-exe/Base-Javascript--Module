import { InteractionType, } from "discord.js";

export default {
    name: "interactionCreate",
    async run(interaction, client) {
        if (interaction.type === InteractionType.ApplicationCommand) {

            const cmd = client.SlashCommands.get(interaction.commandName);
            if (interaction.guild && !interaction.member) {
                interaction.member = await interaction.guild.members.fetch(interaction.user.id);
            }

            try {
                cmd.run(client, interaction);
            } catch (err) {
                console.log(err);
            }
        }

    }
}