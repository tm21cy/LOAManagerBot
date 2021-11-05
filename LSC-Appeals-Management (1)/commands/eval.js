const Discord = require('discord.js')
const { performance } = require('perf_hooks');
const ms = require('ms')
const { post } = require("node-superfetch");
const chalk = require('chalk')
const { blue, green, red, orange, yellow, purple, pink, gray } = require('../util/colors.js')
module.exports = {
  aliases: ['ev'],
  name: 'eval',
  category: 'Administration',
  description: 'Evaluates a JavaScript expression',
  cooldown: '3s',
  guildOnly: false,
  slash: false,
  ownerOnly: true,
  testOnly: false,
  callback: async ({ client, message, args }) => {
    const user = message.author;
    let embed1 = new Discord.MessageEmbed()
      .setTitle("Access Denied.")
      .setDescription("<:cancel:873760669399396402> This is a private command. Continuing to use this command will result in a blacklist from the bot.")
      .setColor("FC130F")

    const arguments = message.content.split(" ").slice(1);

    function clean(string) {
      if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
      } else {
        return string;
      }
    }


    const embed = new Discord.MessageEmbed()
      .setTitle("Eval")
      .setColor("5865F2")

    try {
      const code = args.join(" ");
      if (!code) return message.channel.send({ content: "Please include the code." });
      let evaled;

      // This method is to prevent someone that you trust, open the secret shit here.
      if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
        evaled = "No, shut up, what will you do it with the token?";
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth: 0 });

      let output = clean(evaled);
      if (output.length > 1024) {
        // If the output was more than 1024 characters, we're gonna export them into the hastebin.
        const { body } = await post("https://hastebin.com/documents").send(output);
        embed.setDescription(`https://hastebin.com/${body.key}.js`)
        // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
      } else {
        embed.setDescription(`\`\`\`js\n${output}\n\`\`\``)
      }

      message.channel.send({ embeds: [embed] });

    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        // Do the same like above if the error output was more than 1024 characters.
        const { body } = await post("https://hastebin.com/documents").send(err);
        embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
      } else {
        embed.addField("Output", "```js\n" + err + "```").setColor("RED");
      }

      message.channel.send({ embeds: [embed] });
    }
  }
}