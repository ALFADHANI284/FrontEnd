<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const footerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  // 1. Inisialisasi AOS global (jika belum di main.ts)
  AOS.init({
    once: true,
    duration: 800,
  })

  // 2. Gunakan Intersection Observer untuk memantau Footer
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Jika footer masuk layar lebih dari 10%
      if (entry.isIntersecting) {
        isVisible.value = true
        
        // Refresh AOS untuk menghitung ulang koordinat saat ini
        AOS.refresh()
        
        // Berhenti mengamati setelah terlihat (karena once: true)
        if (footerRef.value) observer?.unobserve(footerRef.value)
      }
    })
  }, {
    // Threshold: 0.2 berarti 20% footer harus masuk layar dulu baru animasi jalan
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px' // Offset manual 50px dari bawah
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
    class="bg-secondary border-t-[4px] border-black text-primary pt-10 pb-6 px-8 mt-auto relative z-20 overflow-hidden"
  >
    <div v-if="isVisible" class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

      <div 
        class="flex flex-col items-center md:items-start text-center md:text-left"
        data-aos="fade-right"
        data-aos-anchor="#site-footer"
      >
        <router-link to="/" class="font-pixel text-2xl tracking-wider text-primary hover:text-accent transition-all duration-300">
          FUNDIVEST
        </router-link>
        <p class="font-main text-xl mt-2 text-primary font-bold opacity-80">
          SURVIVE THE MARKET
        </p>
      </div>

      <div 
        class="flex flex-wrap justify-center gap-6 font-main font-bold text-2xl"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-anchor="#site-footer"
      >
        <a href="#" class="text-primary hover:text-accent hover:underline decoration-[3px] underline-offset-4 transition-colors">About Us</a>
        <a href="#" class="text-primary hover:text-accent hover:underline decoration-[3px] underline-offset-4 transition-colors">Terms</a>
        <a href="#" class="text-primary hover:text-accent hover:underline decoration-[3px] underline-offset-4 transition-colors">Privacy</a>
      </div>

      <div 
        data-aos="zoom-in-left" 
        data-aos-delay="400"
        data-aos-anchor="#site-footer"
      >
        <button
          class="font-pixel bg-primary text-black hover:bg-accent hover:text-primary px-6 py-3 text-sm border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer"
        >
          LOREM IPSUM
        </button>
      </div>

    </div>

    <div 
      v-if="isVisible"
      class="max-w-7xl mx-auto mt-8 pt-4 border-t-[4px] border-dashed border-primary text-center opacity-80"
      data-aos="fade-up"
      data-aos-delay="600"
      data-aos-anchor="#site-footer"
    >
      <p class="font-pixel text-[10px] text-primary tracking-widest w-full mt-2 uppercase">
        © 2026 FUNDIVEST. ALL RIGHTS RESERVED.
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  contain: paint;
  /* Beri tinggi minimal agar observer tidak bingung saat konten v-if masih kosong */
  min-height: 200px;
}
</style>