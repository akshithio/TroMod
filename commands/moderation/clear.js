module.exports = {
  name: "clear",
  description: "clear",
  aliases: ["delete"],
  permissions: "MANAGE_MESSAGES",
  execute(message, args) {
    const amount = parseInt(args[0]) + 1;

    console.log(amount);

    if (isNaN(amount)) {
      return message.reply(
        "Enter a number for the number of messages you want me to delete"
      );
    }

    message.channel.bulkDelete(amount, true).catch((err) => {
      console.log(err);
      message.channel.send(
        "there was an error trying to prune messages in this channel!"
      );
    });

    message.channel
      .send("`" + args[0] + "message(s)` were deleted")
      .then((msg) => {
        setTimeout(() => msg.delete(), 1000);
      });
  },
};
