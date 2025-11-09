<template>
  <div class="flex flex-col min-h-screen bg-gray-50">

    <header class="bg-gray-800 text-white p-4 shadow-md">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Название Приложения</h1>
        <div class="space-x-4 text-sm sm:text-base">
          <a href="#" class="hover:text-gray-300 transition duration-150">Главная</a>
          <a href="#" class="hover:text-gray-300 transition duration-150">О нас</a>
          <a href="#" class="hover:text-gray-300 transition duration-150">Профиль</a>
        </div>
      </nav>
    </header>

    <main class="flex-grow bg-white p-4 sm:p-8 overflow-y-auto">
      <div class="container mx-auto h-full">

        <slot></slot>

      </div>
    </main>

    <footer class="bg-gray-700 text-white p-3 text-center text-xs sm:text-sm">
      <div class="container mx-auto">
        <p>&copy; 2025 Название Компании | Все права защищены</p>
        <div class="mt-1">
          <a href="#" class="hover:text-gray-400 transition duration-150">Политика конфиденциальности</a>
          <span class="mx-2">|</span>
          <a href="#" class="hover:text-gray-400 transition duration-150">Контакты</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
// Здесь могут быть скрипты, если компонент будет принимать props
// или иметь внутреннюю логику. Для простого layout это не нужно.
</script>

<style scoped>
/* Стили, специфичные для этого компонента.
  Поскольку используется Tailwind, обычно здесь ничего не требуется.
*/
</style>
