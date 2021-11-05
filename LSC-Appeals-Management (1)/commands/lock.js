const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["lc"],
  name: "lock",
  category: "Utility",
  description: "Lock channel(s)",
  cooldown: "3s",
  guildOnly: false,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, message, args }) => {

    const auditReason = `Channel locked by ${message.author.username}`;
    const target = [...message.mentions.channels]
    if (target.length > 0) {
      message.mentions.channels.forEach((channel) => {
        channel.permissionOverwrites.edit(message.guild.roles.everyone, {
          SEND_MESSAGES: false,
        }, auditReason);
      });
      let channels = message.mentions.channels
        .map((e) => `<:chevron:903756918915481640> <#${e.id}>`)
        .join("\n");
      const reason =
        args.slice(message.mentions.channels.size).join(" ") ||
        "[No reason provided by moderator.]";
      let locked = new Discord.MessageEmbed()
        .setTitle("Channels Locked Sucessfully")
        .setDescription(
          `<:moderator:903756674786004992> **Moderator:** ${message.author}
        <:reason:903756658386284565>  **Reason:** \`${reason}\``
        )
        .addField(
          `<:txtchannel:903756969024835624>  **Target Channels:**`,
          `${channels}`
        )
        .setColor("#ff3b30");
      message.channel.send({ embeds: [locked] });
    } else {
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      }, auditReason);
      let reason =
        args.slice(0).join(" ") || "[No reason provided by moderator.]";
      let locked = new Discord.MessageEmbed()
        .setTitle("Channel Locked Sucessfully")
        .setDescription(
          `<:moderator:903756674786004992> **Moderator:** ${message.author}
        <:reason:903756658386284565>  **Reason:** \`${reason}\``
        )
        .setColor("#ff3b30");
      message.channel.send({ embeds: [locked] });
    }
  },
};