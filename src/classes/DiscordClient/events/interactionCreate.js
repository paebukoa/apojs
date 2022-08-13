const { cloneObject, Data } = require("../utils/utils")

module.exports = async d => {
    d.client.on('interactionCreate', async interaction => {

        d.commandManager.interaction.forEach(async commandData => {  

            let data = cloneObject(d)

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.slashOptions = interaction.options
            data.value = interaction.values
            data.target = {
                message: interaction.targetMessage?.id,
                user: interaction.targetId
            }
            data.customId = interaction.customId ?? interaction.commandName
            data.fields = interaction.fields
            data.command = commandData
            data.eventType = 'interaction'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
            
        })

        if (interaction.isCommand()) {
            
            let data = cloneObject(d)

            const commandData = d.commandManager.commandInteraction.get(interaction.commandName.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.slashOptions = interaction.options
            data.customId = interaction.commandName
            data.command = commandData
            data.eventType = 'commandInteraction'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)

        } else if (interaction.isButton()) {
            
            let data = cloneObject(d)

            const commandData = d.commandManager.buttonInteraction.get(interaction.customId.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.customId = interaction.customId
            data.command = commandData
            data.eventType = 'buttonInteraction'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)

        } else if (interaction.isSelectMenu()) {

            let data = cloneObject(d)

            const commandData = d.commandManager.selectMenuInteraction.get(interaction.customId.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.value = interaction.values
            data.customId = interaction.customId
            data.command = commandData
            data.eventType = 'selectMenuInteraction'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)

        } else if (interaction.isMessageContextMenu()) {
           
            let data = cloneObject(d);

            const commandData = d.commandManager.messageContextMenuInteraction.get(interaction.commandName.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.target = {
                message: interaction.targetMessage.id,
                user: interaction.targetId
            }
            data.customId = interaction.commandName
            data.command = commandData
            data.eventType = 'messageContextMenuInteraction'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)

        } else if (interaction.isUserContextMenu()) {
           
            let data = cloneObject(d)

            const commandData = d.commandManager.userContextMenuInteraction.get(interaction.commandName.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.target = {
                user: interaction.targetId
            }
            data.customId = interaction.commandName
            data.command = commandData
            data.eventType = 'userContextMenuInteraction'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)
            
        } else if (interaction.isModalSubmit()) {

            let data = cloneObject(d)

            const commandData = d.commandManager.modalSubmitInteraction.get(interaction.customId.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.fields = interaction.fields
            data.customId = interaction.customId
            data.command = commandData
            data.eventType = 'modalSubmitInteraction'
            data.err = false
            data.data = d.data.newInstance()

            await data.command.code.parse(data)

        } else if (interaction.isAutocomplete()) {
            
            let data = cloneObject(d)

            const commandData = d.commandManager.autocompleteInteraction.get(interaction.commandName.toLowerCase())
            if (!commandData) return

            data.interaction = interaction
            data.channel = interaction.channel
            data.guild = interaction.guild
            data.author = interaction.user
            data.slashOptions = interaction.options
            data.customId = interaction.commandName
            data.command = commandData
            data.eventType = 'autocompleteInteraction'
            data.err = false
            data.data = d.data.newInstance()

            
            await data.command.code.parse(data)

        }
    })
}