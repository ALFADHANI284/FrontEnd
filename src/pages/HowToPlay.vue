<script setup lang="ts">
import { ref } from 'vue';

const steps = [
  {
    id: '01',
    title: 'Discovery Dive',
    desc: 'Pelajari dasar-dasar pasar saham dan instrumen investasi. Pahami risiko dan cara kerja fundamental perusahaan sebelum memulai.',
  },
  {
    id: '02',
    title: 'Concept Crafting',
    desc: 'Bangun strategi portofoliomu. Susun rencana alokasi dana virtualmu ke berbagai aset untuk bertahan dari fluktuasi pasar.',
  },
  {
    id: '03',
    title: 'Pixel Perfection',
    desc: 'Eksekusi trading pertamamu! Pantau pergerakan harga secara real-time dan ambil keputusan jual/beli di saat yang tepat.',
  },
  {
    id: '04',
    title: 'Launch & Beyond',
    desc: 'Bertahanlah dari krisis pasar! Kelola profitmu, hindari kebangkrutan, dan jadilah survivor terbaik di leaderboard.',
  },
] as const;

// Menyimpan index akordeon yang sedang terbuka. Null = semua tertutup.
const openIndex = ref<number | null>(null);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section class="py-24 bg-primary overflow-hidden min-h-screen">
    <div class="max-w-4xl mx-auto px-6">

      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-7xl font-pixel text-secondary kursor-interaktif">HOW TO PLAY</h2>
        <p class="mt-4 text-gray-400 text-lg font-mono">Survive the market in 4 easy steps.</p>
      </div>

      <div class="flex flex-col gap-4">
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="bg-primary transition-all duration-300 accordion-item"
        >
          <button 
            @click="toggle(index)"
            class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none kursor-interaktif"
          >
            <div class="flex items-center gap-6">
              <span 
                class="font-pixel text-2xl md:text-3xl tracking-widest" 
                style="color: var(--color-secondary);"
              >
                {{ step.id }}
              </span>
              
              <span 
                class="text-secondary transition-all duration-300 font-sans"
                :class="openIndex === index ? 'text-xl md:text-2xl font-bold' : 'text-lg md:text-xl font-medium'"
              >
                {{ step.title }}
              </span>
            </div>

            <div class="w-8 h-8 flex items-center justify-center shrink-0">
              <svg 
                v-if="openIndex !== index" 
                viewBox="0 0 12 12" 
                class="w-4 h-4"
                style="fill: var(--color-secondary);"
              >
                <path d="M5 0h2v5h5v2H7v5H5V7H0V5h5V0z" />
              </svg>

              <svg 
                v-else 
                viewBox="0 0 12 12" 
                class="w-4 h-4"
                style="fill: var(--color-secondary);"
              >
                <path d="M2 0L0 2l4 4-4 4 2 2 4-4 4 4 2-2-4-4 4-4-2-2-4 4-4-4z" />
              </svg>
            </div>
          </button>

          <div 
            v-show="openIndex === index"
            class="px-6 pb-6 ml-[4.5rem] text-gray-400 leading-relaxed text-sm md:text-base font-sans"
          >
            {{ step.desc }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Menambahkan border secondary ke setiap kotak akordeon */
.accordion-item {
  border: 2px solid var(--color-secondary);
}

/* Opsional: Efek glow saat di-hover untuk memperkuat kesan retro/game */
.accordion-item:hover {
  box-shadow: 0 0 10px -2px var(--color-secondary);
}
</style>