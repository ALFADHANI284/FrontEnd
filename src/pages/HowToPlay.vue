<script setup lang="ts">
import { ref, onMounted } from 'vue';

const steps = [
  {
    id: '01',
    title: 'Pilih Jalur Pendekatan',
    desc: 'Tentukan caramu memulai: bekali diri dengan dasar literasi keuangan lewat panduan kami, atau langsung uji nyali ke dalam simulasi interaktif.',
    icon: 'book',
    tag: '',
  },
  {
    id: '02',
    title: 'Mulai Petualangan',
    desc: 'Waktunya beraksi! Tekan tombol mulai untuk masuk ke dalam cerita simulasi.',
    icon: 'rocket', 
    tag: '',
  },
  {
    id: '03',
    title: 'Registrasi Karakter',
    desc: 'Masukkan namamu untuk membuat profil. Identitas ini akan digunakan untuk mencatat setiap langkah dan keputusan finansialmu sepanjang cerita.',
    icon: 'profile',
    tag: '',
  },
  {
    id: '04',
    title: 'Tentukan Alur Keputusan',
    desc: 'Hadapi berbagai skenario finansial. Hati-hati dengan tawaran investasi bodong! Setiap pilihan cerdasmu akan menentukan arah kelanjutan simulasi ini.',
    icon: 'chart',
    tag: '',
  },
  {
    id: '05',
    title: 'Raih Sertifikat Eksklusif',
    desc: 'Selesaikan seluruh cerita dan evaluasi hasil akhir keuanganmu. Dapatkan sertifikat khusus sebagai bentuk apresiasi atas pemahaman finansial yang kamu capai.',
    icon: 'trophy',
    tag: '',
  },
] as const;

const openIndex = ref<number | null>(null);
const visible = ref<boolean[]>([false, false, false, false, false]);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

onMounted(() => {
  steps.forEach((_, i) => {
    setTimeout(() => {
      visible.value[i] = true;
    }, 100 + i * 120);
  });
});
</script>

