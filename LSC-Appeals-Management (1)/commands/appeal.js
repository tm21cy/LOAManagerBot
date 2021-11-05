const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ["ap"],
  name: "appeal",
  category: "Utility",
  description: "Starts the appeal process.",
  cooldown: "3s",
  guildOnly: true,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {
    const apType = args[0];
    const authorName = message.author.username;
    const botOwner = "413462464022446084";
    const appealHost = message.author.id;
    const caseID = uuidv4();

    const appealMade = new Discord.MessageEmbed()
      .setTitle("<:warn:903756952323100742> New Case")
      .setDescription(
        `<:ID:903756784248954970> **Case ID:** \`${caseID}\`\n<:user:903756682855850015> **Case Creator:** ${message.author} \`${message.author.id}\``
      )
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setColor("#34c759");
    if (apType == "a") {
      message.delete(1)
      message.channel.send(
        "<:info:903756935537496114> Please check the newly created thread for additional information."
      );
      const appealThread = await message.channel.threads.create({
        name: `${authorName} Appeal'`,
        autoArchiveDuration: 1440,
        reason: `Appeal thread created by LSC Appeals Management for ${authorName}.`,
      });
      appealThread.members.add(botOwner, "Member is the chief justice.");
      appealThread.members.add(
        message.author,
        "Member is the one who started the appeal process."
      );
      await appealThread.send({ embeds: [appealMade] });
      const msg = client.users.cache.get(botOwner);
      msg.send(
        `Thread created by ${authorName}. <:ID:903756784248954970> **Appeal Case ID:** \`${caseID}\`.`
      );
      client.guilds.cache.get('903693464045223957').channels.cache.get('904461941634912286').send(`New Appeals Court Case Request from **${message.author.username}** \`${message.author.id}\`:\n Make sure to check it out in <#904462611955982356>!`);
      const msg2 = client.users.cache.get(appealHost);
      msg2
        .send(
          `You have successfuly started an appeal.\n\n<:ID:903756784248954970> **Appeal Case ID:** \`${caseID}\`.`
        )
        .catch((err) => {
          message.channel.send(
            "<:warning:903756742293332018> Logged but no DM sent, do you have your DMs off?"
          );
        });
    } else if (apType == "g") {
      message.delete(1)
      message.channel.send(
        "<:info:903756935537496114> Please check the newly created thread for additional information."
      );
      const appealThread = await message.channel.threads.create({
        name: `${authorName} General Request'`,
        autoArchiveDuration: 1440,
        reason: `General Court thread created by LSC Appeals Management for ${authorName}.`,
      });
      appealThread.members.add(botOwner, "Member is the chief justice.");
      appealThread.members.add(
        message.author,
        "Member is the one who started the General Court process."
      );
      await appealThread.send({ embeds: [appealMade] });
      const msg = client.users.cache.get(botOwner);
      msg.send(
        `Thread created by ${authorName}. <:ID:903756784248954970> **General Court Case ID:** \`${caseID}\`.`
      );
      client.guilds.cache.get('903693464045223957').channels.cache.get('904461941634912286').send(`New General Court Case Request from **${message.author.username}** \`${message.author.id}\`:\n Make sure to check it out in <#904462611955982356>!`);
      const msg2 = client.users.cache.get(appealHost);
      msg2
        .send(
          `You have successfuly started a General Court case.\n\n<:ID:903756784248954970> **General Court Case ID:** \`${caseID}\`.`
        )
        .catch((err) => {
          message.channel.send(
            "<:warning:903756742293332018> Logged but no DM sent, do you have your DMs off?"
          );
        });
    }
  },
};
/* Chat space:
If you make an embed then take out the message.channel.send lines or just replace all the info into an embed
Probably a better idea

Can you fix the catch for me
ok
*/