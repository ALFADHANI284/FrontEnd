<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css' // WAJIB ADA agar animasi muncul

const isMobileMenuOpen = ref(false)
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
    isMobileMenuOpen.value = false
  }
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  AOS.init({
    once: true,
    duration: 800
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
      'fixed top-0 left-0 right-0 z-[100] flex items-stretch justify-between h-20 text-black',
      'border-b-[3px] border-black bg-primary',
      'transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform',

      // Logic translasi saat scroll
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',

      // Shadow dinamis
      isAtTop ? 'shadow-none' : 'shadow-[0_4px_0_0_rgba(0,0,0,1)]'
    ]">
      <div class="flex items-center gap-10 pl-8">
        <router-link to="/" data-aos="fade-right" data-aos-delay="200"
          class="font-pixel text-2xl tracking-widest hover:text-accent transition-all duration-300">
          FUNDIVEST
        </router-link>

        <div class="hidden md:flex gap-8 font-main text-2xl mt-2 font-bold">
          <a href="#" data-aos="fade-down" data-aos-delay="400"
            class="relative group hover:text-accent transition-colors">How To Play</a>
          <a href="#" data-aos="fade-down" data-aos-delay="500"
            class="relative group hover:text-accent transition-colors">Catalog</a>
          <a href="#" data-aos="fade-down" data-aos-delay="600"
            class="relative group hover:text-accent transition-colors">Blog</a>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-6 pr-8">
        <button data-aos="fade-left" data-aos-delay="700"
          class="font-main font-bold text-2xl hover:text-accent px-4 py-2">Login</button>
        <button data-aos="fade-left" data-aos-delay="800"
          class="font-pixel text-xs bg-accent text-primary px-6 py-3 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
          SIGN UP
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Opsional: Memastikan pergerakan font tidak blur saat animasi */
nav {
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}
</style>