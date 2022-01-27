const Discord = require("discord.js");
const { config } = require("process");




module.exports.run = async (client, message, args) => {
  if(!["929698111570473010"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL()({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    var tagli = message.guild.members.cache.filter(member => member.user.username.includes(("屮"))).size
       //var etiketli =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "1551").size;
  
 let knavesesli = 0;
    for (const [id, voiceChannel] of voiceChannels) knavesesli += voiceChannel.members.size;
      const emoji = client.emojis.cache.find(emoji => emoji.id === "929390685822529626")
  const knaveembed = new Discord.MessageEmbed()
  .setColor("RANDOM")
        .setDescription(`\`•\`Seste toplam **${knavesesli}** kullanıcı var. \n \`•\`Toplam **${tagli}** kişi tagımıza sahip.\n \`•\`Sunucumuzda toplam **${message.guild.memberCount}** üye var. \n \`•\`Sunucumuza **${message.guild.premiumSubscriptionCount}** takviye yapılmış. \n \`•\`Sunucumuzda toplam **${message.guild.members.cache.filter(m => m.presence.status !== "offline").size}** çevrimiçi üye var.\n \Developed By Cryx`)
    
  message.channel.send(knaveembed)
  message.react(emoji)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["say"],
  permLevel: 0
}
exports.help = {
  name: 'say',
}
