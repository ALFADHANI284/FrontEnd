<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const footerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  AOS.init({
    once: true,
    duration: 600,
  })

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        setTimeout(() => { AOS.refresh() }, 50)
        if (footerRef.value) observer?.unobserve(footerRef.value)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
  })

  if (footerRef.value) {
    observer.observe(footerRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <footer 
    ref="footerRef"
    id="site-footer"
    class="bg-primary border-t-[8px] border-accent text-accent pt-16 pb-8 px-6 mt-auto overflow-hidden relative"
  >
    <div class="absolute top-6 left-6 w-4 h-4 bg-accent hidden md:block"></div>
    <div class="absolute top-6 right-6 w-4 h-4 bg-accent hidden md:block"></div>

    <div v-if="isVisible" class="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
      
      <div class="flex flex-col items-center gap-3" data-aos="zoom-in">
        <h2 class="font-pixel text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-none">
          FUNDIVEST 
        </h2>
        <div class="font-main font-black text-lg md:text-xl uppercase tracking-widest border-[3px] border-accent px-6 py-2 bg-white shadow-[6px_6px_0_0_#2C3E50] rotate-[-2deg] mt-1">
          Protect Your Assets
        </div>
      </div>

      <div 
        class="flex flex-wrap justify-center items-center gap-4 md:gap-8 font-main font-black text-lg md:text-xl uppercase tracking-tight mt-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <a href="#" class="hover:bg-accent hover:text-primary px-3 py-1 border-[3px] border-transparent hover:border-accent transition-all">About Us</a>
        <span class="text-accent hidden md:block">✦</span>
        <a href="#" class="hover:bg-accent hover:text-primary px-3 py-1 border-[3px] border-transparent hover:border-accent transition-all">Catalog</a>
        <span class="text-accent hidden md:block">✦</span>
        <a href="#" class="hover:bg-accent hover:text-primary px-3 py-1 border-[3px] border-transparent hover:border-accent transition-all">Privacy</a>
        <span class="text-accent hidden md:block">✦</span>
        <a href="#" class="hover:bg-accent hover:text-primary px-3 py-1 border-[3px] border-transparent hover:border-accent transition-all">Terms</a>
      </div>

      <div 
        class="w-full mt-6 pt-6 border-t-[4px] border-dashed border-accent flex flex-col items-center gap-4"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <p class="font-pixel text-[10px] md:text-xs tracking-widest uppercase opacity-80 text-center leading-loose">
          © 2026 FUNDIVEST STUDIOS. <br class="md:hidden" /> ALL RIGHTS RESERVED. <br/>
          <span class="inline-block mt-2">INSERT COIN TO CONTINUE</span>
        </p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
footer {
  contain: paint;
  /* min-height: 500px dihapus agar footer tidak memaksa tinggi yang berlebihan */
}
</style>