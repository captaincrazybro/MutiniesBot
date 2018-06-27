const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let mute = require('../mutehistory.json');
let muteNumber = require('../mutehistory.json'); 

module.exports.run = async (bot, message, args) => {
	
	let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***You do not have permission to execute this command***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	}); 
	if(!mUser) return message.channel.send(":x:" + " ***I couldn't find this user.***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***I can't mute this person***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let muterole = message.guild.roles.find(`name`, "muted");
	let muteChannel = message.guild.channels.find(`name`, "logs");
	if(!muteChannel) return message.channel.send(":x:" + " ***I can't find this channel***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
	let mutetime = args[1];
	let mReason = args.slice(2).join(" ");
	
	if(mUser.roles.has(muterole.id)) return message.channel.send(":x:" + " ***This person is already muted***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
/*	if(args.length === 1){
 	if(!muterole){
		try{
			muterole = await message.guild.createRole({
				name: "muted",
				color: "#000000",
				permissions:[]
			})
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});	
		}catch(e){
			console.log(e.stack);
		}
	}
	//End of create role
	
	let muteEmbed = new Discord.RichEmbed()
		.setDescription("PermMute")
		.setColor("RED")
		.addField("Muted User", `${mUser} with ID: ${mUser.id}`)
		.addField("Muted By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Muted In", message.channel)
		.addField("Time", message.createdAt)
	
	await(mUser.addRole(muterole.id));
	message.channel.send(":white_check_mark: ***" + `${mUser}` + "*** ***has been muted***");
	message.delete().catch(O_o=>{});
	muteChannel.send(muteEmbed);
	 */
	if(!muterole){
		try{
			muterole = await message.guild.createRole({
				name: "muted",
				color: "#000000",
				permissions:[]
			})
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});	
		}catch(e){
			console.log(e.stack);
		}
	}
	//End of create role
	
	if(!mReason || !mutetime) return message.channel.send(":x:" + " ***Please specify a reason and/or a time***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
		let muteEmbed = new Discord.RichEmbed()
		.setDescription("TempMute")
		.setColor("ORANGE")
		.addField("Muted User", `${mUser} with ID: ${mUser.id}`)
		.addField("Muted By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Muted In", message.channel)
		.addField("Time", message.createdAt)
		.addField("How Long", mutetime)
		.addField("Reason", mReason); 	
	
	message.delete().catch(O_o=>{});
	await(mUser.addRole(muterole.id));
	message.channel.send(":white_check_mark: ***" + `${mUser}` + "*** ***has been muted***");
	mUser.send(`You have been muted in ${message.guild.name}`);
	
	setTimeout(function(){
		if(!mUser.roles.has(muterole.id)) return;
		mUser.removeRole(muterole.id);
		message.channel.send(":white_check_mark: ***" + `${mUser}` + "*** ***has been unmuted***").then(m => {
			message.delete().catch(O_o=>{});
			m.delete(5000);
		mUser.send(`You have been unmuted in ${message.guild.name}`);
		});
	}, ms(mutetime));
	message.delete().catch(O_o=>{});
	muteChannel.send(muteEmbed);
	
	if(!muteNumber[mUser.id]) muteNumber[mUser.id] = {
		muteNumber: ""
	};
	
	let muteInfo = mute[mUser.id].mute;
	if(mute[mUser.id].mute = "None"){
		mute[mUser.id].mute = `Muted ${mutetime} for ${mReason}`;
		return;
	}
	if(muteInfo === undefined){
		mute[mUser.id].mute = `Muted ${mutetime} for ${mReason}`;
		return;
	}else{
		mute[mUser.id].mute = `${muteInfo} \nMuted ${mutetime} for ${mReason}`;
	}
	
	fs.writeFile("./mutehistory.json", JSON.stringify(mute), (err) => {
		if (err) console.log(err);
	});
	
	//End of module
}

module.exports.help = {
	name: "mute"
}