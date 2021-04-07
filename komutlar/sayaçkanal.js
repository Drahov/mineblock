const Discord = require("discord.js");
const fs = require("fs");
var ayarlar = require('../ayarlar.json');
 
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`:flag_tr:   Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
 
  const db = require("quick.db");
 
  let channel = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args.slice(0).join(" "));
  let prefix = ayarlar.prefix;
 
  if (!channel) {
    return message.reply(":flag_tr:   Lütfen ayarlamak istediğiniz kanalı etiketleyin");
  }
 
  if (args[0] === "kapat") {
    if (db.has(`sKanal_${message.guild.id}`) === true) {
      db.delete(`sKanal_${message.guild.id}`);
 
      if (db.has(`sayac_${message.guild.id}`) === true) {
        db.delete(`sayac_${message.guild.id}`);
        message.channel.send(":flag_tr:   Sayaç kanalı ve sayaç başarıyla kaldırıldı");
        return;
      }
 
      message.channel.send(":flag_tr:   Sayaç kanalı kaldırıldı.");
      return;
    }
    message.channel.send(`:flag_tr:   Sayaç kanalı ayarlanmamış.`);
    return;
  }
 
  db.set(`sKanal_${message.guild.id}`, channel.id);
 
  const embed = new Discord.RichEmbed()
    .setDescription(`:flag_tr:   Sayaç kanalı başarıyla ayarlandı: ${channel}\nSayaç kanalını kapatmak isterseniz **${prefix}sayaçkanal kapat** yazmanız yeterlidir.`
    )
    .setColor("RANDOM")
    .setTimestamp()
  message.channel.send(embed);
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayaç-kanal-belirle", "sayaçkanal"],
  permLevel: 0
};
 
exports.help = {
  name: "syçkanal",
  description: "Sayaç kanalını ayarlar.",
  usage: "sayaç-kanal-ayarla <#kanal>"
};