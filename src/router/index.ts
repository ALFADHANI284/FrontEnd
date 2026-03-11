import { createRouter, createWebHistory } from 'vue-router'
// Ubah import dari TitleScreen.vue menjadi Home.vue
import Home from '../pages/Home.vue' 
import Game1 from '../pages/Scene.vue'
import Game from '../pages/game.vue'
import HowToPlay from '../pages/HowToPlay.vue'

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
      component: Game1
    },
    {
      path: '/game',  
      name: 'game',
      component: Game
    },
    {
      path: '/carabermain',
      name: 'play',
      component: HowToPlay
    }
  ]
})

export default router