const chalk = require('chalk')
const moment = require('moment')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

var prefix= ayarlar.prefix;

module.exports = client => {
  console.log(`MSL - MineBlock`);
  console.log(`Bot aktifleştirildi.`);
  console.log(`Komutlar yüklendi.`);
  client.user.setStatus("idle");
  //idle = boşta
  //dnd = rahatsız etmeyin
    var watching = "#MSL #MİNEBLOCK"
    
    
        client.user.setActivity("#MSL #MİNEBLOCK");
   
  
};