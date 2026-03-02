import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/TitleScreen.vue'
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