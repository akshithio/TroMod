var https = require("https");

module.exports = {
  name: "joke",
  description: "tells you a joke",
  cooldown: 5,
  execute(message, args) {
    url = "https://official-joke-api.appspot.com/jokes/random";
    https.get(url, function (response) {
      response.on("data", function (data) {
        var joke = JSON.parse(data);
        message.channel.send(joke.setup + "\n" + joke.punchline);
      });
    });
  },
};
