<template>
  <nav class="flex items-stretch justify-between bg-[#f5f5f0] border-y-2 border-black h-16 text-black">
    
    <div class="flex items-center gap-10 pl-8">
      
      <router-link to="/" class="font-pixel text-xl tracking-wider hover:text-emerald-600 transition-colors">
        FUNDIVEST
      </router-link>
      
      <div class="hidden md:flex gap-8 font-dialog text-2xl mt-1">
        <a href="#" class="hover:underline">How To Play</a>
        <a href="#" class="hover:underline">Catalog</a>
        <a href="#" class="hover:underline">Blog</a>
      </div>
    </div>

    <div class="flex items-stretch font-dialog text-2xl">
      <button class="px-6 hover:bg-gray-200 transition-colors">
        Login
      </button>
      
      <div class="w-[2px] bg-black"></div>
      
      <button class="px-8 hover:bg-emerald-400 hover:font-bold transition-all">
        Sign up
      </button>
    </div>

  </nav>
</template>