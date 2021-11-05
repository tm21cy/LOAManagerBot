const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
const { debug, error, warn, info } = require("../util/chalkhelper.js");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  aliases: ["acc"],
  name: "access",
  category: "Utility",
  description: "Grants user access to the server.",
  cooldown: "3s",
  guildOnly: true,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  callback: async ({ client, interaction, message, args }) => {
    const appealsServerId = "903693464045223957";
    let usageServerId = message.guild.id;
    const botOwner = "413462464022446084";
    const messageAuthor = message.author.username;
    let caseID = args[0];
    let userType = args[1];

    if (usageServerId !== appealsServerId) {
      message.reply(
        "<:cancel:903756649636966440> This command can only be used in the Appeals server!"
      );
    } else if (!args) {
      message.reply(
        "<:cancel:903756649636966440> Please include your Case ID with your message."
      );
    } else if (caseID && !userType) {
      if (!uuid.validate(caseID)) {
        message.reply(
          "<:cancel:903756649636966440> You did not provide a valid case ID."
        );
        return;
      }
      message.reply(
        "<:check:903756666615517214> Your entrance has been processed and a DM has been sent to the Chief Justice to review your entrance."
      );
      const notif = client.users.cache.get(botOwner);
      notif.send(
        `<:important:903756750124097557> New case for review, please verify the following information prior to entry:\nUser: ${messageAuthor}\nCase ID: ${caseID}.\n\n**If any information is incorrect, deny entry.**`
      );
      console.log(debug(`INFO: New case has been processed.`));
      console.log(debug(`${caseID}`))
    } else if (caseID && userType) {
      message.reply(
        "<:check:903756666615517214>Your entrance as a representative has been processed and a DM has been sent to the Chief Justice to review your entrance."
      );
      const notif = client.users.cache.get(botOwner);
      notif.send(
        `<:important:903756750124097557> New representative for case, please verify the following information prior to entry:\nUser: ${messageAuthor}\nCase ID: ${caseID}\nUser is a **representative**.\n\n**If any information is incorrect, deny entry.**`
      );
      console.log(debug("INFO: New representative case has been processed."));
      console.log(debug(`${caseID}`))
    } else {
      message.reply(
        `<:error:903756758995042344> An unknown error has occured. Please send the error code to a member of Appeals Staff: \n ACCESSERROR | ID: ${caseID}`
      );
      console.log(error(`Error in acess.js | Error ID: ${caseID} `));
    }
  },
};
/*
what are you doing with the options
why are we making it a slash command though
oh
okay
options declare slash command options
it will be slash and command
for the fun of it
=
I'm gonna save us some time
Don't use Mongo
User will submit ID for manual review
great thanks
*/