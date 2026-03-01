// index.js
// Bot de Discord básico usando discord.js

const http = require('http');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;

if (!token) {
    console.error('Falta DISCORD_TOKEN en variables de entorno.');
    process.exit(1);
}

if (process.env.PORT) {
    const port = Number(process.env.PORT);
    http
        .createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Bot activo');
        })
        .listen(port, () => {
            console.log(`Servidor HTTP de healthcheck activo en puerto ${port}`);
        });
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers // Necesario para detectar nuevos miembros
    ]
});
// Función reutilizable para dar la bienvenida y autorol
async function enviarBienvenida(member) {
    const canalBienvenidaId = process.env.WELCOME_CHANNEL_ID;
    const rolAutoId = process.env.AUTOROL_ID;
    const imagenBienvenidaUrl = process.env.WELCOME_IMAGE_URL;

    // Mensaje embed con foto
    const embed = {
        color: 0x0099ff,
        title: '🌟 ¡Bienvenido a Impact! 🌟',
        description: `${member.user.username}, nos alegra que hayas decidido unirte a nuestra comunidad.

Aquí en Impact no solo encontrarás un servidor de Discord, sino un verdadero punto de encuentro para aventureros, estrategas y soñadores que comparten la pasión por World of Warcraft y los mundos fantásticos.

🔹 ¿Qué puedes esperar?
• Un espacio donde siempre habrá alguien dispuesto a ayudarte o a compartir una buena charla.
• Eventos, raids y actividades que te pondrán a prueba y te harán crecer como jugador.
• Canales dedicados para guías, builds, noticias y curiosidades del universo WoW.
• Una comunidad que valora el respeto, la amistad y la diversión por encima de todo.

⚔️ Tu viaje comienza aquí: explora los canales, preséntate en la sala de bienvenida y no dudes en preguntar cualquier cosa. Cada nuevo miembro aporta su propia chispa y hace que nuestro servidor sea más fuerte.

✨ Recuerda: Impact no es solo un nombre, es lo que juntos dejamos en cada batalla, en cada conversación y en cada momento compartido.

¡Prepárate para vivir aventuras épicas y crear recuerdos inolvidables!`,
        thumbnail: {
            url: member.user.displayAvatarURL({ dynamic: true })
        },
        image: imagenBienvenidaUrl
            ? { url: imagenBienvenidaUrl }
            : undefined,
        timestamp: new Date(),
        footer: {
            text: '¡Nuevo miembro!'
        }
    };

    // Enviar embed al canal de bienvenida
    try {
        if (!canalBienvenidaId) throw new Error('WELCOME_CHANNEL_ID no está definido en el .env');
        const canal = await member.guild.channels.fetch(canalBienvenidaId);
        if (canal && canal.isTextBased()) {
            await canal.send({ embeds: [embed] });
        }
    } catch (error) {
        console.error('Error enviando mensaje de bienvenida:', error);
    }

    // Asignar rol automáticamente
    try {
        if (!rolAutoId) return; // Si no hay rol configurado, no hacemos nada
        const rol = await member.guild.roles.fetch(rolAutoId);
        if (rol) {
            await member.roles.add(rol);
        }
    } catch (error) {
        console.error('Error asignando autorol:', error);
    }
}

// Evento para dar la bienvenida real cuando alguien se une
client.on('guildMemberAdd', async member => {
    await enviarBienvenida(member);
});

client.once('clientReady', () => {
    console.log(`Bot listo como ${client.user.tag}`);
});

client.on('error', error => {
    console.error('Error del cliente de Discord:', error);
});

client.on('shardError', error => {
    console.error('Error de conexión con gateway de Discord:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
});

client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.reply('¡Pong!');
    }
    // Comando para testear la bienvenida
    if (message.content === '!testwelcome') {
        if (!message.member) return;
        enviarBienvenida(message.member);
    }
});

client.login(token).catch(error => {
    console.error('No se pudo iniciar sesión en Discord. Revisa DISCORD_TOKEN.', error);
    process.exit(1);
});