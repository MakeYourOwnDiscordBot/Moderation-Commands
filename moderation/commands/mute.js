const moment = require('moment');
require('moment-timezone');
const { MessageEmbed } = require('discord.js');
const config = require('./../commandConfig')
const co = config.mute;
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
    const roleid = await db.get(`muteRole_${msg.guild.id}`);
    if (!roleid) {
      return msg.channel.send(`ミュートロールが設定されていません\n${client.prefix}setMuteRole <role id or @role>`)
    }
    try{
    const role = msg.guild.roles.cache.get(roleid);
    const member = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first();
    const user = await client.users.fetch(member.id)
    member.roles.add(role)
    msg.channel.send(new MessageEmbed().setTitle(`${user.tag}をミュートしました。`).setDescription(`${user}は、全チャンネル(ボイスチャンネルも)で発言権限を失います。\n例外:①管理者権限を持っている。②${role}よりも高い位置にあるロールを所持している。`).addField("ロール配置", "確認して下さい").setImage("https://github.com/MakeYourOwnDiscordBot/assets/blob/main/IMAGES/role-position.png?raw=true"));
    }catch{
      msg.reply("ユーザーを指定してください")
    }
  }
};