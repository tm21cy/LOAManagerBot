const Discord = require('discord.js')
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
const { debug, error, warn, info } = require("../util/chalkhelper.js");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
let errID = uuidv4()
module.exports = {
  aliases: ["roc"],
  name: "role-create",
  category: "Utility",
  description: "Creates a role",
  cooldown: "3s",
  guildOnly: true,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  minArgs: 3,
  expectedArgs: '<member to role> <role color(hex)> <role name>',
  callback: async ({ client, message, args }) => {
    if (!message.member.roles.cache.some(role => role.id === "836858565264146432")) {
      let MissingRoleEmbed = new Discord.MessageEmbed()
        .setTitle("Access Denied.")
        .setDescription(`<:cancel:903756649636966440>  Only people with the \`Server Staff Team\` role can use this command.`)
        .setColor(red)
      message.channel.send({ embeds: [MissingRoleEmbed] })
      return;
    }
    const color = args[1]
    const name = args.slice(2).join(" ")

    message.guild.roles.create({
      name: name,
      permissions: 0n,
      position: 73,
      mentionable: true,
      color: color,
      reason: `Command executed by ${message.member.tag} (${message.member.id})`
    }).catch((err) => {
      console.log(error(`Error in role-create.js | Error ID: ${errID} `));
      console.log(err)
      message.reply(
        `<:error:903756758995042344> An ${err.name} error has occured. Please send the error code to net-tech-#0001: \n ROLEERROR | ID: ${errID}`
      );
      return;
    })
      .then(role => {
        message.mentions.members.forEach(member => {
          member.roles.add(role)
        })

        let success = new Discord.MessageEmbed()
          .setTitle("Role Created and Added")
          .setDescription(`<:user:903756682855850015> **Target member:** ${message.mentions.members.first()}
          <:moderator:903756674786004992> **Role name:** \`${role.name}\`
          <:loading:903756691995246643> **Role color:** \`${role.color}\``)
          .setColor(green)
          .setTimestamp()
        message.channel.send({ embeds: [success] })
      })
  }
}