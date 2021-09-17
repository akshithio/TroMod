const { SlashCommandBuilder } = require("@discordjs/builders");
const https = require("https");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("meme").setDescription("shows meme"),
  async execute(interaction) {
    interaction.deferReply();

    const url = "https://www.reddit.com/r/memes/top/.json?limit=150";
    https.get(url, (result) => {
      var body = "";
      result.on("data", (chunk) => {
        body += chunk;
      });

      console.log("hello");
      result
        .on("end", () => {
          var response = JSON.parse(body);
          var index =
            response.data.children[Math.floor(Math.random() * 149) + 1].data;
          console.log(index);
          if (index.post_hint !== "image") {
            var text = index.selftext;
            console.log(text);
            const textembed = new Discord.MessageEmbed()
              .setTitle(subRedditName)
              .setColor(9384170)
              .setDescription(`[${title}](${link})\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`);

            interaction.editReply({ embeds: [textembed] });
          }

          var image = index.preview.images[0].source.url.replace("&amp;", "&");
          var title = index.title;
          var link = "https://reddit.com" + index.permalink;
          var subRedditName = index.subreddit_name_prefixed;

          if (index.post_hint !== "image") {
            const textembed = new Discord.RichEmbed()
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
          console.log("Got an error: ", e);
        });
    });
  },
};
