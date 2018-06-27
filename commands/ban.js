const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
	let bUser = message.guild.member(message.mentions.users.first() || args[0]);
	if(!bUser) return message.channel.send(":x:" + " ***I can't fine that user***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(":x:" + " You do not have permission to execute this command").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x:" + " ***This user can not be banned!***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	let banChannel = message.guild.channels.find(`name`, "logs");
	if(!banChannel) return message.channel.send(":x:" + " ***I can't find this channel***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
	
 	if(args.length === 1){
	
	let banEmbed = new Discord.RichEmbed()
		.setDescription("PermBan")
		.setColor("RED")
		.addField("Banned User", `${bUser} with ID: ${bUser.id}`)
		.addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Banned In", message.channel)
		.addField("Time", message.createdAt)
	
	message.guild.member(bUser).ban(bReason);
	banChannel.send(banEmbed);
	message.delete().catch(O_o=>{});
	message.channel.send(":white_check_mark: ***" + `${User}` + "*** ***has been banned***");
	
	}else{ 
		
	let bantime = args[1];
	let bReason = args.slice(2).join(" ");	
		
	if(!bReason || !bantime) return message.channel.send(":x:" + " ***Please specify a reason and/or a time***").then(m => {
		message.delete().catch(O_o=>{});
		m.delete(5000);
	});
		
	let banTEmbed = new Discord.RichEmbed()
		.setDescription("TempBan")
		.setColor("RED")
		.addField("Banned User", `${bUser} with ID: ${bUser.id}`)
		.addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Banned In", message.channel)
		.addField("Time", message.createdAt)
		.addField("How Long", bantime)
		.addField("Reason", bReason); 	
			
	message.guild.member(bUser).ban(bReason);
	message.channel.send(":white_check_mark: ***" + `${bUser}` + "*** ***has been banned***").then(m => {
		message.delete().catch(O_o=>{});
	});
	bUser.send(`You have been banned from ${message.guild.name}`);
			
	setTimeout(function(){
		message.guild.unban(bUser); 
		banChannel.send(":white_check_mark: ***" + `${bUser}` + "*** ***has been unbanned***");
		bUser.send("You have been unbanned from ${message.guild.name}. Here is the link to join it again: https://discord.gg/wtDRfsb");
	}, ms(bantime));
	message.delete().catch(O_o=>{});
	banChannel.send(banTEmbed);
	}
}

module.exports.help = {
	name: "ban"
}