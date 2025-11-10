import Fastify from 'fastify';
import wsPlugin from '@fastify/websocket';
import type { FastifyInstance } from 'fastify';
import { WebSocket } from 'ws';
import { Puzzle } from './entities/Puzzle.js'

const fastify: FastifyInstance = Fastify({ logger: true });

// Обычный HTTP-маршрут
fastify.get('/', async () => {
  return { status: 'ok', component: 'HTTP server is running' };
});

const start = async () => {
  try {
    // 1️⃣ Регистрируем WebSocket-плагин
    await fastify.register(wsPlugin);

    // 2️⃣ Создаём WS-маршрут
    fastify.get(
      '/ws',
      { websocket: true },
      (socket /* это сам WebSocket! */, req) => {
        console.log('⚡ Новый клиент подключен!');

        socket.send(
          JSON.stringify({ type: 'greeting', data: 'Добро пожаловать!' })
        );

        socket.on('message', (raw: Buffer) => {
          const message = raw.toString();
          console.log(`➡️ Получено сообщение: ${message}`);
          let messageObj;

          try {
            messageObj = JSON.parse(message);
          } catch (e) {
            messageObj = {type: "message", message};
          }
          console.log(messageObj);
          if (messageObj.type === "get-puzzle") {
            const puzzle = new Puzzle(
              "small",
              'me'
            )



            const outData = {
              type: "game-data",
              data: puzzle.getForPlayer()
            }

            console.log(outData)
            socket.send(JSON.stringify(outData));
          }

          socket.send(
            JSON.stringify({
              type: 'echo',
              data: `Сервер получил: ${message}`,
            })
          );
        });

        socket.on('close', () => {
          console.log('🔌 Клиент отключен.');
        });
      }
    );

    // 3️⃣ Запускаем сервер
    await fastify.listen({ port: 3000 });

    console.log('🚀 Сервер запущен на http://127.0.0.1:3000');
    console.log('🌐 WebSocket доступен на ws://127.0.0.1:3000/ws');
  } catch (err) {
    console.error('❌ Ошибка запуска сервера:', err);
    process.exit(1);
  }
};

start();
