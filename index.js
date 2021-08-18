const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const auth = require('./auth');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function sleep(ms) { //make wait function
    return new Promise(resolve => setTimeout(resolve, ms));
}

let sendChannel;
async function deleteMessage(chan, response, wait) {
    let delme = await chan.send(response);
    await sleep(wait);
    delme.delete({});
}

client.on('message', msg => {
    if (msg.author.bot || !msg.guild) return;
    client.user.setPresence({ activity: { name: 'with the fabric of reality' } });
    try {
        if (msg.content.substring(0, 3) === '^8b') {
            let roll = Math.floor(Math.random() * 8);
            if (msg.content.substring(3, 4) != ' ' || msg.content.length <= 4) { msg.reply("... ask me something, fool."); }
            else if (roll == 0) { msg.reply("🎱 ... mayhaps.."); }
            else if (roll == 1) { msg.reply("🎱 ... It is certian."); }
            else if (roll == 2) { msg.reply("🎱 ... Don't count on it."); }
            else if (roll == 3) { msg.reply("🎱 ... Only if you make it true."); }
            else if (roll == 4) { msg.reply("🎱 ... I can't be sure, but my guess is no."); }
            else if (roll == 5) { msg.reply("🎱 ... oh dear... are you sure you want to the answer to that?"); }
            else if (roll == 6) { msg.reply("🎱 ... no."); }
            else if (roll == 7) { msg.reply("🎱 ... you waste my time. (try again)"); }
        } //8ball


        if (msg.content.substring(0, 5).toLowerCase() == "i am " && msg.content.length < 35) {
            msg.channel.send("Hi " + msg.content.substring(5) + ", I'm dead inside!");
            console.log("Dad joked " + msg.author.tag + " with " + msg.content.substring(5));
        }
        if (msg.content.substring(0, 11) == "^impossible") {
            msg.channel.send("​​​​");
        }

        if (msg.content.includes('<@!' + client.user.id + '>')) {
            const pingAnger = new Discord.MessageAttachment('images/pingAnger.png');
            msg.channel.send(`<@${msg.author.id}> I've been up since ${client.readyAt}`, pingAnger);
        } //angrily responds to pings

        if (msg.content.toLowerCase() === 'machinator') {
            msg.channel.send(`howdy!`);
        } //says hi

        /*if (msg.content.length >= 30) {
            try {
                let capitals = 0;
                for (let x = 0; x < msg.content.length; x++) {
                    if (msg.content[x] != msg.content[x].toLowerCase()) { capitals++; }
                }
                const keyboardRole = msg.guild.roles.cache.find(r => r.name === "Keyboard Warrior ⌨️");
                if (capitals >= msg.content.length * .75 && !msg.member.roles.cache.has(keyboardRole.id)) {
                    msg.member.roles.add(keyboardRole).catch(error => msg.reply(`Error: ${error}`));
                    msg.reply('you have successfully screamed yourself into a new role.  Welcome, keyboard warrior! ⌨️⌨️⌨️');
                }
            } catch (error) { console.log("couldn't find keyboard warrior role") }

        } //keyboard warrior detection */
    } catch (error) { msg.channel.send("an error occured, make sure I have the appropriate permissions to do whatever you are asking me to do do."); console.log(error);}
});

login.auth(client);
