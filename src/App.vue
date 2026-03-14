<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const router = useRouter()

// Cek apakah halaman saat ini adalah game
const isGamePage = computed(() => route.path.toLowerCase().includes('game'))

// TAMBAHAN: Cek apakah harus menyembunyikan Nav & Footer
// (Aktif jika di halaman game ATAU jika route punya meta hideNavFooter)
const hideNavAndFooter = computed(() => {
  return isGamePage.value || route.meta.hideNavFooter
})

// === STATE ANIMASI TRANSISI ===
const isTransitioning = ref(false)

// 1. Hook sebelum pindah halaman (Tutup Awan)
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    isTransitioning.value = true // Aktifkan animasi awan menutup
    
    // Tunggu 500ms (sesuai durasi animasi CSS) sebelum me-render rute baru
    setTimeout(() => {
      next()
    }, 500)
  } else {
    next()
  }
})

// 2. Hook setelah halaman siap (Buka Awan)
router.afterEach(() => {
  // Beri sedikit jeda agar DOM sempat dirender, lalu buka awannya
  setTimeout(() => {
    isTransitioning.value = false
  }, 100)
})
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden" :class="isGamePage ? 'bg-accent' : 'bg-primary'">
    
    <Navbar v-if="!hideNavAndFooter" />
    
    <main class="flex-grow relative" :class="{ 'p-0 m-0': isGamePage }">
      <router-view></router-view>
    </main>

    <div v-if="!hideNavAndFooter" class="relative z-20 font-dialog">
      <Footer />
    </div>

    <div class="fixed inset-0 z-[999999] pointer-events-none flex">
      <div 
        class="w-1/2 h-full bg-primary border-r-[8px] border-accent flex justify-end items-center transition-transform duration-500 ease-in-out shadow-[10px_0_0_0_rgba(44,62,80,0.3)]"
        :class="isTransitioning ? 'translate-x-0' : '-translate-x-[110%]'"
      >
        <div class="h-full w-8 border-l-[4px] border-accent opacity-10 mr-4"></div>
      </div>

      <div 
        class="w-1/2 h-full bg-primary border-l-[8px] border-accent flex justify-start items-center transition-transform duration-500 ease-in-out shadow-[-10px_0_0_0_rgba(44,62,80,0.3)]"
        :class="isTransitioning ? 'translate-x-0' : 'translate-x-[110%]'"
      >
        <div class="h-full w-8 border-r-[4px] border-accent opacity-10 ml-4"></div>
      </div>
    </div>

  </div>
</template>