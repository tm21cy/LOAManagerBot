const { debug, error, warn, info } = require('./util/chalkhelper.js')
console.log(debug('DEBUG: Initializing...'))
const { performance } = require('perf_hooks');
var startTime = performance.now()
const TOKEN = process.env['TOKEN']
const MONGO_URI = process.env['MONGO_URI']
const Discord = require('discord.js')
const { Intents } = require('discord.js')
const path = require('path')
const WOKCommands = require('wokcommands')
const uuid = require("uuid")
const { v4: uuidv4 } = require("uuid");
const errID = uuidv4()
const mongo = require('./mongo')
require('dotenv').config()

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ]
});

//anti-crash

let antiCrash = new Discord.MessageEmbed()
  .setTitle("ANTI-CRASH")
  .setColor("ff3b30")

const logtoChannel = false

process.on("unhandledRejection", (reason, p) => {
  let rr = reason.stack
  if(!rr.includes("report.js")) return;
  console.log(error("-----------------------------------------------"))
  console.log(error(`ANTI-CRASH | Unhandled Rejection/Catch | ${errID}`));
  console.log(error("-----------------------------------------------"))
  console.log(reason, p);
  antiCrash.setAuthor(`Unhandled Rejection/Catch | ${errID}`)
  antiCrash.setDescription(`\`\`\`js\n${reason} ${JSON.stringify(p)}\n\`\`\``)
});
process.on("uncaughtException", (err, origin) => {
  console.log(error("-----------------------------------------------"))
  console.log(error(`ANTI-CRASH | Uncaught Exception/Catch | ${errID}`));
  console.log(error("-----------------------------------------------"))
  console.log(err, origin);
  antiCrash.setAuthor(`Unhandled Exception/Catch | ${errID}`)
  antiCrash.setDescription(`\`\`\`js\n${err.stack} ${origin}\n\`\`\``)
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(error("-----------------------------------------------"))
  console.log(error(`ANTI-CRASH | Uncaught Exception/Catch (MONITOR) | ${errID}`));
  console.log(error("-----------------------------------------------"))
  console.log(err, origin);
  antiCrash.setAuthor(`Unhandled Exception/Catch (MONITOR) | ${errID}`)
  antiCrash.setDescription(`\`\`\`js\n${err.stack} ${origin}\n\`\`\``)
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(error("-----------------------------------------------"))
  console.log(error(`ANTI-CRASH | Multiple Resolves | ${errID}`))
  console.log(error("-----------------------------------------------"))
  console.log(type, promise, reason);
  antiCrash.setAuthor(`Multiple Resolves | ${errID}`)
  antiCrash.setDescription(`\`\`\`js\n${type} ${promise} ${reason}\n\`\`\``)
});

client.on('ready', async () => {
  console.log(info(`DEBUG: ✓ Ready, node ${process.version}`))
  client.user.setPresence({
    status: "dnd"
  })
  client.user.setActivity('your appeal | .gg/XSDqFFfUSf', { type: 'WATCHING' });
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    showWarns: true,
    delErrMsgCooldown: -1,
    testServers: ['903693464045223957'],
    botOwners: ['461862173044375572', '413462464022446084'],
    defaultLangauge: 'english',
    ignoreBots: false,
    dbOptions: {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    mongoUri: MONGO_URI,
    testServers: ['862406562194784306'],
    disabledDefaultCommands: [
      'language',
      'prefix',
      'requiredrole',
      'channelonly'
    ]
  })
    .setDefaultPrefix('&')
    .setColor(0xff0000)
  await mongo().then(mongoose => {
    try {
      console.log(info(`DEBUG: ✓ Connected to Mongo`))
    } catch (e) {
      console.log(error(`ERROR: permit 11: index.js: mongo: `))
      console.log(e)
    }
  })
var endTime = performance.now()
console.log(debug(`DEBUG: Booted up sucessfully in ${Math.round(endTime - startTime)} ms.`))
})

setTimeout(function() {
  if (client.ws.status !== 0) {
    console.log(warn(`WARN: Client is not in ready state 5 seconds after bootup.`))
  }
}, 5000);

setTimeout(function() {
  if (client.ws.status !== 0) {
    console.log(error(`ERROR: Client is not in ready state 10 seconds after bootup. Auto aborting bootup.`))
    process.exit()
  }
}, 10000);


client
  .on("debug", console.log)
  .on("warn", console.log)

client.login(TOKEN)