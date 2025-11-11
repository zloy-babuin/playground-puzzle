import Fastify from 'fastify';
import wsPlugin from '@fastify/websocket';
import { Puzzle } from './entities/Puzzle.js';

const fastify = Fastify({ logger: true });

fastify.get('/', async () => {
  return { status: 'ok', component: 'HTTP server is running' };
});

const start = async () => {
  try {
    await fastify.register(wsPlugin);

    fastify.get('/ws', { websocket: true }, (socket, req) => {
      console.log('⚡ Новый клиент подключен!');

      socket.send(JSON.stringify({ type: 'greeting', data: 'Добро пожаловать!' }));

      socket.on('message', (raw) => {
        const message = raw.toString().trim();
        if (!message) return;

        let data;
        try {
          data = JSON.parse(message);
        } catch (e) {
          socket.send(JSON.stringify({ type: 'error', data: 'Invalid JSON' }));
          return;
        }

        // Обработка разных типов
        switch (data.type) {
          case 'get-puzzle': {
            const puzzle = new Puzzle('small', 'me');
            socket.send(
              JSON.stringify({
                type: 'game-data',
                data: puzzle.getForPlayer(),
              })
            );
            break;
          }

          default:
            socket.send(
              JSON.stringify({
                type: 'echo',
                data: `Сервер получил: ${message}`,
              })
            );
        }
      });

      socket.on('close', () => {
        console.log('🔌 Клиент отключен.');
      });
    });

    await fastify.listen({ port: 3000 });
    console.log('🚀 Сервер запущен на http://127.0.0.1:3000');
    console.log('🌐 WebSocket: ws://127.0.0.1:3000/ws');
  } catch (err) {
    console.error('❌ Ошибка:', err);
    process.exit(1);
  }
};

start();