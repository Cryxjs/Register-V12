const Discord = require('discord.js'); 
const db = require("quick.db");
const { tag, ErkekRole } = require('../macallan');
const macallan = require('../macallan');
exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has(macallan.YetkiliRole) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!').setColor("ff0000"));
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcıyı etiketlemen gerekiyor!`).setFooter('Macallan was here!').setColor("ff0000")).then(m => m.delete({timeout: 8000}));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let isim = args[1];
      if(!isim) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kayıt edebilmek için isim belirtmen gerekli!`).setFooter('Macallan was here!').setColor("ff0000")).then(m => m.delete({timeout: 5000}));
   let yas = args[2];
      if(!yas) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kayıt edebilmek için yaş belirtmen gerekli!`).setFooter('Macallan was here!').setColor("ff0000")).then(m => m.delete({timeout: 5000}));
await member.setNickname(`${tag} ${isim} | ${yas}`)
  member.roles.add(macallan.ErkekRole); // Erkek rol ID'si
  member.roles.remove(macallan.Unregister); //(Unregister) Rolünün ID'si
     const endlesskanal = message.guild.channels.cache.find(c => c.id == macallan.ChatId) //Chat kanalının ID'si
    const embed1 = new Discord.MessageEmbed() 
    .setDescription(`<@!${member.id}> **Aramıza katıldı sıcak bir hoşgeldin diyelim!** \`${member.guild.memberCount}\` **Üyeye Ulaştık**`)
    .setColor("RANDOM")
  let embed = new Discord.MessageEmbed() 
  .setColor("66FF00")                                                           
  .setTimestamp()
  .setDescription(`<@!${member.id}> <@&${macallan.ErkekRole}> • <@&${macallan.ErkekRole1}> olarak kayıt edildi!`) 
  .setFooter(`Macallan was here!`)
  .setFooter(`Komutu Kullanan Yetkili : ${message.author.username}`)
  return message.channel.send(embed).then(endlesskanal.send(embed1)).then// 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek" , "e"],
  permLevel: 0
}
exports.help = {
  name: 'e @Macallan İsim Yaş',

}