<template>
  <section class="py-24 bg-primary overflow-hidden min-h-screen relative">

    <div class="absolute top-12 left-8 opacity-30 floating-slow">
      <svg width="32" height="32" viewBox="0 0 8 8" style="image-rendering: pixelated;">
        <rect x="2" y="0" width="4" height="1" fill="var(--color-secondary)"/>
        <rect x="1" y="1" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="5" y="1" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="0" y="2" width="1" height="4" fill="var(--color-secondary)"/>
        <rect x="7" y="2" width="1" height="4" fill="var(--color-secondary)"/>
        <rect x="1" y="6" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="5" y="6" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="2" y="7" width="4" height="1" fill="var(--color-secondary)"/>
        <rect x="3" y="2" width="2" height="4" fill="var(--color-secondary)" opacity="0.6"/>
      </svg>
    </div>
    <div class="absolute top-24 right-12 opacity-20 floating-fast">
      <svg width="24" height="24" viewBox="0 0 6 6" style="image-rendering: pixelated;">
        <rect x="1" y="0" width="4" height="1" fill="var(--color-secondary)"/>
        <rect x="0" y="1" width="1" height="4" fill="var(--color-secondary)"/>
        <rect x="5" y="1" width="1" height="4" fill="var(--color-secondary)"/>
        <rect x="1" y="5" width="4" height="1" fill="var(--color-secondary)"/>
        <rect x="2" y="2" width="2" height="2" fill="var(--color-secondary)" opacity="0.5"/>
      </svg>
    </div>
    <div class="absolute bottom-20 left-16 opacity-15 floating-med">
      <svg width="20" height="20" viewBox="0 0 5 5" style="image-rendering: pixelated;">
        <rect x="1" y="0" width="3" height="1" fill="var(--color-secondary)"/>
        <rect x="0" y="1" width="1" height="3" fill="var(--color-secondary)"/>
        <rect x="4" y="1" width="1" height="3" fill="var(--color-secondary)"/>
        <rect x="1" y="4" width="3" height="1" fill="var(--color-secondary)"/>
      </svg>
    </div>
    <div class="absolute bottom-32 right-8 opacity-25 floating-slow">
      <svg width="28" height="28" viewBox="0 0 7 7" style="image-rendering: pixelated;">
        <rect x="3" y="0" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="3" y="2" width="1" height="3" fill="var(--color-secondary)"/>
        <rect x="0" y="3" width="7" height="1" fill="var(--color-secondary)"/>
        <rect x="1" y="1" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="5" y="1" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="1" y="5" width="1" height="1" fill="var(--color-secondary)"/>
        <rect x="5" y="5" width="1" height="1" fill="var(--color-secondary)"/>
      </svg>
    </div>

    <div class="max-w-4xl mx-auto px-6 relative z-10">

      <div class="text-center mb-16">
        <div class="flex justify-center mb-6">
          <div class="relative inline-block bounce-anim">
            </div>
        </div>

        <h2 class="text-4xl md:text-5xl font-pixel text-secondary kursor-interaktif drop-shadow-md tracking-wider">
          Cara Bermain
        </h2>
        <div class="flex justify-center mt-3 gap-1">
          <span v-for="n in 12" :key="n" class="inline-block w-2 h-2 bg-secondary opacity-60" :style="`animation-delay: ${n * 0.08}s`" :class="n % 3 === 0 ? 'opacity-100' : 'opacity-40'"></span>
        </div>
        <p class="mt-4 text-gray-400 text-lg font-mono">Mulai petualangan finansialmu dalam 5 langkah.</p>
      </div>

      <div class="flex flex-col gap-6">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="bg-primary transition-all duration-200 accordion-item relative"
          :class="visible[index] ? 'slide-in' : 'opacity-0 translate-x-8'"
          :style="`transition-delay: ${index * 80}ms`"
        >
          <div class="absolute -top-3 right-4 z-10">
            <span class="font-pixel text-xs px-2 py-0.5 bg-secondary text-primary border-2 border-secondary"
                  style="box-shadow: 2px 2px 0 rgba(0,0,0,0.4);">
              {{ step.tag }}
            </span>
          </div>

          <button
            @click="toggle(index)"
            class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none kursor-interaktif"
          >
            <div class="flex items-center gap-5">
              <div class="shrink-0 w-12 h-12 flex items-center justify-center border-2 border-secondary relative step-icon"
                   :class="openIndex === index ? 'bg-secondary' : 'bg-primary'">
                <svg v-if="step.icon === 'book'" width="28" height="28" viewBox="0 0 7 7" style="image-rendering: pixelated;">
                  <rect x="1" y="0" width="5" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="1" y="1" width="1" height="5" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="5" y="1" width="1" height="5" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="2" y="6" width="3" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="2" y="2" width="3" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.6"/>
                  <rect x="2" y="4" width="2" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.6"/>
                  <rect x="0" y="1" width="1" height="5" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.4"/>
                </svg>
                <svg v-if="step.icon === 'rocket'" width="28" height="28" viewBox="0 0 7 8" style="image-rendering: pixelated;">
                  <rect x="3" y="0" width="1" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="2" y="1" width="3" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="2" y="2" width="3" height="3" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="1" y="3" width="1" height="2" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="5" y="3" width="1" height="2" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="2" y="5" width="3" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="1" y="6" width="1" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.7"/>
                  <rect x="3" y="6" width="1" height="2" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.7"/>
                  <rect x="5" y="6" width="1" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.7"/>
                </svg>
                <svg v-if="step.icon === 'profile'" width="28" height="28" viewBox="0 0 7 8" style="image-rendering: pixelated;">
                  <rect x="2" y="0" width="3" height="3" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="1" y="3" width="5" height="2" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="0" y="5" width="7" height="3" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="3" y="1" width="1" height="1" :fill="openIndex === index ? 'var(--color-secondary)' : 'var(--color-primary, #1a1a2e)'" opacity="0.8"/>
                </svg>
                <svg v-if="step.icon === 'chart'" width="28" height="28" viewBox="0 0 7 7" style="image-rendering: pixelated;">
                  <rect x="0" y="6" width="7" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="0" y="0" width="1" height="7" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="1" y="4" width="1" height="2" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.7"/>
                  <rect x="2" y="3" width="1" height="3" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.8"/>
                  <rect x="3" y="1" width="1" height="5" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="4" y="2" width="1" height="4" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.9"/>
                  <rect x="5" y="0" width="2" height="6" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'" opacity="0.7"/>
                </svg>
                <svg v-if="step.icon === 'trophy'" width="28" height="28" viewBox="0 0 7 8" style="image-rendering: pixelated;">
                  <rect x="1" y="0" width="5" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="0" y="1" width="1" height="2" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="6" y="1" width="1" height="2" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="1" y="1" width="5" height="3" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="2" y="4" width="3" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="3" y="5" width="1" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="2" y="6" width="3" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="1" y="7" width="5" height="1" :fill="openIndex === index ? 'var(--color-primary, #1a1a2e)' : 'var(--color-secondary)'"/>
                  <rect x="3" y="2" width="1" height="1" :fill="openIndex === index ? 'var(--color-secondary)' : 'var(--color-primary, #1a1a2e)'" opacity="0.9"/>
                </svg>

                <span class="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-secondary block"></span>
                <span class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-secondary block"></span>
              </div>

              <div class="flex flex-col">
                <span class="font-pixel text-xs tracking-widest text-secondary opacity-50 mb-0.5">
                  STEP {{ step.id }}
                </span>
                <span
                  class="text-secondary transition-all duration-300 font-pixel tracking-wide"
                  :class="openIndex === index ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'"
                >
                  {{ step.title }}
                </span>
              </div>
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
            class="px-6 pb-6 border-t border-dashed border-secondary/30 pt-4 mt-2"
          >
            <div class="flex flex-col sm:flex-row gap-6 items-start ml-[4.25rem]">
              <p class="text-black leading-relaxed text-sm md:text-base font-mono flex-1">
                {{ step.desc }}
              </p>

              <div class="shrink-0 border-2 border-dashed border-secondary/40 p-2 self-center sm:self-start bg-primary scene-bg">
                <svg v-if="step.icon === 'book'" width="80" height="64" viewBox="0 0 20 16" style="image-rendering: pixelated;">
                  <rect x="1" y="11" width="18" height="2" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="1" y="13" width="2" height="3" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="17" y="13" width="2" height="3" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="4" y="7" width="5" height="4" fill="var(--color-secondary)" opacity="0.9"/>
                  <rect x="9" y="7" width="5" height="4" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="9" y="7" width="1" height="4" fill="var(--color-secondary)"/>
                  <rect x="5" y="8" width="3" height="1" fill="var(--color-primary, #1a1a2e)" opacity="0.5"/>
                  <rect x="5" y="9" width="2" height="1" fill="var(--color-primary, #1a1a2e)" opacity="0.5"/>
                  <rect x="10" y="8" width="3" height="1" fill="var(--color-primary, #1a1a2e)" opacity="0.5"/>
                  <rect x="10" y="9" width="2" height="1" fill="var(--color-primary, #1a1a2e)" opacity="0.5"/>
                  <rect x="14" y="4" width="3" height="1" fill="var(--color-secondary)"/>
                  <rect x="15" y="5" width="1" height="6" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="13" y="5" width="1" height="1" fill="var(--color-secondary)" opacity="0.3"/>
                  <rect x="12" y="6" width="1" height="1" fill="var(--color-secondary)" opacity="0.2"/>
                  <rect x="2" y="2" width="1" height="1" fill="var(--color-secondary)" opacity="0.6"/>
                  <rect x="7" y="1" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                </svg>
                <svg v-if="step.icon === 'rocket'" width="80" height="64" viewBox="0 0 20 16" style="image-rendering: pixelated;">
                  <rect x="3" y="2" width="14" height="9" fill="var(--color-secondary)" opacity="0.8"/>
                  <rect x="4" y="3" width="12" height="7" fill="var(--color-primary, #1a1a2e)"/>
                  <rect x="9" y="4" width="2" height="1" fill="var(--color-secondary)"/>
                  <rect x="9" y="5" width="2" height="3" fill="var(--color-secondary)" opacity="0.8"/>
                  <rect x="8" y="7" width="1" height="1" fill="var(--color-secondary)" opacity="0.6"/>
                  <rect x="11" y="7" width="1" height="1" fill="var(--color-secondary)" opacity="0.6"/>
                  <rect x="9" y="8" width="1" height="1" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="10" y="8" width="1" height="1" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="9" y="11" width="2" height="2" fill="var(--color-secondary)" opacity="0.6"/>
                  <rect x="7" y="13" width="6" height="1" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="5" y="4" width="1" height="1" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="14" y="6" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                  <rect x="6" y="8" width="1" height="1" fill="var(--color-secondary)" opacity="0.3"/>
                </svg>
                <svg v-if="step.icon === 'profile'" width="80" height="64" viewBox="0 0 20 16" style="image-rendering: pixelated;">
                  <rect x="3" y="2" width="14" height="10" fill="var(--color-secondary)" opacity="0.8"/>
                  <rect x="4" y="3" width="12" height="8" fill="var(--color-primary, #1a1a2e)"/>
                  <rect x="5" y="4" width="4" height="4" fill="var(--color-secondary)" opacity="0.6"/>
                  <rect x="6" y="5" width="2" height="2" fill="var(--color-secondary)"/>
                  <rect x="10" y="5" width="5" height="1" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="10" y="7" width="3" height="1" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="9" y="0" width="2" height="2" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="8" y="1" width="4" height="1" fill="var(--color-secondary)" opacity="0.3"/>
                  <rect x="15" y="10" width="1" height="5" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="15" y="15" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                  <rect x="14" y="10" width="3" height="1" fill="var(--color-secondary)" opacity="0.5"/>
                </svg>
                <svg v-if="step.icon === 'chart'" width="80" height="64" viewBox="0 0 20 16" style="image-rendering: pixelated;">
                  <rect x="2" y="1" width="16" height="11" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="3" y="2" width="14" height="9" fill="var(--color-primary, #1a1a2e)"/>
                  <rect x="5" y="7" width="2" height="3" fill="var(--color-secondary)" opacity="0.8"/>
                  <rect x="8" y="5" width="2" height="5" fill="var(--color-secondary)"/>
                  <rect x="11" y="4" width="2" height="6" fill="var(--color-secondary)" opacity="0.9"/>
                  <rect x="14" y="6" width="2" height="4" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="4" y="10" width="12" height="1" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="4" y="3" width="1" height="8" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="6" y="6" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                  <rect x="9" y="4" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                  <rect x="12" y="3" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                  <rect x="7" y="12" width="2" height="3" fill="var(--color-secondary)" opacity="0.5"/>
                  <rect x="11" y="12" width="2" height="3" fill="var(--color-secondary)" opacity="0.5"/>
                </svg>
                <svg v-if="step.icon === 'trophy'" width="80" height="64" viewBox="0 0 20 16" style="image-rendering: pixelated;">
                  <rect x="7" y="1" width="6" height="1" fill="var(--color-secondary)"/>
                  <rect x="6" y="2" width="8" height="5" fill="var(--color-secondary)"/>
                  <rect x="5" y="2" width="1" height="3" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="14" y="2" width="1" height="3" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="7" y="7" width="6" height="2" fill="var(--color-secondary)" opacity="0.9"/>
                  <rect x="8" y="9" width="4" height="2" fill="var(--color-secondary)" opacity="0.7"/>
                  <rect x="6" y="11" width="8" height="1" fill="var(--color-secondary)"/>
                  <rect x="5" y="12" width="10" height="1" fill="var(--color-secondary)" opacity="0.8"/>
                  <rect x="9" y="3" width="2" height="1" fill="var(--color-primary, #1a1a2e)"/>
                  <rect x="10" y="2" width="1" height="1" fill="var(--color-primary, #1a1a2e)"/>
                  <rect x="8" y="4" width="4" height="1" fill="var(--color-primary, #1a1a2e)"/>
                  <rect x="9" y="5" width="2" height="1" fill="var(--color-primary, #1a1a2e)"/>
                  <rect x="2" y="2" width="1" height="1" fill="var(--color-secondary)" opacity="0.6"/>
                  <rect x="3" y="1" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                  <rect x="17" y="3" width="1" height="1" fill="var(--color-secondary)" opacity="0.6"/>
                  <rect x="16" y="2" width="1" height="1" fill="var(--color-secondary)" opacity="0.4"/>
                  <rect x="1" y="8" width="1" height="1" fill="var(--color-secondary)" opacity="0.3"/>
                  <rect x="18" y="7" width="1" height="1" fill="var(--color-secondary)" opacity="0.3"/>
                  <rect x="3" y="14" width="14" height="1" fill="var(--color-secondary)" opacity="0.3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 flex items-center justify-center gap-2">
        <span v-for="(step, i) in steps" :key="i"
              class="font-pixel text-xs text-secondary opacity-50 flex items-center gap-1">
          <span class="inline-block w-3 h-3 border border-secondary"
                :class="openIndex === i ? 'bg-secondary' : ''"></span>
          <span v-if="i < steps.length - 1" class="inline-block w-4 h-px bg-secondary opacity-40"></span>
        </span>
      </div>
      <p class="text-center font-pixel text-secondary text-xs opacity-40 mt-2 tracking-widest">[ SELECT A STEP ]</p>

    </div>
  </section>
