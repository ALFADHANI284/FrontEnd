<script setup lang="ts">
import { ref, computed } from 'vue'

// === GAME STATE & CHAPTER MANAGEMENT ===
const gameState = ref<'intro' | 'explore' | 'moving' | 'dialog'>('intro')
const currentChapter = ref(1)
const currentDialogIndex = ref(0)
const mcLeftPos = ref(10)

// === STATE ANIMASI TRANSISI CHAPTER ===
const isChapterTransitioning = ref(false)
const transitionText = ref('')

// === DATA PEMAIN ===
const fullName = ref('')
const firstName = computed<string>(() => {
  const trimmedName = fullName.value.trim()
  return trimmedName ? (trimmedName.split(' ')[0] || 'Player') : 'Player'
})

const submitName = () => {
  if (fullName.value.trim().length === 0) {
    alert('Hei! Masukkan namamu dulu ya sebelum mulai!')
    return
  }

  isChapterTransitioning.value = true
  transitionText.value = 'CHAPTER 1'

  setTimeout(() => {
    gameState.value = 'explore'
    setTimeout(() => {
      isChapterTransitioning.value = false
    }, 1000)
  }, 800)
}

// === DINAMISASI ASSETS BERDASARKAN CHAPTER ===
const currentBackground = computed(() => {
  if (currentChapter.value === 1) return '/background-rumah.png'
  if (currentChapter.value === 2) return '/background-sekolah.png'
  return '/background-kamar.png'
})

const currentNpc = computed(() => {
  if (currentChapter.value === 1) return '/Kakek_Char.png'
  if (currentChapter.value === 2) return '/Teman_Char.png'
  return '/Dompet Kamara.gif'
})

// 1. INTERFACE TYPESCRIPT
interface Choice {
  text: string;
  nextId: number;
}

interface Dialog {
  speaker: 'mc' | 'npc';
  name: string;
  text: string;
  isChoice: boolean;
  choices?: Choice[];
  endGame?: boolean;
  nextChapter?: number;
}

// 2. DATA DIALOG CHAPTER 1 (Lawan Kakek)
const chapter1Dialogs = computed<Dialog[]>(() => [
  {
    speaker: 'npc',
    name: 'Kakek Misterius',
    text: `Hei ${firstName.value}... Kakek lihat kamu sedang butuh uang tambahan. Kakek punya rahasia investasi, profit 100% sehari tanpa risiko!`,
    isChoice: false
  },
  {
    speaker: 'mc',
    name: firstName.value,
    text: '',
    isChoice: true,
    choices: [
      { text: '> Wah, boleh tuh Kek! Tapi saya ga punya modal...', nextId: 2 },
      { text: '> Maaf Kek, tidak ada investasi tanpa risiko (Mencurigakan).', nextId: 3 }
    ]
  },
  {
    speaker: 'mc',
    name: `Pikiran ${firstName.value}`,
    text: 'Tawaran kakek ini terlalu bagus untuk dilewatkan. Ah! Aku ingat bapak menaruh dompetnya di kamar. Aku bisa meminjamnya sebentar...',
    isChoice: false,
    nextChapter: 3
  },
  {
    speaker: 'npc',
    name: 'Kakek Misterius',
    text: `Cih... Ternyata kamu cukup pintar membaca Red Flags, ${firstName.value}. Kakek gagal menipumu kali ini!`,
    isChoice: false,
    nextChapter: 2
  }
])

