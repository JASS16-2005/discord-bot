# Bot de Discord

Este es un bot básico de Discord usando Node.js y discord.js.

## Requisitos
- Node.js
- Una cuenta y un bot en Discord (obtén el token en el portal de desarrolladores de Discord)

## Instalación
1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Crea un archivo `.env` en la raíz del proyecto usando `.env.example` como base.
3. Ejecuta el bot:
   ```sh
   npm start
   ```

## Variables de entorno
```env
DISCORD_TOKEN=tu_token_aqui
WELCOME_CHANNEL_ID=123456789012345678
AUTOROL_ID=123456789012345678
WELCOME_IMAGE_URL=https://example.com/bienvenida.png
```

- `DISCORD_TOKEN`: obligatorio.
- `WELCOME_CHANNEL_ID`: obligatorio para mensaje automático de bienvenida.
- `AUTOROL_ID`: opcional (si no se define, no asigna rol).
- `WELCOME_IMAGE_URL`: opcional.

## Deploy en Railway
1. Sube este proyecto a GitHub.
2. En Railway, crea un proyecto desde ese repositorio.
3. En Variables, agrega las variables de entorno listadas arriba.
4. Railway ejecutará `npm install` y luego `npm start`.
5. Revisa logs: si falta `DISCORD_TOKEN`, el proceso terminará con mensaje explícito.
6. Si Railway define `PORT`, el bot abre un endpoint HTTP mínimo para healthcheck automáticamente.

## Uso
- Escribe `!ping` en cualquier canal donde el bot tenga acceso y responderá con `¡Pong!`.
