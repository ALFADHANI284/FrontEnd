import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue' 
import Game1 from '../pages/Scene.vue'
import Game from '../pages/game.vue'
import HowToPlay from '../pages/HowToPlay.vue'
import AboutUs from '../pages/AboutUs.vue'
import VerifyPage from '../pages/Verify.vue'
import NotFound from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',      
      name: 'home',
      component: Home 
    },
    {
      path: '/scene',  
      name: 'scene',
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: AboutUs
    },
    {
      path: '/verify/:certId',
      component: VerifyPage,
      meta: { 
        hideNavFooter: true 
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound, 
      meta: { 
        hideNavFooter: true 
      }
    }
  ]
})

export default router