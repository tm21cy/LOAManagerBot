const Discord = require("discord.js");
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
const { debug, error, warn, info } = require("../util/chalkhelper.js");
module.exports = {
  aliases: ["who", "who?", "userinfo", "user-info", "lookup"],
  name: "whois",
  category: "Utility",
  description: "Gets info about a Discord User",
  cooldown: "3s",
  guildOnly: false,
  slash: false,
  ownerOnly: false,
  testOnly: false,
  expectedArgs: "<user-id> [-mobile]",
  callback: async ({ client, message, args }) => {
    const input = args[0] || message.member.id;

    let done = new Discord.MessageEmbed().setColor("BLURPLE");

    args.splice;
    let options = args[1];

    client.users
      .fetch(input)
      .then((user) => {
        if (options && "-mobile") {
          message.reply({
            content: `
        ID ${user.id}\nUsername ${user.username}\nDiscriminator ${
              user.discriminator
              }\nBot? ${user.bot}\nCreation Date: <t:${Math.round(
                user.createdTimestamp / 1000
              )}:F> (<t:${Math.round(
                user.createdTimestamp / 1000
              )}:R>)\nDiscord System Component? ${user.system}`,
          });
          return;
        }

        done.setTitle(
          `Global Whois Result for ${user.username}#${user.discriminator}`
        );
        done.setThumbnail(user.avatarURL({ dynamic: true }));
        done.setDescription(`
        **ID:** \`${user.id}\`
        **Username:** \`${user.username}\`
        **Discriminator:** \`${user.discriminator}\`
        **Bot?** \`${user.bot}\`
        **Creation Date:** <t:${Math.round(
          user.createdTimestamp / 1000
        )}:F> (<t:${Math.round(user.createdTimestamp / 1000)}:R>)
        **Discord System Component?** \`${user.system}\``);
        if (user.banner) {
          done.setFooter("Banner");
          done.setImage(user.bannerURL({ dynamic: true }));
        }
        message.reply({ embeds: [done] });
      }).catch((err) => {
        message.reply({
          content: `Unexpected Error\n\`\`\`js\n${err}\n\`\`\``,
        });
        console.log(error(`ERROR: whois.js:`));
        console.log(err);
      });
  },
};
