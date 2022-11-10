const { clone, replaceLast } = require("../utils/utils");

module.exports = async d => {
    let requiredIntents = ['GuildEmojisAndStickers']

    if (requiredIntents.find(intent => !d.clientOptions.intents.includes(intent))) new d.error('requiredIntent', replaceLast(__filename.replace("/", "\\").split('\\').at('-1'), '.js', ''), ...requiredIntents)
    
    d.client.on('stickerDelete', async sticker => {
        d.commandManager.stickerDelete.forEach(async commandData => {
            let data = clone(d)
 
            data.sticker = sticker
            data.guild = sticker.guild
            data.author = sticker.user
            data.command = commandData
            data.eventType = 'stickerDelete'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
        });
    })
}