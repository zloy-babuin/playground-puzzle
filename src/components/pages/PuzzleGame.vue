<script setup lang="ts">

import { useGameStore } from '@/stores/game.ts'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const gameStore = useGameStore();
const gameData = ref();

onMounted(async () => {
  await gameStore.connect("http://localhost:3000/ws");
  gameStore.sendMessage({type: "get-puzzle", message: "test"});
  gameData.value = gameStore.lastMessage;
  console.log(gameData.value)
})

onBeforeUnmount(async () => {
  gameStore.disconnect();
})
</script>
<template>
  <pre>
    {{( gameStore?.puzzleData?.[1] ?? '') }}
  </pre>
</template>

