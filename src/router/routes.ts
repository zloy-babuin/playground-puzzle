// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router'

// Лэйауты
const DefaultLayout = () => import('@/components/layouts/main-layout.vue')
const GameLayout = () => import('@/components/layouts/game-layout.vue')

const Home = () => import('@/components/pages/HomePage.vue')
const Puzzle = () => import('@/components/pages/GamePage.vue')
// const Login = () => import('@/views/Login.vue')
// const Register = () => import('@/views/Register.vue')
// const Dashboard = () => import('@/views/Dashboard.vue')
const NotFound = () => import('@/components/pages/service/not-found-page.vue')

export const routes: RouteRecordRaw[] = [
  // Главная — без лэйаута или с DefaultLayout
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home },
    ],
  },

  // Авторизация: /login, /register
  {
    path: '/puzzle',
    component: GameLayout,
    children: [
      { path: "", name: "puzzle", component: Puzzle }
      // { path: 'login', name: 'Login', component: Login },
      // { path: 'register', name: 'Register', component: Register },
    ],
  },

  // Админка
  // {
  //   path: '/admin',
  //   component: AdminLayout,
  //   children: [
  //     { path: 'dashboard', name: 'Dashboard', component: Dashboard },
  //   ],
  // },

  // Редирект 404 (всегда последним)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]
