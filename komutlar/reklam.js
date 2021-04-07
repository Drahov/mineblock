
const db = require('quick.db')
const Discord = require('discord.js')
 let ayarlar = ['aç','kapat']
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(':flag_tr:  *Reklam korumasını kullanmak için `aç` yada `kapat` yazmalısın.*')
  if(!ayarlar.includes(args[0])) return message.channel.send(`Geçerli parametreleri kullanmalısın.\nParametreler: ${ayarlar.join(' - ')}`)
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` *Yetkisine sahip değilsin.* :flag_tr: ')
 
  if (args[0] == 'aç') {
    if(db.has(`reklam_${message.guild.id}`)) return message.channel.send(`:flag_tr:  *Sistem zaten aktif bir şekilde neyini zorluyon mq?*`)
    db.set(`reklam_${message.guild.id}`, 'acik')
      message.channel.send(':flag_tr:  *Reklam koruma sistemi aktifleştirildi `Üyeleri Yasakla` yetkisine sahip olanların reklamı engellenmicektir.*')
  }
  if (args[0] == 'kapat') {
        if(!db.has(`reklam_${message.guild.id}`)) return message.channel.send(`:flag_tr:  *Sistem zaten deaktif bir şekilde neyini zorluyon mq?*`)
    db.delete(`reklam_${message.guild.id}`)
      message.channel.send(':flag_tr:  *Reklam koruma sistemi deaktifleştirildi artık herkes reklam yapabilir.*')
  }
 
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['advertisement','reklam'],
  permLevel: 0
};
 
exports.help = {
  name: 'reklam-engelle',
  description: '[Admin Komutu]',
  usage: 'reklam-engelle'
};
