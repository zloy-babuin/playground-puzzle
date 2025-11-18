import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Ref} from 'vue';

export const useGameStore = defineStore('game', () => {
  // --- STATE ---
  const socket = ref(null);
  const isConnected = ref(false);
  const lastMessage = ref(null);
  const messages = ref([]);

  const puzzleData = ref();
  const gameId: Ref<string | null> = ref(null);
  const startedAt = ref() as Ref<Date | null> ;
  const gameSize = ref()

  // --- ACTIONS ---

  /** * Инициализирует соединение WebSocket
   */
  async function connect(url) {
    if (socket.value) {
      console.warn("Соединение уже существует. Разрываем старое.");
      // Опционально: закрыть старое соединение, если оно есть
      socket.value.close();
      socket.value = null;
    }

    // Возвращаем Promise, который будет разрешен при успешном подключении
    // или отклонен при ошибке.
    return new Promise((resolve, reject) => {
      // 1. Создание WebSocket (синхронное)
      const ws = new WebSocket(url);
      socket.value = ws;

      // 2. Обработчик успешного подключения (resolve)
      ws.onopen = () => {
        isConnected.value = true;
        console.log('WS: Соединение установлено.');
        resolve(ws); // Разрешаем промис
      };

      // 3. Обработчик ошибки подключения (reject)
      ws.onerror = (error) => {
        isConnected.value = false;
        console.error('WS: Ошибка соединения:', error);
        reject(new Error('Не удалось установить соединение WebSocket.')); // Отклоняем промис
      };

      // 4. Настройка остальных обработчиков (onmessage, onclose)
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleIncomingMessage(data);
      };

      ws.onclose = () => {
        isConnected.value = false;
        console.log('WS: Соединение закрыто.');
      };
    });
  }

  /**
   * Логика обработки входящих сообщений и мутации состояния
   * @param {Object} data - Десериализованное сообщение от сервера
   */
  function handleIncomingMessage(data) {
    lastMessage.value = data;
    if (data.type === "game-data") {
      handleNewGameData(data)
    }

    // Пример обработки: если это сообщение чата, добавляем его в массив

    console.log(lastMessage.value)
    // Здесь можно вызывать другие Stores или Actions для более сложной логики
  }

  function handleNewGameData(_data) {
    if (!lastMessage.value) {
      return;
    }
    const data = _data.data

    puzzleData.value = data.pieces;
    gameId.value = data.id;
    startedAt.value = new Date(data.startedAt);
    gameSize.value = data.type;
  }

  /**
   * Отправка данных на сервер
   * @param {Object} dataToSend
   */
  function sendMessage(dataToSend) {
    if (socket.value && isConnected.value) {
      socket.value.send(JSON.stringify(dataToSend));
      return true;
    } else {
      console.error('WS: Соединение неактивно. Невозможно отправить сообщение.');
      return false;
    }
  }

  const disconnect = async () => {
    socket.value.close();
  }

  return {
    isConnected,
    lastMessage,
    messages,
    connect,
    disconnect,
    sendMessage,
    puzzleData,
    gameId,
    startedAt,
    gameSize,
  };
});
