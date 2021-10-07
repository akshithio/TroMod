const { SlashCommandBuilder } = require("@discordjs/builders");

var connection;

// const fs = require("fs");
// const ytdl = require("ytdl-core");

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
    console.log(interaction.channel);
    let channel = interaction.member.voice.channel;

    var arrayofMusic = [
      "MiceOnVenus.mp3",
      "Pigstep.mp3",
      "Rickroll.mp3",
      "SubwooferLullaby.mp3",
      "Sweden.mp3",
    ];

    var link = "Tromod/Music/" + arrayofMusic[0];
    // Math.round(Math.random() * 4)
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
          "/Users/akshithchowdary/Developer/Coding/Projects/DiscordBots/" +
            link,
          {
            inputType: StreamType.Arbitrary,
          }
        );

        player.play(resource);

        return entersState(player, AudioPlayerStatus.Playing, 5e3);
      }

      interaction.reply(
        "**Hacking Lord's Computer System** \n Accessing " + link
      );
    } catch (err) {
      interaction.reply(
        "Error executing that command, make sure to be in a voice channel before calling this command"
      );
    }
  },
};
