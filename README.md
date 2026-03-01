# Bot de Discord

Este es un bot básico de Discord usando Node.js y discord.js.

## Requisitos
- Node.js
- Una cuenta y un bot en Discord (obtén el token en el portal de desarrolladores de Discord)

## Instalación
1. Instala las dependencias:
   ```sh
   npm install discord.js dotenv
   ```
2. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   DISCORD_TOKEN=tu_token_aquí
   ```
3. Ejecuta el bot:
   ```sh
   node index.js
   ```

## Uso
- Escribe `!ping` en cualquier canal donde el bot tenga acceso y responderá con `¡Pong!`.
