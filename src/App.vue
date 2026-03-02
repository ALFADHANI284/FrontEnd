<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#f5f5f0]">
    <Navbar />
    
    <main class="flex-grow">
      <router-view></router-view>
    </main>

    <div class="relative z-20 font-dialog">
      <Footer />
    </div>
  </div>
</template>