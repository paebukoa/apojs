class SetError {
    constructor(d, type, message) {
            if(type = "function") {
            const embed = MessageEmbed()
            .setTitle("Error!")
            .setDescription(`An error just happenned.
            
            Function: \`#${d.func}\`
            Error: \`${message}\`
            Command: \`${d.command}\`
            `)
            .setColor("RED");

            d.message.channel.send({embeds: [embed]});

            return;
        }
    }
}

module.exports = { SetError };