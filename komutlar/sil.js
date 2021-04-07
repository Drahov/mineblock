const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!").then(m => m.delete(8000))
if(!args[0]) return message.channel.send("Lütfen Silinicek Mesaj Miktarını Yazın.!").then(m => m.delete(8000))
message.channel.bulkDelete(args[0]).then(() => {
  const embed = new Discord.RichEmbed()
       .setDescription(`*Bu kanal temizlendi lütfen kirletmemeye özen gösterin.*`)
        .setImage(`https://media.discordapp.net/attachments/746836953537839134/818415248754343967/MB.png?width=842&height=474`)
        .setFooter(`${message.author.username} Tarafından istendi.`)
        .setColor("BLACK")
        .setTimestamp()
message.channel.send({ embed }).then(m => m.delete(8000))
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['patlat','sil'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  time: '10 saniye',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'patlat '
};