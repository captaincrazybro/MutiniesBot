const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require('../warnings.json');
let reason = require('../warnings.json');
let mute = require('../mutehistory.json');

module.exports.run = async (bot, message, args) => {
	
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***You do not have permissions to execute this command").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!wUser) return message.channel.send(":x:" + " ***I couldn't find this user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	}); 

	if(!warns[wUser.id]) warns[wUser.id] = {
		warns: 0, 
		reason: ""
	};
	
	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
		if (err) console.log(err);
	});
	
	if(!mute[wUser.id]) mute[wUser.id] = {
		mute: "None"
	};
	
	let warnlevel = warns[wUser.id].warns;
	let reasonlvl = reason[wUser.id].reason;
	let muteInfo = mute[wUser.id].mute;
	
	if(warnlevel, (err) => {
		if(warnlevel === 1) return message.channel.send({embed: {
			color: 15105570,
			description: `<@${wUser.id}> has 0 warnings`
		}});
	});
	let warnLVLEmbed = new Discord.RichEmbed()
		.setColor("#FFA500")
		.addField("Warnings", `<@${wUser.id}> has a ${warnlevel} warning level \n${reasonlvl}`)
		.addField("Mutes", `${muteInfo}`);
		
	message.channel.send(warnLVLEmbed);
	
};

module.exports.help = {
	name: "history"
}