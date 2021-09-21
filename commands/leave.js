const { SlashCommandBuilder } = require("@discordjs/builders");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder().setName("leave").setDescription("leaves vc"),
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guild.id);

    try {
      connection.destroy();
      interaction.reply("Left the Voice Channel");
    } catch (error) {
      interaction.reply(
        "Command fail to execute, You sure I in Voice Channel? Check again"
      );
    }
  },
};
