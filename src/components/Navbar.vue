<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const isVisible = ref(true)
const lastScrollPosition = ref(0)
const isAtTop = ref(true)

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  isAtTop.value = currentScrollPosition < 20

  const scrollDistance = Math.abs(currentScrollPosition - lastScrollPosition.value)
  if (scrollDistance < 40) return

  if (currentScrollPosition < lastScrollPosition.value || currentScrollPosition < 100) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  AOS.init({
    once: true,
    duration: 600
  })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="relative">
    <nav :class="[
      'fixed top-0 left-0 right-0 z-[100] flex items-stretch justify-between h-20 text-accent',
      'border-b-[4px] border-accent bg-primary transition-all duration-500 ease-in-out',
      
      // Logic translasi saat scroll
      isVisible ? 'translate-y-0' : '-translate-y-full',
    ]">
      
      <div class="flex items-center gap-12 pl-8">
        <router-link to="/" 
          class="font-pixel text-2xl tracking-tighter hover:skew-x-[-10deg] transition-transform duration-200">
          FUNDIVEST
        </router-link>

        <div class="hidden md:flex items-center h-full font-main text-xl font-black uppercase tracking-tight">
          <a href="#" class="h-full flex items-center px-6 hover:bg-accent hover:text-primary transition-colors border-x-[0px] hover:border-x-[4px] border-accent">
            How To Play
          </a>
          <a href="#" class="h-full flex items-center px-6 hover:bg-accent hover:text-primary transition-colors border-x-[0px] hover:border-x-[4px] border-accent">
            Catalog
          </a>
          <a href="#" class="h-full flex items-center px-6 hover:bg-accent hover:text-primary transition-colors border-x-[0px] hover:border-x-[4px] border-accent">
            Blog
          </a>
        </div>
      </div>

      <div class="md:hidden flex items-center pr-8">
        <button class="p-2 border-[3px] border-accent bg-accent text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="square" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  /* Memastikan font tetap tajam saat translasi */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Animasi link saat hover agar ada efek blok */
a {
  cursor: pointer;
  position: relative;
}
</style>