<script setup lang="ts">
// Footer dengan tema gelap retro (menggunakan warna secondary)
</script>

<template>
  <footer class="bg-secondary border-t-[4px] border-black text-primary pt-10 pb-6 px-8 mt-auto relative z-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <router-link to="/" class="font-pixel text-2xl tracking-wider text-primary hover:text-accent transition-none">
          FUNDIVEST
        </router-link>
        <p class="font-main text-xl mt-2 text-primary font-bold opacity-80">
          Lorem Ipsum 
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-6 font-main font-bold text-2xl">
        <a href="#" class="text-primary hover:text-accent hover:underline decoration-[3px] underline-offset-4 transition-none">About Us</a>
        <a href="#" class="text-primary hover:text-accent hover:underline decoration-[3px] underline-offset-4 transition-none">Terms</a>
        <a href="#" class="text-primary hover:text-accent hover:underline decoration-[3px] underline-offset-4 transition-none">Privacy</a>
      </div>

      <div>
        <button class="font-pixel bg-primary text-black hover:bg-[#D3C5AE] px-6 py-3 text-sm border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-none cursor-pointer">
          LOREM IPSUM
        </button>
      </div>

    </div>
    
    <div class="max-w-7xl mx-auto mt-8 pt-4 border-t-[4px] border-dashed border-primary text-center opacity-80">
      <p class="font-pixel text-[10px] text-primary tracking-widest w-full mt-2">
        © 2026 FUNDIVEST. ALL RIGHTS RESERVED.
      </p>
    </div>
  </footer>
</template>