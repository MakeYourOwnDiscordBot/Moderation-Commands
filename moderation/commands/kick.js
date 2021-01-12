const moment = require('moment');
require('moment-timezone');
const { MessageEmbed } = require('discord.js');
const config = require('./../commandConfig')
const co = config.kick;
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
    try{
    const member = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first();
    const user = await client.users.fetch(member.id)
    if(!member.kickable){
      msg.reply("権限設定を見直してください。役職の位置が低いか、キック権限を持っていません。")
    }else{
    if(args[1]){
    await member.send(new MessageEmbed().setDescription(`あなたは${msg.guild.name}からキックされました。\n理由: ${args[1]}`))
    await member.kick(args[1])
    await msg.channel.send(new MessageEmbed().setTitle("Kick Member").setDescription(`${user.tag}をkickしました。\n実行した人:${msg.author.tag}`))
    }else {
    member.kick()
    await msg.channel.send(new MessageEmbed().setTitle("Kick Member").setDescription(`${user.tag}をkickしました。\n実行した人:${msg.author.tag}`))
    }
    }

    }catch{
      msg.reply("エラーが発生しました。")
    }
  }
};