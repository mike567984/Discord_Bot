//installed the discord.js lib
const Discord = require('discord.js');
//crete a new object aka the bot
const clbot = new Discord.Client();
//token for logging into bot
const token = process.env.token;
//need the ! so the bot knows you'r talking to it
const botstart = "!";
//package.json for variables
const pkg = require('./package.json');
//when bot in ready say this msg
clbot.on('ready', () => {
  console.log("It's on boy")
})


//an array of compliments now for anyone who asked for it
let compliments = ["you'r so cool", "you'r so handsome", "End me", "you'r ok", "you'r so smart", "Eveything I said before was a lie"]
//var to keep track of size of compliments array
const size = compliments.length;
//Created this random function to give a diffrent Compliment each time for the Compliment FUnction
function randoNum(myMin) {
  return Math.floor(Math.random() * (size - myMin + 1)) + myMin;
}

function rnum(myMin) {
  return Math.floor(Math.random() * (500 - myMin + 1)) + myMin;
}

//If you type in "Compliment" in discord it will respond with a random compliment from array
clbot.on('message', msg => {
  // !compliment and not case sensative anymore
  if (msg.content.toLowerCase() == botstart + "compliment") {
    msg.reply(compliments[randoNum(0)]);
  }
})

//Created a switch statment for multiple commands
clbot.on('message', msg => {
  const user = msg.author;
  if (!user.bot) {
    //breaks message apart so i can have 2 or more in a command
    let dprefix = msg.content.toLowerCase().substring(botstart.length).split(" ");
    switch (dprefix[0]) {
      case 'commands':
      case 'command':
        msg.reply(' Every bot command needs a ! before it\n !Author = tells you about the cutest man alive \n !Compliment = Compliments U\n !profile=Shows your profile ');
        break;
        //Deletes a certain amount of messages given by user
      case 'delete':
        if (dprefix[1]) {
          msg.channel.bulkDelete(dprefix[1]);
          msg.channel.send("Deleted " + dprefix[1] + " Messages")
        } else {
          msg.reply('Specify the number of messages to delete')
        }
        break;
        //A fun get to know
      case 'author':
        msg.channel.send('I was created by' + " " + pkg.homepage);
        break;
        //Info about the person
      case 'profile':
        const profiles = new Discord.RichEmbed()
          .addField('Welcome to ', msg.guild.name)
          .addField('Profile name', user.username)
          .attachFile('welcome.jpg')
          .setThumbnail(user.avatarURL)
          .addField('Your Lucky number is ', rnum(0))
          .setColor('6AB92C')
          //.setAuthor(user.username, user.avatar_url)
        msg.channel.send(profiles);
        break;

    }
  }
})
//Joins message to those who joined
clbot.on('guildMemberAdd', member =>{
 member.guild.channels.get('Insert Channel ID').send("Welcome To the server");
})



//bot login token
clbot.login(token);
