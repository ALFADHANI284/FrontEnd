<script setup lang="ts">
import { ref, computed } from 'vue'

// === GAME STATE MANAGEMENT ===
// Tambahkan state 'moving'
const gameState = ref<'explore' | 'moving' | 'dialog'>('explore')
const currentDialogIndex = ref(0)
const mcLeftPos = ref(10) // Posisi awal MC di kiri (10%)

// 1. INTERFACE UNTUK TYPESCRIPT
interface Choice {
  text: string;
  nextId: number;
}

interface Dialog {
  speaker: 'mc' | 'kakek';
  name: string;
  text: string;
  isChoice: boolean;
  choices?: Choice[];
  endGame?: boolean; 
}

// 2. DATA DIALOG
const dialogs: Dialog[] = [
  {
    speaker: 'kakek',
    name: 'Kakek Misterius',
    text: 'Hei anak muda... Kakek lihat kamu sedang butuh uang tambahan. Kakek punya rahasia investasi, profit 100% sehari tanpa risiko!',
    isChoice: false
  },
  {
    speaker: 'mc',
    name: 'Kamu',
    text: '',
    isChoice: true,
    choices: [
      { text: '> Wah, boleh tuh Kek! Uang jajan saya lagi pas-pasan.', nextId: 2 },
      { text: '> Maaf Kek, tidak ada investasi tanpa risiko (Mencurigakan).', nextId: 3 }
    ]
  },
  {
    speaker: 'kakek',
    name: 'Kakek Misterius',
    text: 'Hahaha! Tertipu kau anak muda! Uangmu akan kakek bawa kabur! (GAME OVER - SKEMA PONZI)',
    isChoice: false,
    endGame: true
  },
  {
    speaker: 'kakek',
    name: 'Kakek Misterius',
    text: 'Cih... Ternyata kamu cukup pintar membaca Red Flags. Kakek gagal menipumu kali ini! (YOU WIN)',
    isChoice: false,
    endGame: true
  }
]

const currentDialog = computed(() => dialogs[currentDialogIndex.value] as Dialog)

// === FUNGSI KONTROL ===
const startInteraction = () => {
  // Cegah klik berulang saat sedang jalan
  if (gameState.value !== 'explore') return 
  
  gameState.value = 'moving'
  mcLeftPos.value = 55 // MC bergerak ke titik 55% (Mendekati Kakek)

  // Tunggu 3 detik sampai MC sampai, lalu mulai dialog
  setTimeout(() => {
    gameState.value = 'dialog'
    currentDialogIndex.value = 0
  }, 3000)
}

const nextDialog = (nextId?: number) => {
  if (currentDialog.value?.endGame) {
    gameState.value = 'explore'
    currentDialogIndex.value = 0
    mcLeftPos.value = 10 // Kembalikan MC ke posisi awal
    return
  }

  if (nextId !== undefined) {
    currentDialogIndex.value = nextId
  } else {
    currentDialogIndex.value++
  }
}
</script>

