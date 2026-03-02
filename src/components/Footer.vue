<script setup lang="ts">
// Footer dengan tema gelap agar menyatu dengan gambar hook
</script>

<template>
  <footer class="bg-slate-900/95 border-t-4 border-emerald-500 text-gray-100 pt-10 pb-6 px-8 mt-auto backdrop-blur-sm shadow-[0_-5px_15px_rgba(0,0,0,0.5)] relative z-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <router-link to="/" class="font-pixel text-2xl tracking-wider text-white hover:text-emerald-400 transition-colors drop-shadow-md">
          FUNDIVEST
        </router-link>
        <p class="font-dialog text-xl mt-2 text-gray-300">
          Level up your portfolio!
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-6 font-dialog text-2xl text-gray-300">
        <a href="#" class="hover:underline hover:text-emerald-400 transition-colors">About Us</a>
        <a href="#" class="hover:underline hover:text-emerald-400 transition-colors">Terms</a>
        <a href="#" class="hover:underline hover:text-emerald-400 transition-colors">Privacy</a>
      </div>

      <div>
        <button class="font-pixel bg-black text-white hover:bg-emerald-500 hover:text-black px-6 py-3 text-sm border-2 border-white hover:border-black shadow-[4px_4px_0_0_rgba(16,185,129,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0)] hover:translate-y-1 transition-all">
          JOIN DISCORD
        </button>
      </div>

    </div>
    
    <div class="max-w-7xl mx-auto mt-8 pt-4 border-t-2 border-dashed border-gray-600 text-center">
      <p class="font-pixel text-[10px] text-gray-400 tracking-widest w-full">
        © 2026 FUNDIVEST. ALL RIGHTS RESERVED.
      </p>
    </div>
  </footer>
</template>