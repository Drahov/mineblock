const Discord = require("discord.js");
const fs = require("fs");
const ayarlar = require("../ayarlar.json");
 
exports.run = async (client, message, args) => {
  const db = require("quick.db");
 
  let prefix = ayarlar.prefix;
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:flag_tr:   Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
 
  if (!args[0]) {
    return message.reply(":flag_tr:   Lütfen ayarlamak istediğiniz sayıyı yazınız");
  }
 
  if (args[0] === "kapat") {
    if (db.has(`sayac_${message.guild.id}`) === true) {
      db.delete(`sayac_${message.guild.id}`);
 
      if (db.has(`sKanal_${message.guild.id}`) === true) {
        db.delete(`sKanal_${message.guild.id}`);
        message.channel.send(":flag_tr:   Sayaç kanalı ve sayaç başarıyla kaldırıldı");
        return;
      }
 
      message.channel.send(":flag_tr:   Sayaç kaldırıldı.");
      return;
    }
    message.channel.send(":flag_tr:   Sayaç ayarlanmamış.");
    return;
  }
 
  if (isNaN(args[0])) {
    return message.reply(":flag_tr:   Sadece sayı!");
  }
 
  if (args[0] <= message.guild.memberCount) {
    const embed = new Discord.RichEmbed();
    return message.reply(":flag_tr:   Lütfen sunucu sayısından daha yüksek bir değer girin!" );
  }
 
  db.set(`sayac_${message.guild.id}`, args[0]);
 
  const embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor(`
Sayaç başarıyla ayarlandı: **${args[0]}**
Sayaç kapatmak isterseniz **${prefix}sayaç kapat** yazmanız yeterlidir.
Sayaç kanalı için +syçkanal #kanal
`);
  message.channel.send(embed);
};
 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sayacayarla", "sayac", "sayaç"],
  permLevel: 0
};
 
exports.help = {
  name: "sayaç-ayarla",
  description: "Sayacı ayarlar.",
  usage: "saya-çayarla "
};