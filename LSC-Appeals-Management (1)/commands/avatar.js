const Discord = require('discord.js')
module.exports = {
  aliases: ['icon', 'av', 'pfp', 'profilepic'],
  name: 'avatar',
  category: 'Utility',
  description: 'Gets yours or a mentioned users avatar.',
  cooldown: '3s',
  guildOnly: true,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  expectedArgs: '<@user(optional)>',
  callback: ({ client, message, args }) => {

    if (!message.mentions.users.size) {
      return message.channel.send(`Your Avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
    }

    const avatar_list = message.mentions.users.map(user => {
      return `${user.username}'s Avatar: ${user.displayAvatarURL({ dynamic: true })}`;
    }).join('\n');

    return `${avatar_list}`

  }
}