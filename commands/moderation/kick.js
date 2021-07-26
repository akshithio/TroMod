module.exports = {
  name: "kick",
  description: "Kicks the selected user(s)",
  permissions: "KICK_MEMBERS",
  execute(message, args) {
    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member
          .kick(args[1])
          .then(() => {
            message.reply(`kicked ${user.tag}`);
          })
          .catch((err) => {
            message.reply("I was unable to kick the member");
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  },
};
