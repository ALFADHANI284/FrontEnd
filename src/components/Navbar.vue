<script setup lang="ts">
import { ref } from 'vue'

// State untuk mengontrol buka/tutup menu di layar mobile
const isMobileMenuOpen = ref(false)
</script>

<template>
  <header>
    <nav class="sticky top-0 z-50 flex items-stretch justify-between bg-primary border-b-[3px] border-black h-20 text-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      
      <div class="flex items-center gap-10 pl-8">
        
        <router-link to="/" class="font-pixel text-2xl tracking-widest hover:text-accent hover:-translate-y-1 transition-none">
          FUNDIVEST
        </router-link>
        
        <div class="hidden md:flex gap-8 font-main text-2xl mt-2 font-bold">
          <a href="#" class="relative group hover:text-accent transition-none">
            How To Play
            <span class="absolute -bottom-1 left-0 w-full h-[3px] bg-accent hidden group-hover:block"></span>
          </a>
          <a href="#" class="relative group hover:text-accent transition-none">
            Catalog
            <span class="absolute -bottom-1 left-0 w-full h-[3px] bg-accent hidden group-hover:block"></span>
          </a>
          <a href="#" class="relative group hover:text-accent transition-none">
            Blog
            <span class="absolute -bottom-1 left-0 w-full h-[3px] bg-accent hidden group-hover:block"></span>
          </a>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-6 pr-8">
        <button class="font-main font-bold text-2xl hover:text-accent hover:bg-black/5 px-4 py-2 border-[3px] border-transparent hover:border-black transition-none cursor-pointer">
          Login
        </button>
        
        <button class="font-pixel text-xs bg-accent text-primary px-6 py-3 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none cursor-pointer transition-none">
          SIGN UP
        </button>
      </div>

      <div class="flex md:hidden items-center pr-6">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="font-pixel text-2xl hover:text-accent cursor-pointer">
          {{ isMobileMenuOpen ? 'X' : '☰' }}
        </button>
      </div>

    </nav>

    <div 
      v-show="isMobileMenuOpen" 
      class="md:hidden bg-primary border-b-[3px] border-black font-main font-bold text-2xl flex flex-col p-6 shadow-[0_8px_0_0_rgba(0,0,0,1)] absolute w-full z-40"
    >
      <a href="#" class="py-3 border-b-[3px] border-black border-dashed hover:text-accent hover:bg-black/5 px-2">How To Play</a>
      <a href="#" class="py-3 border-b-[3px] border-black border-dashed hover:text-accent hover:bg-black/5 px-2">Catalog</a>
      <a href="#" class="py-3 border-b-[3px] border-black border-dashed hover:text-accent hover:bg-black/5 px-2">Blog</a>
      
      <div class="flex flex-col gap-4 mt-8">
        <button class="bg-primary py-3 border-[3px] border-black font-pixel text-sm hover:bg-black/10 active:translate-y-1 cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none">
          LOGIN
        </button>
        <button class="bg-accent text-white py-3 border-[3px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-pixel text-sm hover:bg-[#8A2B2B] active:translate-y-1 active:shadow-none cursor-pointer">
          SIGN UP
        </button>
      </div>
    </div>
  </header>
</template>