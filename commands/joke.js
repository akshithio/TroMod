const { SlashCommandBuilder } = require("@discordjs/builders");
var https = require("https");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tells you a joke"),
  async execute(interaction) {
    url =
      "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
    https.get(url, function (response) {
      response.on("data", function (data) {
        console.log(data);
        var joke = JSON.parse(data);
        console.log(joke);
        interaction.reply(joke.joke);
      });
    });
  },
};
