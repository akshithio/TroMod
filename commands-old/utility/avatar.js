module.exports = {
  name: "avatar",
  description: "avatar",
  execute(message, args) {
    return message.channel.send(
      `Your avatar: ${message.author.displayAvatarURL({
        format: "png",
        dynamic: true,
      })}`
    );
  },
};
