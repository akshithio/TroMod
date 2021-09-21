const { SlashCommandBuilder } = require("@discordjs/builders");

var connection;

const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  entersState,
  StreamType,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder().setName("join").setDescription("joins vc"),
  async execute(interaction) {
    let channel = interaction.member.voice.channel;

    try {
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();

      connection.subscribe(player);
      playSong();

      function playSong() {
        const resource = createAudioResource(
          "/Users/akshithchowdary/Developer/Coding/Projects/DiscordBots/Tromod/lol.mp3",
          {
            inputType: StreamType.Arbitrary,
          }
        );

        player.play(resource);

        return entersState(player, AudioPlayerStatus.Playing, 5e3);
      }

      interaction.reply("joined vc");
    } catch (err) {
      interaction.reply(
        "Error executing that command, make sure to be in a voice channel before calling this command"
      );
    }
  },
};
