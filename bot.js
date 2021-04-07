const Discord = require("discord.js");//Msl
const client = new Discord.Client();//Msl
const ayarlar = require("./ayarlar.json");//Msl
const chalk = require("chalk");//Msl
const moment = require("moment");//Msl
var Jimp = require("jimp");//Msl
const { Client, Util } = require("discord.js");//Msl
const weather = require("weather-js");//Msl
const fs = require("fs");//Msl
const db = require("quick.db");//Msl
const http = require("http");//Msl
const express = require("express");//Msle
require("./util/eventLoader.js")(client);//Msl
const path = require("path");//Msl
const request = require("request");//Msl
const snekfetch = require("snekfetch");//Msl
const queue = new Map();//Msl
const YouTube = require("simple-youtube-api");//Msl
const ytdl = require("ytdl-core");//Msl

const app = express();//Msl
app.get("/", (request, response) => {//Msl
  console.log(Date.now() + "  7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");//Msl
  response.sendStatus(200);//Msl
});//Msl
app.listen(process.env.PORT);//Msl
setInterval(() => {//Msl
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);//Msl
}, 280000);//Msl
//Msl
var prefix = ayarlar.prefix;//Msl

const log = message => {//Msl
  console.log(`${message}`);//Msl
};

client.commands = new Discord.Collection();//Msl
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });//Msl
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
    }//Msl
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
      reject(e);//Msl
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {//Msl
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
    }//Msl
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
// client.on('debug', e => {//Msl
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {//Msl
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
/////

//Spartanus Otorol

client.on("guildMemberAdd", async (member, message, params, guild) => {
        let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
  let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8")); 
  let embed = new Discord.RichEmbed()
    .setTitle('Yeni birisi katıldı!')
    .setDescription(`<@${member.user.id}> Discord sunucumuza katıldığın için teşekkürler kuralları uymayı unutma! <:s:819157750767812649> `)
    .setColor("BLACK")
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(embed);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)
  
});

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`#07e3ff`)
    .setImage(`https://images-ext-1.discordapp.net/external/gbzyZkKBSrbGMS6K56sDzvvQQ7DHNrRu9bi5Fx04Www/%3Fwidth%3D842%26height%3D474/https/media.discordapp.net/attachments/746836953537839134/818415248754343967/MB.png?width=831&height=468`)
    .addField(`**MineBlock - MSL** Bot altyapısı`)
  member.send(e);
});