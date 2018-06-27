const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require('../warnings.json');
let reason = require('../warnings.json');

module.exports.run = async (bot, message, args) => {
	
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***You do not have permissions to execute this command***");
	let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!wUser) return message.channel.send(":x:" + " ***I couldn't find this user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	}); 
	if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***I can not warn this user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let wReason = args.join(" ").slice(22);
	if(!wReason) return message.channel.send(":x:" + " ***Please specify a reason***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
	message.delete().catch(O_o=>{});
	
	if(!warns[wUser.id]) warns[wUser.id] = {
		warns: 0
	};

	warns[wUser.id].warns++;
	let warnlevel = warns[wUser.id].warns;
	let reasonLvl = reason[wUser.id].reason;
	
	if(reasonLvl === ""){
		reason[wUser.id].reason = `Warning ${warnlevel} for ${wReason}`;
		return; 
	}else{
		reason[wUser.id].reason = `${reasonLvl} \nWarning ${warnlevel} for ${wReason}`;
	}
	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
		if (err) console.log(err);
	});
	
	let warnEmbed = new Discord.RichEmbed()
		.setDescription("Warn")
		.setColor(`#ffff00`)
		.addField("Warned User", `${wUser} with ID: ${wUser.id}`)
		.addField("Warned By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Warned In", message.channel)
		.addField("Time", message.createdAt)
		.addField("Warnings", warns[wUser.id].warns)
		.addField("Reason", wReason); 		
	
	let warnChannel = message.guild.channels.find(`name`, "logs");
	if(!warnChannel) return message.channel.send(":x:" + " ***I couldn't find that channel***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});

	warnChannel.send(warnEmbed)
	message.channel.send(":white_check_mark: ***" + `${wUser}` + "*** ***has been warned***");
	message.delete().catch(O_o=>{});
	wUser.send(`You have been warned in ${message.guild.name} for ${wReason}`);

	if(warns[wuser.id].warns == 2){

	}
	if(warns[wUser.id].warns === 2){

	}
}

module.exports.help = {
	name: "warn"
}
