<script setup lang="ts">
import { ref } from 'vue';

const steps = [
  {
    id: '01',
    title: 'Register Player',
    desc: 'Mulai petualangan finansialmu! Masukkan namamu untuk membuat profil dan bersiap masuk ke dalam pasar investasi virtual.',
  },
  {
    id: '02',
    title: 'Mulai Simulasi',
    desc: 'Perhatikan kondisi pasar saham dan berbagai instrumen investasi. Analisis situasi sebelum mengalokasikan modal awalmu.',
  },
  {
    id: '03',
    title: 'Tentukan Alur',
    desc: 'Setiap keputusan ada harganya. Pilih strategi investasi di berbagai skenario ekonomi dan bertahanlah dari fluktuasi pasar.',
  },
  {
    id: '04',
    title: 'Raih Ending & Sertifikat',
    desc: 'Lihat hasil akhir dari portofoliomu. Apakah kamu bangkrut atau sukses besar? Dapatkan sertifikat eksklusif berdasarkan performamu!',
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
        <h2 class="text-4xl md:text-5xl font-pixel text-secondary kursor-interaktif drop-shadow-md">
          Cara Bermain
        </h2>
        <p class="mt-4 text-gray-400 text-lg font-mono">Mulai petualangan finansialmu dalam 4 langkah.</p>
      </div>

      <div class="flex flex-col gap-6">
        <div 
          v-for="(step, index) in steps" 
          :key="step.id"
          class="bg-primary transition-all duration-200 accordion-item relative"
        >
          <button 
            @click="toggle(index)"
            class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none kursor-interaktif"
          >
            <div class="flex items-center gap-6">
              <span 
                class="font-pixel text-3xl md:text-4xl tracking-widest text-secondary opacity-80" 
              >
                {{ step.id }}
              </span>
              
              <span 
                class="text-secondary transition-all duration-300 font-pixel tracking-wide"
                :class="openIndex === index ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'"
              >
                {{ step.title }}
              </span>
            </div>

            <div class="w-8 h-8 flex items-center justify-center shrink-0">
              <svg 
                v-if="openIndex !== index" 
                viewBox="0 0 12 12" 
                class="w-5 h-5 transition-transform"
                style="fill: var(--color-secondary);"
              >
                <path d="M5 0h2v5h5v2H7v5H5V7H0V5h5V0z" />
              </svg>
              <svg 
                v-else 
                viewBox="0 0 12 12" 
                class="w-5 h-5 transition-transform rotate-90"
                style="fill: var(--color-secondary);"
              >
                <path d="M2 0L0 2l4 4-4 4 2 2 4-4 4 4 2-2-4-4 4-4-2-2-4 4-4-4z" />
              </svg>
            </div>
          </button>

          <div 
            v-show="openIndex === index"
            class="px-6 pb-6 ml-[4.5rem] text-black leading-relaxed text-sm md:text-base font-mono border-t border-dashed border-secondary/30 pt-4 mt-2"
          >
            {{ step.desc }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Desain kotak bergaya retro pixel art */
.accordion-item {
  border: 3px solid var(--color-secondary);
  /* Efek bayangan solid khas retro 8-bit */
  box-shadow: 4px 4px 0px 0px var(--color-secondary);
  transform: translateY(0);
}

/* Animasi saat dihover atau diklik, seakan tombol ditekan */
.accordion-item:hover,
.accordion-item:focus-within {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px var(--color-secondary);
}

.accordion-item:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px 0px var(--color-secondary);
}
</style>