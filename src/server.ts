import { app, API_PREFIX } from './app';
const PORT = Number(process.env.PORT || 4000);
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) throw new Error('PORT inválido');
const server = app.listen(PORT, () => {
  console.log(`Servidor Express ejecutándose en modo ${process.env.NODE_ENV || 'development'}`);
  console.log(`Endpoint activo: http://localhost:${PORT}${API_PREFIX}/productos`);
});
server.on('error', (error: NodeJS.ErrnoException) => {
  console.error(error.code === 'EADDRINUSE' ? `Puerto ${PORT} ocupado. Cambia PORT en .env o detén el otro servidor.` : error.message);
  process.exitCode = 1;
});
