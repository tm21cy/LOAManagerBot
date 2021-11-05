const Discord = require('discord.js')
module.exports = (client, message, args) => {
  client.on('messageCreate', async (message, args) => {

    const reportchannels = ['834327178014490644', '833602523088027668', '833602512618913802', '833602595046162482', '838040070254493746', '833602544751476737', '862258338578563084', '833602675856637992', '903741996278120508']
    const pings = ['835405656869306368', '835406129176903720', '835406918805487638', '835406744268046356', '838040145835720734', '835407101575954452', '835407047596048404', '835406915407708210', '904223887972241448']

    function checkForPing() {
      for (const ping of pings)
        if (message.content.includes(ping)) return true;
      return false;
    }

    if (message.guild.id === "833599402802413598" && reportchannels.includes(message.channel.id) && checkForPing()) {
      const thread = await message.channel.threads.create({
        name: 'Report Discussion',
        autoArchiveDuration: 60,
        reason: 'Auto-thread creation after detecting a report.',
      });
    thread.send("If needed, discuss the above report in this thread.")
    thread.send(`Link to report: ${message.url}`)
    thread.members.add(message.author)
    }
  })
}

module.exports.config = {
  // The display name that server owners will see.
  // This can be changed at any time.
  displayName: 'on message',

  // The name the database will use to set if it is enabled or not.
  // This should NEVER be changed once set, and users cannot see it.
  dbName: 'ON-MSG',

  // Being true means a database connection must be present before the
  // feature is enabled.
  loadDBFirst: false
}