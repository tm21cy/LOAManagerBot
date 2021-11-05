const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
const mongoose = require("mongoose")
const profileSchema = require("../schemas/profileSchema")
const mongo = require('../mongo.js')
module.exports = {
  aliases: ["lscr"],
  name: "lsc-register",
  category: "Utility",
  description: "Registers the user for an LSC profile.",
  cooldown: "3s",
  guildOnly: false,
  slash: 'both',
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {

    const server = []
    const userID = message.member.id
    const bio = null
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
          bio,
        }, {
            userID,
            bio,
            $push: {
              servers: server
            }
          }, {
            upsert: true
          })
        reply(`Done!`)
      } catch (error) {
        reply(`<:error:874824292926382191> it didnt work, error: ${error}`)
      } finally {
        mongoose.connection.close()
      }
    })
  }
}