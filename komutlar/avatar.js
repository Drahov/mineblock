const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let target = message.mentions.users.first() || message.author;
message.channel.send(new Discord.RichEmbed()
.setAuthor(target.tag, target.displayAvatarURL)
.setImage(target.displayAvatarURL));
                     
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['av'],
  permLevel: 0
};
 
exports.help = {
  name: 'avatar'
};