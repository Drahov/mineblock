const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
  

    
  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply(' :flag_tr:  *Yetkin bulunmuyor!*')
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(` :flag_tr:   Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  //let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (message.mentions.users.size < 1) return message.reply(' :flag_tr:  *Yasaklamak istediğin üyeyi etiketlemelisin!*');
  if (reason.length < 1) return message.reply(' :flag_tr:  *Yasaklama sebebini yazmalısın!*');
  if (user.id === message.author.id) return message.reply(' :flag_tr:  *Kafam karıştı seni nasıl banlayabilirim?*');
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  if (!message.guild.member(user).bannable) return message.channel.send(` :flag_tr:  Bu kişiyi sunucudan yasaklayamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);

  
   if (!message.guild.member(user).bannable) return message.reply(' :flag_tr:  *Bunu yasaklamak için yetkim bulunmuyor.*');
  message.guild.ban(user, 2);
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`İşlem **başarılı** :flag_tr:  `)
  message.channel.send(embed2)
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban'],
  permLevel: 3,
    kategori: "moderasyon",
};

exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
 
};