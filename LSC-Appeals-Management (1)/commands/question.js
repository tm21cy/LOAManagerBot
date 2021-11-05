const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["q"],
  name: "question",
  category: "Utility",
  description: "Sends the bot a question.",
  cooldown: "3s",
  guildOnly: false,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {
    let question = args.slice(0).join(' ')

    message.reply({ content: "Thank you for sending in your question. Someone will be with you shortly to discuss!", ephemeral: true })
    client.guilds.cache.get('903693464045223957').channels.cache.get('904231118499352586').send(`New question from **${message.author.username}** \`${message.author.id}\`:\n > ${question}`);

  }
}
