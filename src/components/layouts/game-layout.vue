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

    <main class="w-full flex-grow relative bg-gray-100 border-2 border-amber-600  overflow-hidden">
      <!-- Контейнер для SVG на весь оставшийся экран -->
      <router-view />
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


<style scoped>
  main {
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    width: 100vw;
    height: calc(100vh - header_height - footer_height);
  }
</style>
