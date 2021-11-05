//to dconst Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
const mongoose = require("mongoose")
const profileSchema = require("../schemas/profileSchema")
const mongo = require('../mongo.js')
module.exports = {
  aliases: ["addserver"],
  name: "lsc-addserver",
  category: "Utility",
  description: "Adds a server to a user's LSC profile.",
  cooldown: "3s",
  guildOnly: false,
  slash: 'both',
  ownerOnly: false,
  testOnly: false,
  minArgs: "1",
  expectedArgs: "<server>",
  callback: async ({ client, interaction, message, args }) => {
    let userID = message.member.id;
    let server = args.slice(0).join(" ")
    function reply(txt) {
      if (message) {
        message.reply(txt)
      } else if (interaction) {
        interaction.reply(txt)
      }
    }
    await mongo().then(async mongoose => {
      try {
        await profileSchema.findOneAndUpdate({
          userID,
        }, {
            $push: {
              servers: server
          },
            upsert: true
          })
        reply(`Bio updated; do &profile to see the changes!`)
      } catch (error) {
        reply(`<:error:874824292926382191> it didnt work, error: ${error}`)
      } finally {
        mongoose.connection.close()
      }
    })
  }
}