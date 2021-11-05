const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["vc"],
  name: "verify-confirm",
  category: "Utility",
  description: "Confirms report with additional parameters.",
  cooldown: "3s",
  guildOnly: false,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  minArgs: "2",
  expectedArgs: "<userID> <placement>",
  callback: async ({ client, interaction, message, args }) => {
    message.delete(1)
    if(message.member.id !== "413462464022446084"){
      message.channel.send("You do not have the appropriate permissions to use this command!")
      return;
    } else {
      let userID = args[0]
      let position = args[1]
      let msg = client.users.cache.get(userID);
      msg
        .send(`<@${userID}>, your case has been verified by the Chief Justice of Appeals. As of time of verification, you are number ${position} in line on the docket.\n\nPlease wait patiently and we will contact you when it is your time to start. Thank you!`)
        .catch((err) => {
          message.channel.send("The target user's DMs seem to be off, or there's been an error.")
        })
    }
  }
}
