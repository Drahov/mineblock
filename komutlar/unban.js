const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new RichEmbed().setDescription(`:flag_tr:  *Yetkin yoktur ama bunu kullanmaya çalışırsın bruh moment öyle bir andır ki.*`))
    let user = args[0];
    const banList = await message.guild.fetchBans();
    if (!user || isNaN(user) || !banList.has(user)) {
        return message.channel.send(new RichEmbed().setDescription(`:flag_tr:  *Belirtilen ID yanlış olabilir çünkü bulamıyorum veya yasaklı değil!*`))
    }
    message.guild.unban(user);
    message.channel.send(new RichEmbed().setDescription(`:flag_tr:  *Yasaklama kaldırıldı.*`))
};

exports.conf = {
    aliases: ["un-ban"]
};

exports.help = {
    name: 'unban'
};
