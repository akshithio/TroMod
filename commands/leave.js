const { SlashCommandBuilder } = require("@discordjs/builders");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder().setName("leave").setDescription("leaves vc"),
  async execute(interaction) {

    
    const connection = getVoiceConnection(interaction.guild.id);
    connection.destroy();
    interaction.reply("Not in the VC");
  },
};
