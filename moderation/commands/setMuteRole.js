const moment = require('moment');
require('moment-timezone');
const { MessageEmbed } = require('discord.js');
const config = require('./../commandConfig')
const co = config.setMuteRole;
const Database = require("@replit/database")
const db = new Database()

module.exports = {
      name:co.name,
      aliases:co.aliases,
      cooldown:co.cooldown,
      description: co.description,
      ownerOnly:true,
      disabled:co.disabled,

	async execute(msg,args,client) {
    const message = msg;
    try{
    const role = message.guild.roles.cache.get(args[0])|| msg.mentions.roles.first();
    const txtChannels = message.guild.channels.cache.filter(c=>c.type !=="voice");
      txtChannels.forEach(c=>c.updateOverwrite(role.id,{SEND_MESSAGES:false}).then(()=>{}).catch(e=>cosole.log(e)))
    const voiceChannels = message.guild.channels.cache.filter(c=>c.type === "voice");
      voiceChannels.forEach(c=>c.updateOverwrite(role.id,{SPEAK:false}).then(()=>{}).catch(e=>cosole.log(e)))
    role.setPermissions(0).then(updated =>msg.channel.send(new MessageEmbed().setTitle("Muteロールの設定が完了しました。").setDescription(`${role}をつけられたユーザーは、全チャンネル(ボイスチャンネルも)で発言権限を失います。\n例外:①管理者権限を持っている。②${role}よりも高い位置にあるロールを所持している。`).addField("ロール配置の例","基本的にはBOTのロール→管理人→ミュート用→一般ユーザーの順番にしてください。").setImage("https://github.com/MakeYourOwnDiscordBot/assets/blob/main/IMAGES/role-position.png?raw=true")))
        .catch(console.error);
    await db.set(`muteRole_${msg.guild.id}`,role.id)
    }catch{
      msg.reply("ロールを指定してください")
    }
	}
};