<script setup lang="ts">
import { ref } from 'vue'

// State untuk mengontrol buka/tutup menu di layar mobile
const isMobileMenuOpen = ref(false)
</script>

<template>
  <header>
    <nav class="sticky top-0 z-50 flex items-stretch justify-between bg-[#f5f5f0] border-b-4 border-black h-20 text-black shadow-sm">
      
      <div class="flex items-center gap-10 pl-8">
        
        <router-link to="/" class="font-pixel text-2xl tracking-widest hover:text-emerald-500 hover:scale-105 transition-all">
          FUNDIVEST
        </router-link>
        
        <div class="hidden md:flex gap-8 font-dialog text-2xl mt-2">
          <a href="#" class="relative group hover:text-emerald-600 transition-colors">
            How To Play
            <span class="absolute -bottom-1 left-0 w-0 h-[3px] bg-emerald-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" class="relative group hover:text-emerald-600 transition-colors">
            Catalog
            <span class="absolute -bottom-1 left-0 w-0 h-[3px] bg-emerald-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" class="relative group hover:text-emerald-600 transition-colors">
            Blog
            <span class="absolute -bottom-1 left-0 w-0 h-[3px] bg-emerald-500 transition-all group-hover:w-full"></span>
          </a>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-6 pr-8">
        <button class="font-dialog text-2xl hover:text-emerald-600 hover:-translate-y-1 transition-all mt-1">
          Login
        </button>
        
        <button class="font-pixel text-sm bg-black text-white hover:bg-emerald-500 hover:text-black px-6 py-3 border-2 border-black shadow-[4px_4px_0_0_rgba(16,185,129,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0)] hover:translate-y-1 transition-all">
          SIGN UP
        </button>
      </div>

      <div class="flex md:hidden items-center pr-6">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="font-pixel text-2xl hover:text-emerald-500 transition-colors">
          {{ isMobileMenuOpen ? 'X' : '☰' }}
        </button>
      </div>

    </nav>

    <div 
      v-show="isMobileMenuOpen" 
      class="md:hidden bg-[#f5f5f0] border-b-4 border-black font-dialog text-2xl flex flex-col p-6 shadow-xl absolute w-full z-40"
    >
      <a href="#" class="py-3 border-b-2 border-dashed border-gray-300 hover:text-emerald-600 hover:pl-2 transition-all">How To Play</a>
      <a href="#" class="py-3 border-b-2 border-dashed border-gray-300 hover:text-emerald-600 hover:pl-2 transition-all">Catalog</a>
      <a href="#" class="py-3 border-b-2 border-dashed border-gray-300 hover:text-emerald-600 hover:pl-2 transition-all">Blog</a>
      
      <div class="flex flex-col gap-4 mt-8">
        <button class="bg-white py-3 border-2 border-black font-pixel text-sm hover:bg-gray-100">
          LOGIN
        </button>
        <button class="bg-emerald-500 py-3 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-pixel text-sm hover:bg-emerald-400">
          SIGN UP
        </button>
      </div>
    </div>
  </header>
</template>