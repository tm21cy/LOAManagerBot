const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["r"],
  name: "roles",
  category: "Utility",
  description: "Sets roles on entry.",
  cooldown: "3s",
  guildOnly: true,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  minArgs: 2,
  expectedArgs: "<target> <type>",
  callback: async ({ client, interaction, message, args }) => {
    let regex = /\d{17,20}/g;
    let userID;
    if (message.mentions.users.first()) {
      userID = message.mentions.users.first().id;
    } else if (args[0] && regex.test(args[0]) && client.users.fetch(args[0])) {
      userID = args[0]
    } else {
      let InvalidID = new Discord.MessageEmbed()
        .setTitle("The input you have provided is invalid.")
        .setDescription("<:cancel:885269683568275516> Please provide a valid Discord User ID or mention a member.")
        .setColor("#ff3b30");
      message.channel.send({ embeds: [InvalidID] });
      return;
    }
    let member = message.guild.members.cache.get(userID)
    const type = args[1]
    let confirm = new Discord.MessageEmbed()
      .setTitle("Role Added")
      .setColor("GREEN")
    if (!type) {
      message.reply("<:cancel:903756649636966440> Please state a role type value.")
      return;
    } else if (type == "def") {
      member.roles.add("904115252449378335")
      message.reply({ embeds: [confirm] })
    } else if (type == "rep") {
      member.roles.add("904115332397006938")
      message.reply({ embeds: [confirm] })
    } else if (type == "obs") {
      member.roles.add("904234423522820148")
      message.reply({ embeds: [confirm] })
    }
  },
};

/* Chat:

Just use a array of role ID's
I'm gonna try it like this just to troubleshoot
Brb
*/