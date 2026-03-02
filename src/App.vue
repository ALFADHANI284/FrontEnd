<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen font-dialog bg-[#f5f5f0]">
    <Navbar />
    
    <main class="flex-grow relative z-10">
      <router-view></router-view>
    </main>

    <div class="-mt-32 md:-mt-40 relative z-20 font-dialog">
      <Footer />
    </div>
  </div>
</template>