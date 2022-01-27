const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
const macallan = require("./macallan");
require("./util/eventLoader")(client);



const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    console.log("Macallan V12 Kayıt Botu!")
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
//--------------------------------Oto Rol --------------------------------------\\

client.on("guildMemberAdd", async (member) => {
  member.roles.add(macallan.Unregister)
  member.setNickname(macallan.nick)
  
  });
  
//--------------------------------OTO MESAJ Macallan-------------------------------\\

//--------------------------------HOŞGELDİN MESAJ Macallan-------------------------------\\

client.on("guildMemberAdd", async (member) => {
  member.roles.add(macallan.Unregister)
})

client.on("guildMemberAdd", (member, message) => {
  if (member.guild.id !== (macallan.SunucuId)) return;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  let eskiisim = member.user.username;
  const id = macallan.HgChat;
  const channel = member.guild.channels.cache.get(id);
  let zaman = new Date().getTime() - user.createdAt.getTime()
  const hesapzaman = moment.duration(zaman).format(` YY [Yıl] DD [Gün] HH [Saat] mm [Dakika] ss [Saniye]`)

  channel.send(`
      ${macallan.HgEmoji1} **Sunucumuza Hoşgeldin** ${member.toString()} **Seninle Beraber** **${member.guild.memberCount}** **Kişiyiz** \n
${macallan.HgEmoji} **Kaydının Yapılması için Sesli Odaya Gelip Teyit Vermen Gerekli** \n
${macallan.HgEmoji} <@&${macallan.YetkiliRole}>  **Rolündeki Yetkililer Seninle İlgilenecektir** \n
${macallan.HgEmoji} **Hesap** **${hesapzaman}** **Önce Açılmış**`)
});

//--------------------------------TAG ROL KISMI ENDLESS-------------------------------\\


client.on("userUpdate", async (oldUser, newUser) => {
  let sunucu = macallan.SunucuId;
  let kanal = macallan.TagLog;
  let taglı = macallan.TagRolId;
  let tag = macallan.tag;
  let untag = macallan.Utag
  let channel = client.guilds.cache.get(sunucu).channels.cache.get(kanal);
  if (oldUser.username !== newUser.username) {
    if (
      newUser.username.includes(tag) &&
      !client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
    ) {
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.add(taglı);
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(untag, tag)
        );
      channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adına ekleyerek ailemize katıldı.`);
    }
    if (
      !newUser.username.includes(tag) &&
      client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.cache.has(taglı)
    ) {
      if (db.fetch(`taglıAlım.${sunucu}`)) {
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(taglı);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
        roles.set([macallan.TagRolId] || []);
      }
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .roles.remove(taglı);
      await client.guilds.cache
        .get(sunucu)
        .members.cache.get(newUser.id)
        .setNickname(
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .displayName.replace(tag, untag)
        );
      channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.`);
    }
  }
});
//----------------------------------SESE GİRME----------------------------------------
client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get(macallan.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});
//------------------------------------Şüpheli-------------------------------------------//


client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');  
   var x = moment(member.user.createdAt).add(14, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
  const kytsz = member.guild.roles.cache.get(macallan.Unregister) 
   var rol = member.guild.roles.cache.get(macallan.süpheli) // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
   var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
   member.roles.add(rol)
   member.roles.remove(kytsz)

member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
setTimeout(() => {

}, 1000)


   }
        else {

        }
    });