<template>
  <div class="relative w-full h-screen bg-accent overflow-hidden font-main selection:bg-primary selection:text-accent">

    <div class="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-start z-30 pointer-events-none">
      <h1 class="font-pixel text-2xl md:text-4xl text-white drop-shadow-[4px_4px_0_#2C3E50] tracking-widest uppercase mt-2">
        SIMULASI FINANSIAL
      </h1>
      <router-link to="/"
        class="pointer-events-auto font-pixel text-xs md:text-sm bg-primary text-accent px-6 py-3 border-[4px] border-accent shadow-[4px_4px_0_0_#2C3E50] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase">
        ← KEMBALI
      </router-link>
    </div>

    <img src="/background-rumah.png" alt="Background Rumah"
      class="absolute inset-0 w-full h-full object-cover object-bottom transition-all duration-500"
      :class="{ 'blur-md brightness-50': gameState === 'dialog' }" />

    <div v-if="gameState === 'explore' || gameState === 'moving'" class="absolute inset-0 z-20">

      <div v-if="gameState === 'explore'" class="absolute top-24 left-1/2 -translate-x-1/2 font-pixel text-xs md:text-sm bg-primary px-6 py-3 border-[4px] border-accent text-center animate-pulse shadow-[4px_4px_0_0_#2C3E50]">
        Klik Kakek untuk berinteraksi!
      </div>

      <img src="/MC_Char.png" alt="MC"
        class="absolute bottom-[10%] w-32 md:w-48 pixelated drop-shadow-[0_15px_0_rgba(0,0,0,0.5)] transition-all ease-linear"
        style="transition-duration: 3000ms;"
        :style="{ left: mcLeftPos + '%' }"
        :class="{ 'animate-walk': gameState === 'moving' }" />

      <img src="/Kakek_Char.png" alt="Kakek" @click="startInteraction"
        class="absolute bottom-[10%] right-[20%] w-32 md:w-48 pixelated drop-shadow-[0_15px_0_rgba(0,0,0,0.5)]"
        :class="gameState === 'explore' ? 'cursor-pointer hover:scale-110 hover:-translate-y-4 transition-transform' : ''" />

      <div v-if="gameState === 'explore'" class="absolute bottom-[35%] md:bottom-[40%] right-[24%] text-4xl md:text-5xl font-pixel animate-bounce pointer-events-none text-white drop-shadow-[4px_4px_0_#2C3E50]">
        ▼
      </div>
    </div>

    <div v-if="gameState === 'dialog' && currentDialog" class="absolute inset-0 z-20">

      <img v-if="currentDialog.speaker === 'mc'" src="/MC_Char.png"
        class="absolute bottom-[200px] md:bottom-[250px] left-4 md:left-20 w-56 md:w-80 pixelated drop-shadow-[0_15px_0_rgba(0,0,0,0.5)]" />
      
      <img v-if="currentDialog.speaker === 'kakek'" src="/Kakek_Char.png"
        class="absolute bottom-[200px] md:bottom-[250px] right-4 md:right-20 w-56 md:w-80 pixelated drop-shadow-[0_15px_0_rgba(0,0,0,0.5)]" />

      <div class="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-24 md:right-24 bg-primary border-[6px] border-accent p-6 md:p-10 shadow-[16px_16px_0_0_rgba(44,62,80,0.8)]">

        <div class="absolute -top-6 md:-top-8 border-[4px] border-accent bg-accent text-primary px-6 py-2 font-pixel uppercase tracking-widest text-sm md:text-base shadow-[4px_4px_0_0_#E6DCC8]"
          :class="currentDialog.speaker === 'mc' ? 'left-6 md:left-10' : 'right-6 md:right-10'">
          {{ currentDialog.name }}
        </div>

        <div v-if="!currentDialog.isChoice" class="mt-4 flex flex-col min-h-[120px] justify-between">
          <p class="font-main text-xl md:text-3xl font-black leading-relaxed text-accent">
            "{{ currentDialog.text }}"
          </p>

          <button @click="nextDialog()"
            class="self-end mt-8 font-pixel bg-accent text-primary px-8 py-4 border-[4px] border-accent hover:bg-primary hover:text-accent hover:shadow-[6px_6px_0_0_#2C3E50] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none text-sm md:text-base">
            > Lanjut
          </button>
        </div>

        <div v-else class="mt-4 flex flex-col gap-4">
          <button v-for="(choice, index) in currentDialog.choices" :key="index"
            @click="nextDialog(choice.nextId)"
            class="w-full text-left font-main font-black text-xl md:text-2xl p-4 md:p-6 border-[4px] border-accent bg-white text-accent hover:bg-accent hover:text-primary shadow-[6px_6px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group">
            {{ choice.text }}
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.pixelated {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* Animasi ini sekarang HANYA mengatur goyangan vertikal (bobbing up and down) */
/* Gerakan horizontalnya ditangani oleh CSS Transition di atribut 'style' pada template */
@keyframes walk {
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(0px) rotate(0deg); }
  75% { transform: translateY(-10px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.animate-walk {
  /* Dipercepat menjadi 0.5s agar terlihat seperti langkah lari/jalan cepat */
  animation: walk 0.5s ease-in-out infinite; 
}
</style>