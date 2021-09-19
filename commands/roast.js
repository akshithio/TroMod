const { SlashCommandBuilder } = require("@discordjs/builders");
var https = require("https");

module.exports = {
  data: new SlashCommandBuilder().setName("roast").setDescription("Roasts you"),
  async execute(interaction) {


   


    urls = [
      "lol this is a filler",
      "https://evilinsult.com/generate_insult.php?lang=en&type=json",
      "https://insult.mattbas.org/api/insult.json",
    ];


    roasts = [
     "You know where you were born \n On the highway \n Cuz that's where most of the accidents happen", 
    ]


    url = urls[Math.round(Math.random() * 1) + 1];
    console.log(url);
    https.get(url, function (response) {
      response.on("data", function (data) {
        var roast = JSON.parse(data);
        console.log(roast);

        interaction.reply(roast.insult);

        // interaction.reply(roast);
        // console.log(roast);
      });
    });
  },
};
