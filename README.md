# Clase 1 — Desarrollo Back-End con Express.js
API RESTful de productos con Node.js, Express, TypeScript, Nodemon, dotenv, Helmet, CORS y Morgan. Arquitectura por capas y manejo centralizado de errores.

## Ejecución en Visual Studio Code (Windows)
1. Extraer el ZIP y abrir la carpeta `CLASE_1_EXPRESS` (debe verse `package.json` en la raíz).
2. Abrir una terminal PowerShell y ejecutar:

```powershell
npm install
npm run dev
```

Requiere Node.js 20 o superior y conexión a Internet para instalar las dependencias. El archivo `.env` ya está configurado para el puerto 4000. Si falta, ejecutar `Copy-Item .env.example .env`.

## Endpoints
| Método | URL | Resultado |
|---|---|---|
| GET | http://localhost:4000/health | Estado UP |
| GET | http://localhost:4000/api/v1/productos | Lista de productos |
| GET | http://localhost:4000/api/v1/productos/1 | Detalle |
| POST | http://localhost:4000/api/v1/productos | Crear producto (201) |

En otra terminal PowerShell, con el servidor iniciado:

```powershell
Invoke-RestMethod http://localhost:4000/health
Invoke-RestMethod http://localhost:4000/api/v1/productos
Invoke-RestMethod -Method Post -Uri http://localhost:4000/api/v1/productos -ContentType 'application/json' -Body '{"nombre":"Teclado","precio":45,"categoria":"Hardware"}'
```

También se incluye `pruebas.http` para la extensión REST Client de VS Code (opcional).

## Compilación y pruebas
```powershell
npm run verify
npm run build
npm start
```
Detener antes el servidor de desarrollo con Ctrl+C para evitar conflictos de puerto al ejecutar `npm start`. Las pruebas usan un puerto temporal independiente.

## Arquitectura
- `src/server.ts`: arranque HTTP.
- `src/app.ts`: configuración Express y middlewares.
- `src/routes`: endpoints.
- `src/controllers`: peticiones, validación y respuestas.
- `src/services`: lógica de negocio y productos en memoria.
- `src/middleware`: manejo centralizado de errores.
- `tests`: pruebas automatizadas HTTP.

Los productos se almacenan en memoria, tal como plantea la práctica; al reiniciar el servidor se restauran los dos productos iniciales. No requiere base de datos ni frontend. El precio debe ser positivo. CORS está habilitado para la práctica local; para producción debe restringirse según el origen permitido.

## Interfaz web completa

Abre http://localhost:4000 después de `npm install` y `npm run dev` (o `npm start`). El directorio `public` contiene la interfaz HTML, CSS y JavaScript, servida por Express en el mismo puerto. Incluye indicadores, catálogo, búsqueda, filtros, consulta individual y formulario de registro conectado a la API real. No necesita otro servidor. Los datos se reinician al detener el proceso, según la práctica.
