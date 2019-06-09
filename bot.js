// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him
 
 
 
const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTg3Mjk2ODExMjc0OTkzNjY0.XP00ew.2y-jeFb018ModUiPH8wzUaBN6go";
 
client.login(token)
 
 var cookie = "0441B4D5DF0CC8F1D9F688370C2A922D24128D1A604828678D036A50EA08B89172DC6D3CF64FA767179F108CD3EC4A16D465E3AAFD53799F256B6AE0F5FC137F463CB399D7F491D776D8DE50503612FF0D81AC820EEBD9DB6C3A6991D2CD4D789921DBBD7FF5C227DE56D37BD11B6E2E064CC77F6D092C51A2D6E32004E4A5B8E6D8EF9EDECF75F2847AE0DA1EE87BFFDE9E62D53BEBAF3D2673CF29C5AF24AE95131B6F9E5A9204D61694B42EBF061021B0939BED85892042C75419B808E45AF74C79F8C64A35DBC50CCC8522BD599F21BC643EC672F04C62EDCC8660D00656C7C7EB081C83F8CED75A1C6CE0C2E564DEC5CE1576FB3EB03179A365EFA7EB490BA5FEEB9923B92427FFE9A0947C1D72A91CE50C06906D5941FE0E8B5CF95545E921A3DA6A07B650A64DFEE45461F56DEA55F11887FB9816F00E6226D8C4B64766B22DF3";
var prefix = '.';
var groupId = 4806674;
var maximumRank = 191;
 
function login() {
    return roblox.cookieLogin(cookie);
}
 
login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
        client.user.setActivity('With Applications')
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["Ranking"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
          });
      } else {
          message.channel.send("Please enter a username.")
      }
      return;
  }
})