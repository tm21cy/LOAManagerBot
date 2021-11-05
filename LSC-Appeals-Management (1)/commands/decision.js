const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["dec"],
  name: "decision",
  category: "Utility",
  description: "Make a appeal decision",
  guildOnly: true,
  slash: false,
  ownerOnly: true,
  testOnly: false,
  minArgs: 4,
  expectedArgs: "<id> <decision> <condition>",
  callback: async ({ client, interaction, message, args }) => {
    // args[0] is the User ID
    let uid = args[0]; // uid
    let caseid = args[1]; // case id
    let decision = args[2]; // decision
    let cond = args[3]; // conditional boolean (t/f)
    let comments = args.slice(4).join(" ") || "N/A"// comments

    //embeds:
    const apprembed = new Discord.MessageEmbed()
      .setTitle("Appeal Granted")
      .setFooter(`Case ID: ${caseid}.`)
      .setColor(green)
    const denembed = new Discord.MessageEmbed()
      .setTitle("Appeal Denied")
      .setFooter(`Case ID: ${caseid}.`)
      .setColor(red)
    //check args:
    message.delete(1)
    if (decision == "app" && cond == "f") {
      apprembed.setDescription(
        `The appeal involving <@${uid}>, user ID ${uid}, has been declared **approved** by the Chief Justice of Appeals on behalf of the Appeals Council. All blacklists or previous actions are to be revoked.\n\nCouncil Comments: ${comments}\n\nFor any inquiries or assistance beyond this case, feel free to contact a member of Appeals Council. Thank you.\n\n *On behalf of the Chief Justice of Appeals.*`
      )
      message.channel.send({ embeds: [apprembed] })
    } else if (decision == "app" && cond == "t") {
      apprembed.setDescription(
        `The appeal involving <@${uid}>, user ID ${uid}, has been declared **approved with conditions** by the Chief Justice of Appeals on behalf of the Appeals Council. Conditions can be found under Council Comments. All blacklists or previous actions are to be revoked.\n\nCouncil Comments: ${comments}\n\nFor any inquiries or assistance beyond this case, feel free to contact a member of Appeals Council. Thank you.\n\n *On behalf of the Chief Justice of Appeals.*`
      )
      message.channel.send({ embeds: [apprembed] })
    } else if (decision == "den" && cond == "f") {
      denembed.setDescription(
        `The appeal involving <@${uid}>, user ID ${uid}, has been declared **denied** by the Chief Justice of Appeals on behalf of the Appeals Council. All blacklists or previous actions will stand at this time.\n\nCouncil Comments: ${comments}\n\nFor any inquiries or assistance beyond this case, feel free to contact a member of Appeals Council. Thank you.\n\n *On behalf of the Chief Justice of Appeals.*`
      )
      message.channel.send({ embeds: [denembed] })
    } else if (decision == "den" && cond == "t") {
      denembed.setDescription(
        `The appeal involving <@${uid}>, user ID ${uid}, has been declared **denied with conditions** by the Chief Justice of Appeals on behalf of the Appeals Council. Conditions can be found under Council Comments. All blacklists or previous actions will stand at this time.\n\nCouncil Comments: ${comments}\n\nFor any inquiries or assistance beyond this case, feel free to contact a member of Appeals Council. Thank you.\n\n *On behalf of the Chief Justice of Appeals.*`
      )
      message.channel.send({ embeds: [denembed] })
    } else {
      message.channel.send("An error occurred.")
    }
  },
};