const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["an"],
  name: "announce",
  category: "Utility",
  description: "Announces via the bot.",
  cooldown: "3s",
  guildOnly: false,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {
    
  }
}
