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
    class="bg-primary border-t-[8px] border-accent text-accent pt-32 pb-12 px-6 mt-auto overflow-hidden relative"
  >
    <div class="absolute top-10 left-10 w-4 h-4 bg-accent hidden md:block"></div>
    <div class="absolute top-10 right-10 w-4 h-4 bg-accent hidden md:block"></div>

    <div v-if="isVisible" class="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">
      
      <div class="flex flex-col items-center gap-6" data-aos="zoom-in">
        <h2 class="font-pixel text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none">
          FUNDIVEST
        </h2>
        <div class="font-main font-black text-xl md:text-3xl uppercase tracking-widest border-[4px] border-accent px-8 py-3 bg-white shadow-[8px_8px_0_0_#2C3E50] rotate-[-2deg] mt-2">
          Protect Your Assets
        </div>
      </div>

      <div 
        class="flex flex-wrap justify-center items-center gap-6 md:gap-12 font-main font-black text-xl md:text-2xl uppercase tracking-tight mt-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <a href="#" class="hover:bg-accent hover:text-primary px-4 py-2 border-[3px] border-transparent hover:border-accent transition-all">About Us</a>
        <span class="text-accent hidden md:block">✦</span>
        <a href="#" class="hover:bg-accent hover:text-primary px-4 py-2 border-[3px] border-transparent hover:border-accent transition-all">Catalog</a>
        <span class="text-accent hidden md:block">✦</span>
        <a href="#" class="hover:bg-accent hover:text-primary px-4 py-2 border-[3px] border-transparent hover:border-accent transition-all">Privacy</a>
        <span class="text-accent hidden md:block">✦</span>
        <a href="#" class="hover:bg-accent hover:text-primary px-4 py-2 border-[3px] border-transparent hover:border-accent transition-all">Terms</a>
      </div>

      <div 
        class="w-full mt-12 pt-12 border-t-[6px] border-dashed border-accent flex flex-col items-center gap-6"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <p class="font-pixel text-xs md:text-sm tracking-widest uppercase opacity-80 text-center leading-loose">
          © 2026 FUNDIVEST STUDIOS. <br class="md:hidden" /> ALL RIGHTS RESERVED. <br/>
          <span class="inline-block mt-4">INSERT COIN TO CONTINUE</span>
        </p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
footer {
  contain: paint;
  min-height: 500px; 
}
</style>