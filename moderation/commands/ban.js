const moment = require('moment');
require('moment-timezone');
const { MessageEmbed } = require('discord.js');
const config = require('./../commandConfig')
const co = config.ban;
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  name: co.name,
  aliases: co.aliases,
  cooldown: co.cooldown,
  description: co.description,
  ownerOnly: true,
  disabled: co.disabled,

  async execute(msg, args, client) {
    if(!msg.mentions){
    try{
    if(!args[0]){
    await msg.channel.send(new MessageEmbed().setTitle("Error").setDescription(`ユーザーを指定してください`))
    }else if(args[0]) {
    msg.guild.members.ban(args[0],{reason:args[1]}).then(user=>{msg.channel.send(new MessageEmbed().setTitle("Ban Member").setDescription(`${user.tag || user.id || user}をbanしました。\n実行した人:${msg.author.tag}`))})
    }
    }catch{
      msg.reply("エラーが発生しました。")
    }
    }else{
      const member = msg.mentions.users.first();
      msg.guild.members.ban(member.id,{reason:args[1]}).then(user=>{msg.channel.send(new MessageEmbed().setTitle("Ban Member").setDescription(`${user.tag || user.id || user}をbanしました。\n実行した人:${msg.author.tag}`))})
    }
  }
};