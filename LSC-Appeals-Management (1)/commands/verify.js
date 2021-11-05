const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
const { debug, error, warn, info } = require("../util/chalkhelper.js");
module.exports = {
  aliases: ["verifi"],
  name: "verify",
  category: "Utility",
  description: "Executute LSC verification functions.",
  cooldown: "3s",
  guildOnly: false,
  slash: 'both',
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {

    if(interaction) {
      
    }
    if(message && args[0] === "temporary") {
      let regex = /\d{17,20}/g;
      let userID;
      if (message.mentions.users.first()) {
        userID = message.mentions.users.first().id;
      } else if (args[1] && regex.test(args[1]) && message.guild.members.fetch(args[1])) {
        userID = args[1];
      } else {
        let InvalidID = new Discord.MessageEmbed()
          .setTitle("The input you have provided is invalid.")
          .setDescription(
            "<:cancel:903756649636966440>  Please provide a valid Discord User ID or mention a member that is in the server."
          )
          .setColor("#ff3b30");
        message.channel.send({ embeds: [InvalidID] });
        return;
      }
      let member = await message.guild.members.fetch(userID)
      member.roles.add("899295058405228544", `Temporary LSC membership granted by ${message.member.displayName}`)
      message.reply({ content: '<:check:903756666615517214> Done.' })
    }
  }
}