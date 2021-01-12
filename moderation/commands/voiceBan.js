const moment = require('moment');
require('moment-timezone');
const { MessageEmbed } = require('discord.js');
const config = require('./../commandConfig')
const co = config.voiceBan;
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
    const categoryChannels = msg.guild.channels.cache.filter(c=>c.type === "category");
      categoryChannels.forEach(c=>c.updateOverwrite(member.id,{CONNECT:false}).then(()=>{}).catch(e=>cosole.log(e)))
    const voiceChannels = msg.guild.channels.cache.filter(c=>c.type === "voice");
      voiceChannels.forEach(c=>c.updateOverwrite(member.id,{CONNECT:false}).then(()=>{}).catch(e=>cosole.log(e)))
    msg.channel.send(new MessageEmbed().setTitle(`${user.tag}をボイスチャンネルからBanしました`).setDescription(`${user}は、全ボイスチャンネルの接続権限を失います。\n例外:①管理者権限を持っている。②接続権限のあるロールを所持している。`));
    }catch{
      msg.reply("ユーザーを指定してください")
    }
  }
};