// 3. DATA DIALOG CHAPTER 2 (Sekolah)
const chapter2Dialogs = computed<Dialog[]>(() => [
  {
    speaker: 'npc',
    name: 'Teman Sekelas',
    text: `Woi ${firstName.value}! Tumben lu nyampe sekolah pagi banget. Muka lu juga cerah amat.`,
    isChoice: false
  },
  {
    speaker: 'mc',
    name: firstName.value,
    text: '',
    isChoice: true,
    choices: [
      { text: '> Baru aja gua lolos dari penipuan investasi bodong nih!', nextId: 2 },
      { text: '> Biasa aja ah, lu kali yang terlalu merhatiin gua.', nextId: 3 }
    ]
  },
  {
    speaker: 'npc',
    name: 'Teman Sekelas',
    text: 'Wah gila, pantesan! Btw gua lagi belajar kelola duit jajan pake FUNDIVEST nih, lu mau ikutan belajar bareng gak?',
    isChoice: false,
    endGame: true
  },
  {
    speaker: 'npc',
    name: 'Teman Sekelas',
    text: 'Yaelah ngeles aja lu. Eh btw lu udah tau FUNDIVEST belom? Aplikasi keren buat belajar investasi biar gak gampang ketipu.',
    isChoice: false,
    endGame: true
  }
])

// 4. DATA DIALOG CHAPTER 3 (Kamar)
const chapter3Dialogs = computed<Dialog[]>(() => [
  {
    speaker: 'mc',
    name: `Pikiran ${firstName.value}`,
    text: `Bapak sama Ibu lagi pergi... Di atas meja itu ada dompet bapak. Uang di dalamnya pasti cukup untuk modal investasi kakek tadi...`,
    isChoice: false
  },
  {
    speaker: 'mc',
    name: firstName.value,
    text: '',
    isChoice: true,
    choices: [
      { text: '> (Ambil Uang) Cuma pinjam kok, besok profit 100% langsung aku kembalikan!', nextId: 2 },
      { text: '> (Batal) Enggak, ini namanya mencuri. Aku tidak boleh buta karena keserakahan.', nextId: 3 }
    ]
  },
  {
    speaker: 'mc',
    name: `Pikiran ${firstName.value}`,
    text: '(Kamu mengambil uang tersebut dan memberikannya pada Kakek. Esok harinya, kakek itu menghilang tanpa jejak. Uang orang tuamu lenyap.) [GAME OVER - KORBAN PONZI]',
    isChoice: false,
    endGame: true
  },
  {
    speaker: 'mc',
    name: `Pikiran ${firstName.value}`,
    text: '(Kamu meletakkan kembali dompet itu. Mengambil jalan pintas dengan merugikan orang tua bukanlah cara yang benar. Lebih baik aku pergi ke sekolah.)',
    isChoice: false,
    nextChapter: 2
  }
])

const currentDialogList = computed(() => {
  if (currentChapter.value === 1) return chapter1Dialogs.value
  if (currentChapter.value === 2) return chapter2Dialogs.value
  return chapter3Dialogs.value
})

const currentDialog = computed(() => currentDialogList.value[currentDialogIndex.value])

// === FUNGSI KONTROL ===
const startInteraction = () => {
  if (gameState.value !== 'explore') return

  gameState.value = 'moving'

  if (currentChapter.value === 1) mcLeftPos.value = 55
  else if (currentChapter.value === 2) mcLeftPos.value = 45
  else mcLeftPos.value = 65 // Di Chapter 3 MC maju lebih jauh mendekati meja

  setTimeout(() => {
    gameState.value = 'dialog'
    currentDialogIndex.value = 0
  }, 3000)
}

