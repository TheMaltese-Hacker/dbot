const Discord = require("discord.js");
const mcping = require('mc-ping-updated');
const chalk = require('chalk');
const escape = require('markdown-escape');
const fs = require('fs');
const express = require('express');
const app = express();
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
const port = 3000
const prefix = '-';
const color = (config.color);
const name = (config.name);
const sChannel = (config.suggestionChannel);
const SBon = (config.suggestionbot);

let ticketId = 0

app.get('/', (req, res) => res.send(`Hey, Im Online :). How are you?`))

app.listen(port, () =>
console.log(`Your app is listening at https://localhost:${port}`)
 );

const client = new Discord.Client();
const settings = require('./config.json');
var hasIcon = 'n/a';
pingFrequency = (settings.pingInterval * 1000);
embedColor = ("0x" + settings.embedColor);

 function getDate() {
     date = new Date();
     cleanDate = date.toLocaleTimeString();
 }

 function getServerStatus() {
     mcping(settings.ip, settings.port, function(err, res) {
         if (!(typeof err === 'undefined' || err === null)) {
             client.user.setStatus('dnd');
             serverStatus = 'Server offline';
             client.user.setActivity(serverStatus, { type: 'PLAYING' });
             getDate()
             console.log((chalk.yellow('\[' + cleanDate + '\]:') + chalk.white(' Ping: ' +
                 'Error getting server status')));
             console.error(err);
             return;
         }
         if (typeof res.players.sample === 'undefined') { client.user.setStatus('idle') }
         if (!(typeof res.players.sample === 'undefined')) { client.user.setStatus('online') }
         serverStatus = res.players.online + ' / ' + res.players.max;
         getDate()
         client.user.setActivity(serverStatus, { type: 'PLAYING' }).then(presence => console.log(
             chalk.cyan('\[' + cleanDate + '\]:') + chalk.white(' Ping: ' + serverStatus)
         )).catch(console.error);
     })
 }

//Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
//Events "handler"
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        console.log("Successfully loaded " + file);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunc.run(client, settings, ...args));
    });
});

//Startup:
client.on("ready", () => {
    console.log("Ready!");
    getServerStatus()
    client.setInterval(getServerStatus, pingFrequency);
});
client.login(settings.token);

client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split(" ")

    if (args[0] === "suggest") {
        suggest(message, args)
    }
    else if (args[0] === "help") {
        help(message, args)
    }
    else if (args[0] === "restart") {
        restart(message, args)
    }
    function restart(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
        message.channel.send("You do not have permission to restart the bot!")
        }
        else{
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setTitle(name)
            .setDescription("**Restarting...**")
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp(new Date())
        return message.channel.send(embed).then(
            setTimeout(() => {
                process.exit()
            }, 500)

        );
        }

    }
    function help(message, args) {

        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail(message.author.avatarURL)
            .setTitle(name)
            .addField(prefix + "suggest <suggestion> **->**", "Makes a suggestion")
            .addField(prefix + "restart **->**", "Restarts the bot")
            .setDescription("Provides the list of commands.")
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp(new Date())
        return message.channel.send(embed).then(
            sentEmbed => {
                sentEmbed.react("✅");

            }

        );
    }

        function suggest(message, args) {
            if (!args[1]) message.channel.send("You need a suggestion!")
            else if (SBon == false) return message.channel.send("We are not current taking suggestions at the moment.").then(
                console.log(message.author.tag + " Has attempted to make a suggestion!"))
           else if (!args) return message.channel.send("You need to suggest something!")

            else {

                let content = args.splice(1).join(" ")

                let embed = new Discord.RichEmbed()
                    .setColor(color)
                    .setThumbnail(message.author.avatarURL)
                    .setTitle(name)
                    .addField("**Suggestion**", content)
                    .setFooter("Made By " + message.author.tag, message.author.avatarURL)
                    .setTimestamp(new Date())
                let embedsent = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle("👍 **SUGGESTON MADE**")
                    .setDescription(message.author + (" Has made a suggestion! Use -suggest inputhere to make another suggestion :strawberry:"))
                    .setFooter(message.author.tag, message.author.avatarURL)
                    .setTimestamp(new Date())
                return client.channels.get(sChannel).send(embed).then(sentEmbed => {
                    sentEmbed.react("✅").then(
                        setTimeout(() => {
                            (message.delete({ timeout: 6000 })).then(sentEmbed.react("❌")).then(message.channel.send(embedsent)), (5000)
                        }), 10000)
                })

            }

        };
});


