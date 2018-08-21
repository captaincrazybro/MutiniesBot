const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();  
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
  
    jsfile.forEach((f, i) =>{
		let commandsCollection = new Discord.Collection();
		let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });
  
  
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setPresence({ status: 'online', game: { name: 'mutinies.net' } });
});

bot.on("message", async message => {
	
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	
	let prefix = botConfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	let tUser = message.guild.member(message.guild.members.get(args[0]));
	
    let commandfile = bot.commands.get(cmd);
    if(commandfile) commandfile.run(bot,message,args,cmd,fs);
	

});
		
		
	

bot.login(botConfig.token);