const nextDialog = (nextId?: number) => {
  if (currentDialog.value?.endGame) {
    alert("DEMO SELESAI! (Di sini nanti kita panggil sertifikat kelulusan)")
    gameState.value = 'intro'
    currentChapter.value = 1
    currentDialogIndex.value = 0
    mcLeftPos.value = 10
    return
  }

  if (currentDialog.value?.nextChapter) {
    isChapterTransitioning.value = true
    transitionText.value = currentDialog.value.nextChapter === 3 ? 'CHAPTER 3: KESERAKAHAN' : `CHAPTER ${currentDialog.value.nextChapter}`

    setTimeout(() => {
      currentChapter.value = currentDialog.value!.nextChapter!
      gameState.value = 'explore'
      currentDialogIndex.value = 0
      mcLeftPos.value = 10

      setTimeout(() => {
        isChapterTransitioning.value = false
      }, 1000)

    }, 800)
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
      <h1
        class="font-pixel text-2xl md:text-4xl text-white drop-shadow-[4px_4px_0_#2C3E50] tracking-widest uppercase mt-2">
        SIMULASI FINANSIAL
      </h1>
      <router-link to="/"
        class="pointer-events-auto font-pixel text-xs md:text-sm bg-primary text-accent px-6 py-3 border-[4px] border-accent shadow-[4px_4px_0_0_#2C3E50] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase">
        ← KEMBALI
      </router-link>
    </div>

    <img :src="currentBackground" alt="Background Game"
      class="absolute inset-0 w-full h-full object-fill transition-all duration-500"
      :class="{ 'blur-md brightness-50': gameState === 'dialog' || gameState === 'intro' }" />

    <div v-if="gameState === 'intro'"
      class="absolute inset-0 z-40 flex items-center justify-center p-6 md:p-10 backdrop-blur-sm bg-black/20">
      <div
        class="bg-primary border-[6px] border-accent p-8 md:p-14 shadow-[16px_16px_0_0_#2C3E50] max-w-2xl w-full flex flex-col items-center gap-8 animate-[bounce_0.5s_ease-out]">
        <h2 class="font-pixel text-4xl md:text-5xl text-accent uppercase tracking-widest text-center">
          ID REGISTRATION
        </h2>
        <p class="font-main text-lg md:text-xl font-bold text-accent text-center opacity-80 leading-snug px-4">
          Masukkan nama lengkapmu untuk diterbitkan di sertifikat penyelesaian misi.
        </p>
        <input v-model="fullName" @keyup.enter="submitName" type="text" placeholder="Ketik nama lengkap..."
          class="w-full font-main font-black text-xl md:text-2xl p-4 md:p-5 border-[4px] border-accent bg-white text-accent outline-none focus:shadow-[6px_6px_0_0_#2C3E50] transition-shadow" />
        <button @click="submitName"
          class="font-pixel w-full mt-2 bg-accent text-primary px-8 py-5 md:py-6 border-[4px] border-accent hover:bg-primary hover:text-accent hover:shadow-[6px_6px_0_0_#2C3E50] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none text-xl md:text-2xl uppercase tracking-widest">
          START GAME
        </button>
      </div>
    </div>

    <div v-if="gameState === 'intro' || gameState === 'explore' || gameState === 'moving'"
      class="absolute inset-0 z-20 transition-all duration-500"
      :class="{ 'blur-md brightness-50 pointer-events-none': gameState === 'intro' }">

      <div v-if="gameState === 'explore'"
        class="absolute top-24 left-1/2 -translate-x-1/2 font-pixel text-xs md:text-sm bg-primary px-6 py-3 border-[4px] border-accent text-center animate-pulse shadow-[4px_4px_0_0_#2C3E50]">
        {{ currentChapter === 3 ? 'Klik Dompet untuk berinteraksi!' : 'Klik Karakter untuk berinteraksi!' }}
      </div>

      <img :src="gameState === 'moving' ? '/MC_Char_jalan.gif' : '/MC_Char_Diam_Angin.gif'" alt="MC"
        class="absolute pixelated transition-all ease-linear" :class="[
          // === REVISI UKURAN & POSISI MC ===
          // w-72 md:w-96 untuk membesarkan karakter.
          // bottom-0 md:bottom-[2%] agar kakinya turun menapak lantai.
          currentChapter === 3 ? 'w-88 md:w-112 bottom-0 md:bottom-[0%]' :
            currentChapter === 2 ? 'w-48 md:w-64 bottom-[10%]' :
              'w-32 md:w-48 bottom-[10%]'
        ]" style="transition-duration: 3000ms;" :style="{ left: mcLeftPos + '%' }" />

      <img :src="currentNpc" alt="NPC" @click="startInteraction" class="absolute pixelated" :class="[
        // === REVISI UKURAN & POSISI DOMPET ===
        // w-20 md:w-28 untuk membesarkan dompet.
        // bottom-[30%] md:bottom-[32%] untuk menaikkannya ke atas meja.
        // right-[18%] md:right-[20%] untuk menyesuaikan letak di meja.
        currentChapter === 3 ? 'bottom-[30%] md:bottom-[36%] right-[18%] md:right-[14%] w-40 md:w-48' : 'bottom-[10%] right-[20%]',
        currentChapter === 2 ? 'w-48 md:w-64' : (currentChapter === 1 ? 'w-32 md:w-48' : ''),
        gameState === 'explore' ? 'cursor-pointer hover:scale-110 hover:-translate-y-4 transition-transform' : ''
      ]" />

      <div v-if="gameState === 'explore'"
        class="absolute text-4xl md:text-5xl font-pixel animate-bounce pointer-events-none text-white drop-shadow-[4px_4px_0_#2C3E50]"
        :class="currentChapter === 3 ? 'bottom-[50%] md:bottom-[56%] right-[22%] md:right-[17%]' : 'bottom-[35%] md:bottom-[40%] right-[24%]'">
        ▼
      </div>
    </div>

    <div v-if="gameState === 'dialog' && currentDialog" class="absolute inset-0 z-20">

      <img v-if="currentDialog.speaker === 'mc'" :src="'/MC_Char.png'"
        class="absolute bottom-[200px] md:bottom-[250px] left-4 md:left-20 w-56 md:w-80 pixelated " />

      <img v-if="currentDialog.speaker === 'npc'" :src="currentNpc"
        class="absolute bottom-[200px] md:bottom-[250px] right-4 md:right-20 pixelated"
        :class="currentChapter === 3 ? 'w-32 md:w-48' : 'w-56 md:w-80'" />

      <div
        class="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-24 md:right-24 bg-primary border-[6px] border-accent p-6 md:p-10 shadow-[16px_16px_0_0_rgba(44,62,80,0.8)]">

        <div
          class="absolute -top-6 md:-top-8 border-[4px] border-accent bg-accent text-primary px-6 py-2 font-pixel uppercase tracking-widest text-sm md:text-base shadow-[4px_4px_0_0_#E6DCC8]"
          :class="currentDialog.speaker === 'mc' ? 'left-6 md:left-10' : 'right-6 md:right-10'">
          {{ currentDialog.name }}
        </div>

        <div v-if="!currentDialog.isChoice" class="mt-4 flex flex-col min-h-[120px] justify-between">
          <p class="font-main text-xl md:text-3xl font-black leading-relaxed text-accent"
            :class="{ 'italic opacity-90': currentChapter === 3 }">
            "{{ currentDialog.text }}"
          </p>

          <button @click="nextDialog()"
            class="self-end mt-8 font-pixel bg-accent text-primary px-8 py-4 border-[4px] border-accent hover:bg-primary hover:text-accent hover:shadow-[6px_6px_0_0_#2C3E50] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none text-sm md:text-base">
            > Lanjut
          </button>
        </div>

        <div v-else class="mt-4 flex flex-col gap-4">
          <button v-for="(choice, index) in currentDialog.choices" :key="index" @click="nextDialog(choice.nextId)"
            class="w-full text-left font-main font-black text-xl md:text-2xl p-4 md:p-6 border-[4px] border-accent bg-white text-accent hover:bg-accent hover:text-primary shadow-[6px_6px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group">
            {{ choice.text }}
          </button>
        </div>

      </div>
    </div>

    <div
      class="absolute inset-0 z-[60] bg-accent border-b-[24px] border-primary flex flex-col items-center justify-center transition-transform duration-700 ease-in-out shadow-[0_20px_0_0_rgba(0,0,0,0.5)] pointer-events-none"
      :class="isChapterTransitioning ? 'translate-y-0' : '-translate-y-[120%]'">
      <div class="flex flex-col items-center gap-6">
        <h2
          class="font-pixel text-5xl md:text-7xl text-primary uppercase tracking-widest drop-shadow-[6px_6px_0_#2C3E50] animate-pulse">
          {{ transitionText }}
        </h2>
        <div class="w-48 h-6 bg-primary border-[4px] border-primary overflow-hidden">
          <div class="h-full bg-white animate-[pulse_0.5s_infinite] w-full origin-left"></div>
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
</style>