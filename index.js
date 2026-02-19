require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

// Cargar config de .env o config.json
const config = {
    token: process.env.DISCORD_TOKEN || require('./config.json').token,
    welcomeChannelId: process.env.WELCOME_CHANNEL_ID || require('./config.json').welcomeChannelId,
    autoRoleId: process.env.AUTO_ROLE_ID || require('./config.json').autoRoleId,
    welcomeMessage: require('./config.json').welcomeMessage || {
        title: "¡Bienvenido!",
        description: "¡Hola {user}!",
        color: "#7289DA",
        imageUrl: ""
    }
};

// Crear el cliente del bot con los intents necesarios
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

// Evento cuando el bot está listo
client.once('ready', () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
    console.log(`📊 Sirviendo en ${client.guilds.cache.size} servidor(es)`);
    
    // Registrar comandos slash
    registerSlashCommands();
});

// Función para registrar comandos slash
async function registerSlashCommands() {
    try {
        const commands = [
            new SlashCommandBuilder()
                .setName('test-welcome')
                .setDescription('Testea el mensaje de bienvenida')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        ];

        const guild = client.guilds.cache.first();
        if (guild) {
            await guild.commands.set(commands);
            console.log('✅ Comandos slash registrados');
        }
    } catch (error) {
        console.error('❌ Error al registrar comandos:', error);
    }
}

// Manejar comandos slash
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'test-welcome') {
        try {
            await interaction.deferReply({ ephemeral: true });

            // Obtener el canal de bienvenida
            const welcomeChannel = interaction.guild.channels.cache.get(config.welcomeChannelId);
            
            if (!welcomeChannel) {
                return await interaction.editReply('❌ Canal de bienvenida no encontrado');
            }

            // Crear el embed de prueba
            const testEmbed = new EmbedBuilder()
                .setTitle(config.welcomeMessage.title)
                .setDescription(config.welcomeMessage.description.replace('{user}', `${interaction.user.username}`))
                .setColor(config.welcomeMessage.color)
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setImage(config.welcomeMessage.imageUrl)
                .setFooter({ 
                    text: `🧪 Mensaje de prueba - Miembro #${interaction.guild.memberCount}`,
                    iconURL: interaction.guild.iconURL({ dynamic: true })
                })
                .setTimestamp();

            // Enviar el mensaje de prueba
            await welcomeChannel.send({ 
                content: `🧪 **MENSAJE DE PRUEBA** (Enviado por ${interaction.user})`,
                embeds: [testEmbed] 
            });
            
            // Mensajeprivado de confirmación
            await interaction.editReply({
                content: '✅ Mensaje de prueba enviado en ' + welcomeChannel.toString(),
                ephemeral: true
            });
            
            console.log(`🧪 Prueba de bienvenida enviada por ${interaction.user.tag}`);
            
        } catch (error) {
            console.error('❌ Error en comando test-welcome:', error);
            await interaction.editReply('❌ Ocurrió un error al enviar el mensaje de prueba');
        }
    }
});

// Evento cuando un nuevo miembro se une al servidor
client.on('guildMemberAdd', async (member) => {
    try {
        // Obtener el canal de bienvenida
        const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannelId);
        
        if (!welcomeChannel) {
            console.error('❌ No se encontró el canal de bienvenida. Verifica el ID en config.json');
            return;
        }

        // Asignar rol automático si está configurado
        if (config.autoRoleId) {
            try {
                const autoRole = member.guild.roles.cache.get(config.autoRoleId);
                if (autoRole) {
                    await member.roles.add(autoRole);
                    console.log(`✅ Rol automático asignado a ${member.user.tag}`);
                } else {
                    console.warn(`⚠️ No se encontró el rol con ID ${config.autoRoleId}`);
                }
            } catch (roleError) {
                console.error(`❌ Error al asignar rol: ${roleError.message}`);
            }
        }

        // Reemplazar {user} con la mención del usuario
        const description = config.welcomeMessage.description.replace('{user}', `<@${member.id}>`);

        // Crear el embed de bienvenida
        const welcomeEmbed = new EmbedBuilder()
            .setTitle(config.welcomeMessage.title)
            .setDescription(description)
            .setColor(config.welcomeMessage.color)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setImage(config.welcomeMessage.imageUrl)
            .setFooter({ 
                text: `Miembro #${member.guild.memberCount}`,
                iconURL: member.guild.iconURL({ dynamic: true })
            })
            .setTimestamp();

        // Enviar el mensaje de bienvenida
        await welcomeChannel.send({ embeds: [welcomeEmbed] });
        
        console.log(`👋 Bienvenida enviada a ${member.user.tag}`);
        
    } catch (error) {
        console.error('❌ Error al enviar mensaje de bienvenida:', error);
    }
});

// Iniciar el bot
client.login(config.token)
    .then(() => console.log('🔄 Conectando al servidor de Discord...'))
    .catch(error => {
        console.error('❌ Error al iniciar el bot:', error);
        console.log('💡 Asegúrate de que el token en config.json sea válido');
    });
