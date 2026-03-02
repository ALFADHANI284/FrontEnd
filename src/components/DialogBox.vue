<template>
  <div class="relative w-full max-w-4xl bg-[#E6DCC8] border-[3px] border-black p-2 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-black font-mono">
    
    <div class="border border-black/40 h-full p-6 relative">

      <div class="absolute -left-[38px] top-6 bottom-6 flex flex-col justify-between">
        <div v-for="i in 4" :key="i" class="w-10 h-6 bg-gray-400 border-[3px] border-black rounded-l-full shadow-[2px_2px_0px_rgba(0,0,0,1)] relative">
            <div class="absolute right-0 top-0 bottom-0 w-4 bg-[#E6DCC8] border-l-[3px] border-black"></div>
        </div>
      </div>

      <div class="absolute top-4 right-4 flex gap-2">
        <button v-for="(btn, index) in buttons" :key="index" class="w-8 h-8 bg-[#D3C5AE] border-[2px] border-black flex items-center justify-center hover:bg-[#C2B299] active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
           <span class="text-sm font-bold">{{ btn.icon }}</span>
        </button>
      </div>

      <div class="pr-32"> <h2 class="text-3xl font-bold tracking-widest mb-6 border-b-[3px] border-black inline-block pb-1">
          {{ characterName }}
        </h2>

        <p class="text-xl leading-relaxed whitespace-pre-wrap">
          {{ dialogueText }}
        </p>
      </div>

    </div>

    <div class="absolute bottom-0 right-0 w-10 h-10 bg-[#C2B299] border-l-[3px] border-t-[3px] border-black shadow-[-2px_-2px_0px_rgba(0,0,0,0.2)]" style="clip-path: polygon(100% 0, 0 100%, 100% 100%);"></div>
    <div class="absolute bottom-0 right-0 w-10 h-10 bg-transparent border-b-[3px] border-r-[3px] border-black" style="clip-path: polygon(0 0, 100% 0, 0 100%);"></div>
  </div>
</template>

<script setup lang="ts">
// Menggunakan sintaks murni TypeScript untuk mendefinisikan Props
defineProps<{
  characterName: string
  dialogueText: string
}>()

// Array tombol aksi
const buttons = [
  { icon: '↻' },
  { icon: '👁' },
  { icon: '≡' },
  { icon: '▶▶' }
]
</script>