module.exports = {
  name: "unlock",
  description: "locks all channels in the server",
  permissions: "ADMINISTRATOR",
  execute(message, args) {
    message.guild.channels.cache.forEach((ch) => {
      console.log(ch);
    });

    // message.channel.send("Server locked for lyf boi");
    message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
      SEND_MESSAGES: false,
    });
  },
};
