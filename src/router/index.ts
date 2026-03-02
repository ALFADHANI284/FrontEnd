import { createRouter, createWebHistory } from 'vue-router'
// Ubah import dari TitleScreen.vue menjadi Home.vue
import Home from '../pages/Home.vue' 
import Game from '../pages/Scene.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',      
      name: 'home',
      component: Home 
    },
    {
      path: '/game',  
      name: 'game',
      component: Game
    }
  ]
})

export default router