# 🤖 Bot de Bienvenida para Discord - Impact

Bot automático que envía un embed personalizado cuando nuevos miembros se unen al servidor de Discord Impact, incluyendo asignación automática de rol.

## ✨ Características

- ✅ Embed personalizado con título, descripción e imagen
- ✅ Asignación automática de rol al entrar
- ✅ Comando slash `/test-welcome` para probar el mensaje
- ✅ Fácil de desplegar en Railway (online 24/7)
- ✅ Manejo de errores robusto

## 📋 Requisitos

- Node.js v18 o superior
- Bot de Discord creado en [Discord Developer Portal](https://Discord.com/developers/applications)
- Permisos de administrador en tu servidor de Discord

## 🚀 Instalación Local

### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/TU_USUARIO/bot-discord.git
cd bot-discord
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables

Crea un archivo `.env`:

```bash
DISCORD_TOKEN=tu_token_aqui
WELCOME_CHANNEL_ID=ID_canal_bienvenida
AUTO_ROLE_ID=ID_del_rol
```

### 4. Ejecutar el bot

```bash
npm start
```

## 🧪 Probar el Mensaje

Una vez el bot esté corriendo:

1. En Discord, escribe: `/test-welcome`
2. El bot enviará un mensaje de prueba en el canal configurado
3. Verifica que se vea corta el embed y los datos

## 🌐 Desplegar en Railway

Ver [RAILWAY_SETUP.md](RAILWAY_SETUP.md) para instrucciones completas.

**Resumen rápido:**

1. Sube el código a GitHub
2. Ve a [railway.app](https://railway.app)
3. Conecta tu repositorio
4. Configura variables de entorno
5. ¡Deploy! 🚀

## 📝 Estructura de Archivos

```
bot-discord/
├── index.js              # Código principal del bot
├── config.json          # Configuración base (opcional con .env)
├── package.json         # Dependencias
├── .env.example         # Plantilla de variables
├── .gitignore          # Archivos a ignorar en git
├── RAILWAY_SETUP.md    # Guía para Railway
└── README.md           # Este archivo
```

## ⚙️ Configuración

### Token de Discord

1. Ir a [Discord Developer Portal](https://discord.com/developers/applications)
2. Click en "New Application"
3. Ir a "Bot" → "Add Bot"
4. Copiar el token bajo "TOKEN"
5. Pegar en `.env` → `DISCORD_TOKEN`

### IDs de Canal y Rol

**Para obtener IDs en Discord:**

1. Activar "Modo de Desarrollador" (User Settings > Advanced > Developer Mode)
2. Click derecho en el canal → "Copiar ID del canal"
3. Click derecho en el rol → "Copiar ID del rol"

### Personalizar Mensaje

Edita el `config.json` o variables de entorno:

```json
"welcomeMessage": {
  "title": "Tu título aquí",
  "description": "Tu descripción aquí",
  "color": "#7289DA",
  "imageUrl": "https://tu-imagen.png"
}
```

## 🛠️ Comandos Disponibles

### `/test-welcome`
- **Descripción:** Envía un mensaje de prueba de bienvenida
- **Requiere:** Permisos de administrador
- **Uso:** Solo escribe `/test-welcome` en Discord

## 🐛 Solución de Problemas

### El bot no inicia
```
Error: DISCORD_TOKEN no definido
```
→ Verifica que `.env` tiene el token correcto

### El bot está offline
→ Reinicia con `npm start` o en Railway: Restart deployment

### El mensaje no se envía
→ Verifica:
- ID del canal correcto
- Bot tiene permisos de "Send Messages" y "Embed Links"
- Canal de bienvenida existe

## 📚 Recursos

- [Discord.js Documentación](https://discord.js.org)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Railway Documentación](https://docs.railway.app)

## 📄 Licencia

ISC

---

Creado para la comunidad Impact ⚔️
