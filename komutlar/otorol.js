const fs = require ('fs')
const Discord = require('discord.js')
var sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));


exports.run = async (bot, message, args) =>
{
      let profil = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  if (!mentionedChannel && args[0] !== "sıfırla") return message.channel.send("Otorol Sistemini Eğer Çalıştıramıyorsanız Rollerden Bu Rolü Herkesden Bahsete Tıklayıp Yazarsanız Hata Almazsınız. \nÖrnek Kullanım Şekli: **!otorol @Üye #otorol** :flag_tr: ");
  if (message.guild.member(message.author.id).hasPermission(0x8))
    
    {
      var mentionedRole = message.mentions.roles.first();
      if (!mentionedRole) return message.channel.send("**Doğru Kullanım = .otorol @<roladı> #<metinkanalı> <:milenkatana:815605207421157386> **".then(msg => msg.delete(5000)));
      

    if(!profil[message.guild.id]){
    
        profil[message.guild.id] = {
      
            sayi: mentionedRole.id,
      kanal: mentionedChannel.id
        };
    }
    
    profil[message.guild.id].sayi = mentionedRole.id
  profil[message.guild.id].kanal = mentionedChannel.id
    
    fs.writeFile("./otorol.json", JSON.stringify(profil), (err) => {
        console.log(err)

    })

    const embed = new Discord.RichEmbed()
        .setDescription(`Otorol Başarılıyla ${args[0]} Olarak Ayarlanmıştır. \nOtorol Mesaj Kanalı Başarılıyla ${mentionedChannel} Olarak Ayarlanmıştır. :flag_tr: `)
        .setColor("RANDOM")
        .setTimestamp()
    message.channel.send({embed})
}

}



exports.conf =
{
  enabled: true,
  guildOnly: true,
  aliases: ["setautorole", "otorol", "otoroldeğiştir"]
}

exports.help =
{
  name: 'otorol-ayarla',
  description: 'Sunucuya Girenlere Verilecek Olan Otorolü Ayarlar.',
  usage: 'otorolayarla'
}