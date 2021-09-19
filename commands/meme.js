const { SlashCommandBuilder } = require("@discordjs/builders");
const https = require("https");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("shows meme"),
  async execute(interaction) {
    interaction.deferReply();

    subReddit = ["filler", "memes", "meme", "dankmemes"];

    const url =
      "https://www.reddit.com/r/" +
      subReddit[Math.round(Math.random() * 2 + 1)] +
      "/top/.json?limit=100";

    https.get(url, (result) => {
      var body = "";
      result.on("data", (chunk) => {
        body += chunk;
      });

      result
        .on("end", () => {
          var response = JSON.parse(body);

          var index =
            response.data.children[Math.floor(Math.random() * 99) + 1].data;

          while (
            index.post_hint === "rich:video" ||
            index.post_hint === "link"
          ) {
            var index =
              response.data.children[Math.floor(Math.random() * 99) + 1].data;
          }

          // var image = index.preview.images[0].source.url.replace("&amp;", "&");

          var image = index.url_overridden_by_dest;
          var title = index.title;
          var link = "https://reddit.com" + index.permalink;
          var subRedditName = index.subreddit_name_prefixed;
          if (index.post_hint !== "image") {
            var text = index.selftext;

            const textembed = new Discord.MessageEmbed()
              .setTitle(subRedditName)
              .setColor(9384170)
              .setDescription(`[${title}](${link})\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`);

            interaction.editReply({ embeds: [textembed] });
          }

          if (index.post_hint !== "image") {
            const textembed = new Discord.MessageEmbed()
              .setTitle(subRedditName)
              .setColor(9384170)
              .setDescription(`[${title}](${link})\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`);

            interaction.editReply({ embeds: [textembed] });
          }

          const imageembed = new Discord.MessageEmbed()
            .setTitle(subRedditName)
            .setImage(image)
            .setColor(9384170)
            .setDescription(`[${title}](${link})`)
            .setURL(`https://reddit.com/${subRedditName}`);

          interaction.editReply({ embeds: [imageembed] });
        })
        .on("error", function (e) {
          interaction.editReply("Oops error, could you try again?");
        });
    });
  },
};
