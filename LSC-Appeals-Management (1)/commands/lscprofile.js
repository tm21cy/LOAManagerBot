const Discord = require("discord.js");
const {
  blue, green, red, orange, yellow, purple, pink, gray,
} = require("../util/colors.js");
const mongoose = require("mongoose");
const profileSchema = require("../schemas/profileSchema");
const mongo = require("../mongo.js");
module.exports = {
  aliases: ["me"],
  name: "profile",
  category: "Utility",
  description: "Searches for a user LSC profile.",
  cooldown: "3s",
  guildOnly: false,
  slash: "both",
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {
    function reply(txt) {
      if (message) {
        message.reply(txt);
      } else if (interaction) {
        interaction.reply(txt);
      }
    }
    await mongo().then(async (mongoose) => {
      try {
        let regex = /\d{17,20}/g;
        let userID;
        if (message.mentions.users.first()) {
          userID = message.mentions.users.first().id;
        } else if (
          args[0] &&
          regex.test(args[0]) &&
          message.guild.members.resolve(args[0])
        ) {
          userID = args[0];
        } else {
          let InvalidID = new Discord.MessageEmbed()
            .setTitle("The input you have provided is invalid.")
            .setDescription(
              "<:cancel:903756649636966440>  Please provide a valid Discord User ID or mention a member that is in the server."
            )
            .setColor("#ff3b30");
          message.channel.send({ embeds: [InvalidID] });
          return;
        }
        const profileLookup = await profileSchema.findOne({
          userID,
        });

        const bio = profileLookup.bio || "This member has not set a bio yet!";

        const servers = profileLookup.servers;
        let serversarr;
        servers.length > 0
          ? (serversarr = servers)
          : (serverarr = "Not working for any servers");

        let profile = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setTitle("Profile")
          .setDescription(`
          <:reason:903756658386284565> **Bio:** ${bio}
          <:guilds:903756809288974346> **Servers:** ${serversarr}
          `)
          .setColor("RANDOM");
        message.reply({ embeds: [profile] });
      } catch (error) {
        reply(`Error: ${error}`);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};