const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["sr"],
  name: "setroles",
  category: "Utility",
  description: "Sets roles on entry.",
  cooldown: "3s",
  guildOnly: true,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  minArgs: 1,
  expectedArgs: "<type>",
  callback: async ({ client, interaction, message, args }) => {
    message.guild.members.cache;
    let member = message.member
    const type = args[0]
    let confirm = new Discord.MessageEmbed()
      .setTitle("Role(s) Added")
      .setColor("GREEN")
    if (!type) {
      message.reply("<:cancel:903756649636966440> Please state a role type value.")
      return;
    } else if (type == "announcements") {
      member.roles.add("904776470059175937")
      message.reply({ embeds: [confirm] })
    } else if (type == "developer") {
      member.roles.add("904776970133463050")
      message.reply({ embeds: [confirm] })
    } else if (type == "alert") {
      member.roles.add("904777076811399268")
      message.reply({ embeds: [confirm] })
    } else if (type == "appeals") {
      member.roles.add("873006630474768455")
      message.reply({ embeds: [confirm] })
    } else if (type == "security") {
      member.roles.add("904777294952931388")
      message.reply({ embeds: [confirm] })
    } else if (type == "all") {
      member.roles.add("904776470059175937")
      member.roles.add("904776970133463050")
      member.roles.add("904777076811399268")
      member.roles.add("873006630474768455")
      member.roles.add("904777294952931388")
      message.reply({ embeds: [confirm] })
    } else {
      message.reply("Oops, you need to provde a valid role. Check the pinned messages in the LSC bot commands channel!")
    }
  },
};

/* Chat:

Just use a array of role ID's
I'm gonna try it like this just to troubleshoot
Brb
*/