</template>

<style scoped>
/* Desain kotak bergaya retro pixel art */
.accordion-item {
  border: 3px solid var(--color-secondary);
  box-shadow: 4px 4px 0px 0px var(--color-secondary);
  transform: translateY(0);
}

.accordion-item:hover,
.accordion-item:focus-within {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px var(--color-secondary);
}

.accordion-item:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px 0px var(--color-secondary);
}

/* Slide-in animation */
.slide-in {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Floating decorations */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes floatFast {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(10deg); }
}
@keyframes floatMed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0px); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

.floating-slow { animation: floatSlow 4s ease-in-out infinite; }
.floating-fast { animation: floatFast 2.5s ease-in-out infinite; }
.floating-med  { animation: floatMed 3.5s ease-in-out infinite; }
.bounce-anim   { animation: bounce 2s ease-in-out infinite; }

/* Pixel grid background */
.pixel-grid-bg {
  background-image:
    linear-gradient(var(--color-secondary, #f0e040) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-secondary, #f0e040) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Scene illustration hover glow */
.scene-bg {
  transition: box-shadow 0.2s;
}
.scene-bg:hover {
  box-shadow: 0 0 0 2px var(--color-secondary);
}

/* Icon box invert transition */
.step-icon {
  transition: background 0.2s, border-color 0.2s;
}
</style>