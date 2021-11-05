const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["p"],
  name: "ping",
  category: "Utility",
  description: "Sends the bots ping.",
  cooldown: "3s",
  guildOnly: false,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {

    const uptime = (new Date() / 1000 - client.uptime / 1000).toFixed();
    let pingEmbed = new Discord.MessageEmbed()
      .setTitle("Ping")
    if (client.ws.ping < 50) {
      pingEmbed.setDescription(`<:check:903756666615517214> The bot's ping is **stable**.\n<:status:903756700002185236> Ping: ${client.ws.ping}ms \n<:clock:903756708495654973>  Start time: <t:${uptime}:R>`)
      pingEmbed.setColor(green)
      message.channel.send({ embeds: [pingEmbed] })
    } else if (client.ws.ping > 50 && client.ws.ping < 100) {
      pingEmbed.setDescription(`<:warning:903756742293332018> The bot's ping is **potentially unstable**.\n<:status:903756700002185236> Ping: ${client.ws.ping}ms \n<:clock:903756708495654973>  Start time: <t:${uptime}:R>`)
      pingEmbed.setColor(orange)
      message.channel.send({ embeds: [pingEmbed] })
    } else {
      pingEmbed.setDescription(`<:error:903756758995042344> The bot's ping is **unstable**.\n<:status:903756700002185236> Ping: ${client.ws.ping}ms \n<:clock:903756708495654973>  Start time: <t:${uptime}:R>`)
      pingEmbed.setColor(red)
      message.channel.send({ embeds: [pingEmbed] })
    }
  }
}
