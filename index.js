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
  //Sets bot to do something
  clbot.user.setActivity('Just Vibing')
})


//an array of compliments now for anyone who asked for it
let compliments = ["you'r so cool", "you'r so handsome", "End me", "you'r ok", "you'r so smart", "Eveything I said before was a lie"]
//var to keep track of size of compliments array
const size = compliments.length;
//Created this random function to give a diffrent Compliment each time for the Compliment FUnction
function randoNum(myMin) {
  return Math.floor(Math.random() * (size - myMin + 1)) + myMin;
}
//lucky Number generator
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
    //breaks message apart so i can have 2 or more args in a command
    let dprefix = msg.content.toLowerCase().substring(botstart.length).split(" ");
    //Checks to see if msg has ! in front of it
    switch (dprefix[0]) {
        case 'commands':
        case 'command':
        case 'help':
        //Pm's person about all commands avalible
        const helper_Pm = new Discord.RichEmbed()
          .setTitle("All avalible commands")
          .setColor(0xF000FF)
          .setDescription(' Every bot command needs a ! before it\n !Author = tells you about the cutest man alive \n !Compliment = Compliments U\n !profile=Shows your profile ');
        msg.author.send(helper_Pm);
        break;
        //Deletes a certain amount of messages given by user
      case 'delete':
      let Admrole = msg.guild.roles.find(role => role.name === 'Admin');
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
//Sends a message to those who oined the server
clbot.on('guildMemberAdd', member => {
  member.guild.channels.get('658808475551531059').send("Welcome To the server");
})



//bot login token
clbot.login(token);
