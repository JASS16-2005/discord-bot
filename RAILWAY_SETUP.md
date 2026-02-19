# Guía: Desplegar el Bot en Railway 🚂

Railway es una plataforma para desplegar aplicaciones Node.js de forma gratuita. Aquí te enseño cómo.

## Paso 1: Preparar el repositorio

### 1.1 Inicializar Git (si no lo has hecho)
```bash
git init
git add .
git commit -m "Bot de bienvenida para Discord"
```

### 1.2 Crear `.env` desde `.env.example`
```bash
cp .env.example .env
# Edita .env con tus valores reales
```

### 1.3 Crear `.gitignore`
```bash
echo "node_modules/
.env
.DS_Store
*.log
config.json" > .gitignore
```

## Paso 2: Actualizar config.json para usar variables de entorno

Reemplaza [index.js](index.js) para usar `.env`:

```javascript
require('dotenv').config();

const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const config = {
    token: process.env.DISCORD_TOKEN,
    welcomeChannelId: process.env.WELCOME_CHANNEL_ID,
    autoRoleId: process.env.AUTO_ROLE_ID,
    welcomeMessage: {
        title: "🌟 ¡Bienvenido a Impact! 🌟",
        description: "👋 ¡{user}! nos alegra que hayas decidido unirte..."
        // ... resto del mensaje
    }
};
```

## Paso 3: Instalar dotenv

```bash
npm install dotenv
```

## Paso 4: Crear cuenta en Railway

1. Ir a [Railway.app](https://railway.app)
2. Hacer clic en **"Sign Up"**
3. Conectar con GitHub o crear cuenta
4. Confirmar email

## Paso 5: Desplegar en Railway

### Opción A: Desde GitHub (Recomendado)

1. **Subir código a GitHub**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/bot-discord.git
   git branch -M main
   git push -u origin main
   ```

2. **En Railway Dashboard:**
   - Click en **"New Project"**
   - Click en **"Deploy from GitHub repo"**
   - Selecciona tu repositorio
   - Railway detectará automáticamente que es Node.js
   - Click en **Deploy**

### Opción B: Desde Command Line

```bash
npm install -g @railway/cli
railway login
railroad init
# Selecciona Node.js
railroad up
```

## Paso 6: Configurar Variables de Entorno

1. En el dashboard de Railway
2. Ir a tu proyecto (el nuevo deployment)
3. Click en **"Variables"**
4. Añadir las siguientes variables:
   - `DISCORD_TOKEN` → Tu token del bot
   - `WELCOME_CHANNEL_ID` → ID del canal
   - `AUTO_ROLE_ID` → ID del rol

## Paso 7: Verificar que funciona

1. En Railway → Tu proyecto → **"Logs"**
2. Debería ver algo como:
   ```
   ✅ Bot conectado como Bot#1234
   📊 Sirviendo en 1 servidor(es)
   ```

## Solución de Problemas

### El bot no se conecta
- Verifica que el token sea válido
- Comprueba que las variables de entorno estén configuradas
- Mira los logs en Railway

### El bot se desconecta después de unos minutos
- Railway puede pausar proyectos inactivos
- Suscribirse a Railway+ ($5/mes) para ejecución 24/7

### El bot está offline
- Ir a Railway Dashboard
- Click en tu proyecto
- Reiniciar con el botón "Restart"

## Mantener el bot online 24/7

Railway tiene opciones:
- **Gratis:** Pausas después de inactividad
- **Railway+ ($5/mes):** Ejecución continua 24/7

Para Railway+:
1. Click en tu perfil
2. Click en **"Billing"**
3. Seleccionar **"Railway Pro"**

## Actualizar el código

Después de hacer cambios:
```bash
git add .
git commit -m "Actualización del bot"
git push origin main
```

Railway redesplegará automáticamente.

---

¡Tu bot ahora está online y funcionando 24/7! 🎉
