const Discord = require('discord.js')
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
const { debug, error, warn, info } = require("../util/chalkhelper.js");
module.exports = {
  aliases: ['pu'],
  name: 'purge',
  category: 'Moderation',
  description: 'Purges up to 100 messages in a channel',
  cooldown: '5s',
  guildOnly: true,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  async callback({ client, message, args }) {

    if (!args[0]) return message.channel.send({ content: "<:cancel:903756649636966440>  Please enter the amount of messages you want to clear." }).then(message => (setTimeout(() => { message.delete() }, 5000)))
    if (isNaN(args[0])) return message.channel.send({ content: "<:cancel:903756649636966440>  Please type a number." }).then(message => (setTimeout(() => { message.delete() }, 5000)));

    if (args[0] > 100) return message.channel.send({ content: "<:cancel:903756649636966440> You cannot delete more than 100 messages." }).then(message => (setTimeout(() => { message.delete() }, 5000)));
    if (args[0] < 1) return message.channel.send({ content: "<:cancel:903756649636966440>  You must delete at least one message." }).then(message => (setTimeout(() => { message.delete() }, 5000)));

    const amoutWithoutCmd = args[0]
    const purgeAmount = parseInt(args[0])
    const user = message.author;

    let purgeEmbed = new Discord.MessageEmbed()
      .setDescription(`<:moderator:903756674786004992>  **Purge issued by:** ${user}\n<:purge:903756767148769330>  **Purge amount:** \`${amoutWithoutCmd}\``)
      .setFooter("This message will be deleted in 5 seconds.")
      .setColor(orange)

    message.delete(1)
    await message.channel.messages.fetch({ limit: purgeAmount }).then(messages => {
      message.channel.bulkDelete(messages).catch(err => {
        console.error(err);
        return message.channel.send({ content: `<:cancel:903756649636966440> There was an error trying to prune messages in this channel! *Error:* ${err}` }).then(message => (setTimeout(() => { message.delete() }, 5000)));
      });
      message.channel
        .send({ embeds: [purgeEmbed] })
        .then(message =>
          setTimeout(() => {
            message.delete();
          }, 5000));
    });
  }
}