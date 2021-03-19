const Discord = require('discord.js');
const bot = new Discord.Client();
const util = require('minecraft-server-util');

const token = 'ODIyNTI0Nzk0NzI1MjAzOTc5.YFTh6A.YNGOdUPw8a6b5w2Zbd3ScUL196I';

const PREFIX = '/';

bot.on('ready', () =>{
    console.log('This Bot is Online!');
})

bot.on('message', message =>{
 
    let args = message.content.substring(PREFIX.length).split(' ')
 
    switch(args[0]){
        case 'mc':
 
            if(!args[1]) return message.channel.send('You must type a minecraft server ip')
            if(!args[2]) return message.channel.send('You must type a minecraft server port')
 
            util(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new RichEmbed()
                .setTitle('Server Status')
                .addField('Server IP', reponse.host)
                .addField('Server Version', reponse.version)
                .addField('Online Players', reponse.onlinePlayers)
                .addField('Max Players', reponse.maxPlayers)
                
                message.channel.send(Embed)
            })
        break
 
    }
 
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'haxix':
            message.reply('Warning Dont insult David');
        break;    
    }
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'Liba':
            message.reply('You will be banned if you say bad words');
        break;    
    }
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'rules':
            message.reply('Cmon Dont Be Stupid Just Read #rules Channel');
        break;    
    }
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'killall':
            message.channel.send('Everyone Fell Out Of The World');
        break;    
    }
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'lol':
            message.channel.send('BenBorg > BORG');
        break;    
    }
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'gtg':
            message.reply('Has To Go');
        break;    
    }
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'bye':
            message.reply('SHIT JUST GO');
        break;    
    }
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'marlene':
            message.reply('This is your mother....');
        break;    
    }
})




bot.login(token);