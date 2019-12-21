
//installed the discord.js lib
const Discord = require('discord.js');
//crete a new object aka the bot
const clbot = new Discord.Client();
//token for logging into bot
const token = 'Put your token here';

//when bot in ready say this msg
clbot.on('ready',() => {
console.log("It's on boy")
})
//an array of compliments only for me lul
let compliments =["Wow Max you'r so cool","wow Max your so handsome","wow Max you'r so Max to the Max","wow Max you'r ok","Wow Max you'r so smart","Eveything I said before was a lie"]
//var to keep track of size of compliments array
const size = compliments.length;
//Created this random function to give a diffrent Compliment each time for the Compliment FUnction
function randoNum(myMin){
return Math.floor(Math.random() * (size - myMin + 1)) + myMin;
}

//If you typei in "Compliment in Discord msg it will write a msh"
clbot.on('message', msg =>{
if(msg.content === "Compliment"){
  msg.reply(compliments[randoNum(0)]);
  }
})

clbot.on('message', msg =>{
if(msg.content === "do you like kpop"){
  msg.reply('Stop talking to me');
}
})


//bot login token
clbot.login(token);
