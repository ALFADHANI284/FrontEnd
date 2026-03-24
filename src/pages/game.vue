<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

import { useSession } from '../composables/useSession'
const { sessionId, initSession, finishChapter } = useSession()
import { useCertificate } from '../composables/useCertificate'
const { generateCertificate, status, certId } = useCertificate()
import { useVerify } from '../composables/useVerify'
const { certificate, verify } = useVerify()

import CertificateReceipt from '../components/CertificateReceipt.vue'
const showReceipt = ref(false)

const router = useRouter()

// === PENGAMAN PROGRESS (MODAL CUSTOM) ===
const showExitModal = ref(false)
const pendingRoute = ref<any>(null)
const isConfirmedExit = ref(false)

onBeforeRouteLeave((to, from, next) => {
  if (gameState.value === 'intro' || isConfirmedExit.value) {
    next()
  } else {
    showExitModal.value = true
    pendingRoute.value = to
    next(false)
  }
})

const confirmExit = () => {
  isConfirmedExit.value = true
  showExitModal.value = false
  if (pendingRoute.value) router.push(pendingRoute.value)
}

const cancelExit = () => {
  showExitModal.value = false
  pendingRoute.value = null
}

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (gameState.value !== 'intro') {
    event.preventDefault()
    event.returnValue = ''
  }
}

// === GAME STATE & CORE MANAGEMENT ===
const gameState = ref<'intro' | 'video' | 'explore' | 'moving' | 'dialog' | 'ending-video'>('intro')
const currentChapter = ref(1)
const isKamarScene = ref(false) // Sub-chapter untuk scene curi uang
const hasJoinedBodong = ref(false) // Memori melacak keputusan player
const endingType = ref<'good' | 'bad' | 'secret' | null>(null)
const showRestartMenu = ref(false)

const currentDialogIndex = ref(0)
const mcLeftPos = ref(10)

// === STATE ANIMASI TRANSISI CHAPTER ===
const isChapterTransitioning = ref(false)
const transitionText = ref('')

// === BGM MANAGEMENT (AUDIO ENGINE) ===
const bgms = {
  ch1: ref<HTMLAudioElement | null>(null),
  ch2p1: ref<HTMLAudioElement | null>(null),
  ch2p2: ref<HTMLAudioElement | null>(null),
  ch3: ref<HTMLAudioElement | null>(null),
}

// Inisialisasi Audio saat halaman dimuat
onMounted(() => {
  bgms.ch1.value = new Audio('/bgm-chapter-1.mp3');
  bgms.ch1.value.loop = true;

  // Ini yang lorong sekolah (tanpa bgm- sesuai nama filemu)
  bgms.ch2p1.value = new Audio('/bgm-chapter-2-part-1.mp3');
  bgms.ch2p1.value.loop = true;

  // KITA KEMBALIKAN AWALAN "bgm-" UNTUK YANG INI:
  bgms.ch2p2.value = new Audio('/bgm-chapter-2-part-2.mp3');
  bgms.ch2p2.value.loop = true;

  bgms.ch3.value = new Audio('/bgm-chapter-3.mp3');
  bgms.ch3.value.loop = true;

  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  Object.values(bgms).forEach(audioRef => {
    if (audioRef.value) audioRef.value.pause()
  })
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

const fadeAudioIn = (audio: HTMLAudioElement, targetVolume = 0.5, duration = 2000) => {
  audio.volume = 0
  audio.play().catch(e => console.log('Autoplay dicegah:', e))
  const step = targetVolume / (duration / 50)
  const fade = setInterval(() => {
    if (audio.volume + step < targetVolume) audio.volume += step
    else { audio.volume = targetVolume; clearInterval(fade) }
  }, 50)
}

const fadeAudioOut = (audio: HTMLAudioElement, duration = 1000) => {
  if (audio.paused) return
  const step = audio.volume / (duration / 50)
  const fade = setInterval(() => {
    if (audio.volume - step > 0) audio.volume -= step
    else { audio.volume = 0; audio.pause(); clearInterval(fade) }
  }, 50)
}

const getActiveBgmKey = () => {
  if (gameState.value !== 'explore' && gameState.value !== 'moving' && gameState.value !== 'dialog') return null
  if (currentChapter.value === 1) return 'ch1'
  if (currentChapter.value === 2 && !isKamarScene.value) return 'ch2p1'
  if (currentChapter.value === 2 && isKamarScene.value) return 'ch2p2'
  if (currentChapter.value === 3) return 'ch3'
  return null
}

watch([gameState, currentChapter, isKamarScene], () => {
  const activeKey = getActiveBgmKey()
  Object.entries(bgms).forEach(([key, audioRef]) => {
    const audio = audioRef.value
    if (!audio) return
    if (key === activeKey) {
      if (audio.paused) fadeAudioIn(audio, 0.4, 2000)
    } else {
      if (!audio.paused) fadeAudioOut(audio, 1000)
    }
  })
})

// Status pembuatan sertifikat
const loadingCert = ref(false)

// Pantau proses pembuatan sertifikat
watch(status, async (s) => {
  if (s === 'done' && certId.value) {
    await verify(certId.value)
    showReceipt.value = true
    loadingCert.value = false
  }
})

async function handleGetCertificate() {
  if (certId.value && status.value === 'done') {
    showReceipt.value = true
    loadingCert.value = false
    return
  }

  loadingCert.value = true
  await generateCertificate(sessionId.value!)
}

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

  // Inisialisasi sesi ke backend
  ;(async () => {
    await initSession({ course_id: 'Permainan Finansial Fundivest', name: fullName.value })
  })()

  // Memulai Chapter 1
  currentChapter.value = 1
  isChapterTransitioning.value = true
  transitionText.value = 'CHAPTER 1'

  setTimeout(() => {
    gameState.value = 'video' // Chapter 1 HANYA VIDEO
    setTimeout(() => {
      isChapterTransitioning.value = false
    }, 1000)
  }, 800)
}

// === DINAMISASI ASSETS BERDASARKAN CHAPTER ===
const currentBackground = computed(() => {
  if (currentChapter.value === 1) return '/background-rumah.png'
  if (currentChapter.value === 2) return isKamarScene.value ? '/background-kamar.png' : '/background-sekolah.png'
  return '/background-kota.png'
})

const currentNpc = computed(() => {
  if (currentChapter.value === 2) return isKamarScene.value ? '/Dompet Kamara.gif' : '/Teman_Char2.gif'
  return '/Kakek_Char2.gif'
})

// === LOGIKA VIDEO ===
const currentVideo = computed(() => {
  if (gameState.value === 'ending-video') {
    if (endingType.value === 'good') return '/ending-good.mp4'
    if (endingType.value === 'bad') return '/ending-bad.mp4'
    return '/ending-secret.mp4'
  }
  if (currentChapter.value === 1) return '/prolog-chapter-1.mp4'
  if (currentChapter.value === 2) return '/prolog-chapter-2.mp4'
  return '/prolog-chapter-3.mp4'
})

// ALUR SETELAH VIDEO SELESAI
const onVideoEnded = () => {
  if (gameState.value === 'ending-video') {
    showRestartMenu.value = true
  } else if (currentChapter.value === 1) {
    // Kirim progress chapter ke backend
    // As of right frontend akan fire-and-forget
    // agar tidak memblokir alur game terlalu lama.
    // Karena sudah menamatkan chapter 1 maka
    // finishChapter(1)
    ;(async () => {
      await finishChapter(1)
    })()   
    
    // Jika Video Chapter 1 tamat, langsung transisi ke Chapter 2 (Tidak ada mode explore di Ch1)
    triggerNextChapter(2)
  } else {
    // Masuk ke game untuk Chapter 2 & 3
    gameState.value = 'explore'
  }
}

const skipVideo = () => {
  if (gameState.value === 'ending-video') {
    showRestartMenu.value = true
  } else if (currentChapter.value === 1) {
    // Kirim progress chapter ke backend
    ;(async () => {
      await finishChapter(1)
    })()
    
    triggerNextChapter(2) // Skip Ch1 langsung menuju Ch2
  } else {
    gameState.value = 'explore'
  }
}

const restartGame = () => {
  window.location.reload()
}

// === TEKS NARASI KIRI ATAS ===
const currentNarrative = computed(() => {
  if (currentChapter.value === 2) {
    return isKamarScene.value
      ? `Keserakahan mulai membutakan. ${firstName.value} diam-diam menyelinap ke kamar orang tuanya demi mengambil modal.`
      : `Sesampainya di lorong sekolah, ${firstName.value} menemui Dimas yang sedang gencar mempromosikan saham gaibnya.`
  }

  // CHAPTER 3: Narasi dinamis berdasarkan jalur yang dipilih
  return hasJoinedBodong.value
    ? `Sambil mendekap erat uang tabungan keluarga dengan perasaan was-was, langkah buru-buru ${firstName.value} mendadak terhenti oleh rintihan di pinggir jalan...`
    : `Dengan hati tenang karena terhindar dari investasi bodong, sore itu langkah ${firstName.value} terhenti oleh rintihan seorang kakek tua...`
})

// === STRUKTUR DIALOG & CERITA ===
interface Choice {
  text: string;
  action?: 'join-bodong' | 'reject-bodong' | 'good-end' | 'bad-end' | 'secret-end';
  nextId?: number;
}

interface Dialog {
  speaker: 'mc' | 'npc';
  name: string;
  text: string;
  isChoice: boolean;
  choices?: Choice[];
  nextChapter?: number;
  nextId?: number; // <-- Tambahan untuk merge dialog
}

const chapter2Dialogs = computed<Dialog[]>(() => [
  // Index 0: Sapaan awal
  {
    speaker: 'mc', name: firstName.value, text: '', isChoice: true, choices: [
      { text: '> "Woi Dim! Sibuk amat tuh mata nempel di layar HP, liatin apaan sih?"', nextId: 1 },
      { text: '> "Eh Dim, kebetulan ketemu. Gue kepikiran soal omongan lo yang kemarin nih."', nextId: 2 }
    ]
  },
  // Index 1 (Opsi A) -> Lanjut ke 3
  { speaker: 'mc', name: firstName.value, text: 'Woi Dim! Sibuk amat tuh mata nempel di layar HP, liatin apaan sih?', isChoice: false, nextId: 3 },
  // Index 2 (Opsi B) -> Lanjut ke 3
  { speaker: 'mc', name: firstName.value, text: 'Eh Dim, kebetulan ketemu. Gue kepikiran soal omongan lo yang kemarin nih.', isChoice: false, nextId: 3 },

  // Index 3: Respons Dimas 1
  { speaker: 'npc', name: 'Dimas', text: 'Eh, elo bro! Ini nih, gue lagi mantau grafik. Hijau semua, cuan deres! Gimana, lo udah mikir-mikir soal ajakan gue kemarin?', isChoice: false },

  // Index 4: Pilihan Merespons Ajakan
  {
    speaker: 'mc', name: firstName.value, text: '', isChoice: true, choices: [
      { text: '> "Wah, beneran bisa cepet untung tuh? Sistemnya gimana emang?"', nextId: 5 },
      { text: '> "Emang aman, Dim? Gue denger banyak yang bodong kalau nawarin untung cepet."', nextId: 6 }
    ]
  },
  // Index 5 (Opsi A) -> Lanjut ke 7
  { speaker: 'mc', name: firstName.value, text: 'Wah, beneran bisa cepet untung tuh? Sistemnya gimana emang?', isChoice: false, nextId: 7 },
  // Index 6 (Opsi B) -> Lanjut ke 7
  { speaker: 'mc', name: firstName.value, text: 'Emang aman, Dim? Gue denger-denger banyak yang bodong kalau nawarin untung cepet gitu.', isChoice: false, nextId: 7 },

  // Index 7: Respons Dimas 2
  { speaker: 'npc', name: 'Dimas', text: 'Aman lah! Ini gue ada "kenalan" orang dalam. Tapi slotnya terbatas bro, kita harus masukin modal bareng-bareng hari ini. Minimal setorannya 10 juta.', isChoice: false },

  // Index 8: Pilihan Reaksi Nominal
  {
    speaker: 'mc', name: firstName.value, text: '', isChoice: true, choices: [
      { text: '> "Buset, 10 juta?! Duit dari mana gue anak sekolahan begini?!"', nextId: 9 },
      { text: '> "Gede juga ya modal awalnya... Pasti balik modal kan itu?"', nextId: 10 }
    ]
  },
  // Index 9 (Opsi A) -> Lanjut ke 11
  { speaker: 'mc', name: firstName.value, text: 'Buset, 10 juta?! Duit dari mana gue anak sekolahan begini?!', isChoice: false, nextId: 11 },
  // Index 10 (Opsi B) -> Lanjut ke 11
  { speaker: 'mc', name: firstName.value, text: 'Gede juga ya modal awalnya... Pasti balik modal kan itu?', isChoice: false, nextId: 11 },

  // Index 11: Respons Dimas 3
  { speaker: 'npc', name: 'Dimas', text: 'Ya elah, anggap aja ini jalan pintas buat masa depan lo. Pinjem siapa kek dulu, minggu depan pas profitnya cair, lo balikin utuh plus lo dapet untungnya! Deal ya?', isChoice: false },

  // Index 12: BRANCHING UTAMA
  {
    speaker: 'mc', name: firstName.value, text: '', isChoice: true, choices: [
      { text: '> (Terima) "Oke, gue ikut. Tapi beri gue waktu, gue mau ambil tabungan Bapak di rumah..."', action: 'join-bodong' },
      { text: '> (Tolak) "Sori Dim, duit 10 juta gede banget. Gue mending nabung pelan-pelan aja deh yang legal."', action: 'reject-bodong' }
    ]
  }
])

const kamarDialogs = computed<Dialog[]>(() => [
  // Index 0: Observasi awal
  { speaker: 'mc', name: `Pikiran ${firstName.value}`, text: 'Kondisi aman... Bapak sama Ibu belum pulang kerja. Amplop cokelat tebal itu beneran masih ada di meja.', isChoice: false },

  // Index 1: Pergolakan batin
  { speaker: 'mc', name: `Pikiran ${firstName.value}`, text: 'Gila, tanganku sampai gemetar. Ini kan uang tabungan pribadi keluarga. Kalau ketahuan hilang, Bapak dan Ibu pasti hancur banget.', isChoice: false },

  // Index 2: Pilihan rasa (Flavor text - rasionalisasi)
  {
    speaker: 'mc', name: firstName.value, text: '', isChoice: true, choices: [
      { text: '> "Tapi kata Dimas besok cair 30 juta. Aku bisa kembalikan utuh 10 jutanya sebelum Bapak sadar..."', nextId: 3 },
      { text: '> "Duh, dosa nggak ya? Ah, ini kan niatnya investasi. Nanti untungnya bisa buat bantu keluarga juga!"', nextId: 4 }
    ]
  },

  // Index 3 (Opsi A) -> Lanjut ke 5
  { speaker: 'mc', name: `Pikiran ${firstName.value}`, text: 'Tapi kata Dimas besok cair 30 juta. Aku bisa kembalikan utuh 10 jutanya sebelum Bapak sadar uangnya dipinjam.', isChoice: false, nextId: 5 },

  // Index 4 (Opsi B) -> Lanjut ke 5
  { speaker: 'mc', name: `Pikiran ${firstName.value}`, text: 'Duh, dosa nggak ya? Ah, ini kan niatnya investasi. Nanti untungnya bisa buat bantu keluarga juga!', isChoice: false, nextId: 5 },

  // Index 5: Keputusan bulat & pindah chapter
  { speaker: 'mc', name: `Pikiran ${firstName.value}`, text: 'Maafkan aku ya, Pak. Aku cuma pinjam semalam kok. Besok pasti kembali lipat ganda! Bismillah, bismillah...', isChoice: false, nextChapter: 3 }
])

const chapter3Dialogs = computed<Dialog[]>(() => [
  // Index 0: Permintaan Kakek
  { speaker: 'npc', name: 'Kakek Tua', text: 'Tolong kakek, Nak... Sudah berhari-hari kakek tidak makan. Tubuh kakek gemetar dan sakit sekali... rasanya pandangan kakek sudah mulai gelap...', isChoice: false },

  // Index 1: Reaksi awal MC
  { speaker: 'mc', name: `Pikiran ${firstName.value}`, text: 'Astaga... Kasihan sekali kakek ini, wajahnya pucat banget dan napasnya berat...', isChoice: false },

  // Index 2: Monolog Batin Dinamis (Menentukan tingkat stres pemain)
  {
    speaker: 'mc',
    name: `Pikiran ${firstName.value}`,
    text: hasJoinedBodong.value
      ? 'Gimana ini?! Uang di tasku ini pas 10 juta tabungan keluarga. Kalau aku kasih ke kakek ini walau selembar, setoran ke Dimas batal dan aku nggak bisa balikin uang Bapak besok! Keluargaku bisa hancur! Tapi... kakek ini sekarat...'
      : 'Syukurlah aku nggak jadi ikut investasi gaib si Dimas. Aku bawa sisa uang tabunganku sendiri. Kakek ini darurat banget kondisinya...',
    isChoice: false
  },

  // Index 3: Pilihan Percabangan Ekstrem
  {
    speaker: 'mc', name: firstName.value, text: '', isChoice: true, choices: hasJoinedBodong.value ? [
      // KONDISI 1: Pemain IKUT Investasi Bodong (Uang Curian) - 3 PILIHAN DILEMA
      {
        text: '> "Maaf Kek, sungguh saya gak bisa!" (Uang ini penentu nasib! Kalau gak kujadikan 30 juta hari ini, masa depan keluargaku yang hancur. Maafin aku, Kek!)',
        action: 'bad-end'
      },
      {
        text: '> "Minggir, Kek. Saya lagi buru-buru!" (Waktu adalah uang. Kalau telat nyetor ke Dimas, slot profit 30 juta keburu diambil orang lain!)',
        action: 'bad-end'
      },
      {
        text: '> "Ini Kek..." (Persetan dengan investasi Dimas! Aku siap dimarahi Bapak habis-habisan karena tabungan keluarga berkurang, yang penting nyawa kakek ini selamat.)',
        action: 'secret-end'
      },
    ] : [
      // KONDISI 2: Pemain MENOLAK Investasi Bodong (Uang Halal/Aman)
      {
        text: '> "Ini Kek, beli makan yang enak ya. Kakek jauh lebih butuh uang ini daripada aku."',
        action: 'good-end'
      }
    ]
  }
])

const currentDialogList = computed(() => {
  if (currentChapter.value === 2) return isKamarScene.value ? kamarDialogs.value : chapter2Dialogs.value
  return chapter3Dialogs.value
})

const currentDialog = computed(() => currentDialogList.value[currentDialogIndex.value])

// === FUNGSI KONTROL NAVIGASI ===
const startInteraction = () => {
  if (gameState.value !== 'explore') return

  gameState.value = 'moving'
  if (currentChapter.value === 2 && isKamarScene.value) mcLeftPos.value = 65 // Dekati dompet
  else if (currentChapter.value === 2) mcLeftPos.value = 45 // Dekati Dimas
  else mcLeftPos.value = 45 // Dekati Kakek

  setTimeout(() => {
    gameState.value = 'dialog'
    currentDialogIndex.value = 0
  }, 3000)
}

const triggerNextChapter = (nextChapNum: number) => {
  isChapterTransitioning.value = true
  transitionText.value = `CHAPTER ${nextChapNum}`

  setTimeout(() => {
    currentChapter.value = nextChapNum
    isKamarScene.value = false
    gameState.value = 'video'
    currentDialogIndex.value = 0
    mcLeftPos.value = 10

    setTimeout(() => { isChapterTransitioning.value = false }, 1000)
  }, 800)
}

const triggerEnding = (type: 'good' | 'bad' | 'secret') => {
  ;(async () => {
    await finishChapter(3)
  })()
  
  endingType.value = type
  gameState.value = 'ending-video'
}

const nextDialog = (choice?: Choice) => {
  // Evaluasi Pilihan (Branching Action)
  if (choice) {
    if (choice.action === 'join-bodong') {
      hasJoinedBodong.value = true
      isKamarScene.value = true
      gameState.value = 'explore' // Kembali explore untuk klik dompet
      currentDialogIndex.value = 0
      mcLeftPos.value = 10
      return
    }
    if (choice.action === 'reject-bodong') {
      hasJoinedBodong.value = false
      
      ;(async () => {
        await finishChapter(2)
      })()
      
      triggerNextChapter(3)
      return
    }
    if (choice.action === 'good-end') return triggerEnding('good')
    if (choice.action === 'bad-end') return triggerEnding('bad')
    if (choice.action === 'secret-end') return triggerEnding('secret')
  }

  // Cek pindah chapter (Dialog yang punya nextChapter)
  if (currentDialog.value?.nextChapter) {
    ;(async () => {
      await finishChapter(2)
    })()
    
    triggerNextChapter(currentDialog.value.nextChapter)
    return
  }

  // --- LOGIKA YANG TERLEWAT: Loncatan Merge Path ---
  // Jika ini BUKAN pilihan (tombol Lanjut biasa), TAPI dialog tersebut punya nextId
  if (!choice && currentDialog.value?.nextId !== undefined) {
    currentDialogIndex.value = currentDialog.value.nextId;
    return;
  }
  // -------------------------------------------------

  // Eksekusi pindah index berdasarkan pilihan yang diklik
  if (choice && choice.nextId !== undefined) {
    currentDialogIndex.value = choice.nextId
  } else {
    // Increment default kalau tidak ada kondisi lompat sama sekali
    currentDialogIndex.value++
  }
}
</script>

<template>
  <div class="relative w-full h-screen bg-accent overflow-hidden font-main selection:bg-primary selection:text-accent">

    <div class="absolute top-0 left-0 right-0 p-3 lg:p-10 flex justify-between items-start z-30 pointer-events-none">
      <div class="flex flex-col items-start gap-1 lg:gap-2">
        <h1
          class="font-pixel text-lg lg:text-4xl text-white drop-shadow-[2px_2px_0_#2C3E50] lg:drop-shadow-[4px_4px_0_#2C3E50] tracking-widest uppercase mt-1 lg:mt-2">
          SIMULASI FINANSIAL
        </h1>
        <div v-if="gameState !== 'intro' && gameState !== 'video' && gameState !== 'ending-video'"
          class="font-main font-bold text-[8px] lg:text-sm bg-primary text-accent px-3 py-2 lg:px-4 lg:py-3 border-[2px] lg:border-[4px] border-accent shadow-[2px_2px_0_0_#2C3E50] lg:shadow-[4px_4px_0_0_#2C3E50] animate-[fade-in_0.5s_ease-out] max-w-[200px] lg:max-w-md leading-relaxed text-left pointer-events-auto">
          {{ currentNarrative }}
        </div>
      </div>

      <router-link to="/" v-if="gameState !== 'ending-video'"
        class="pointer-events-auto font-pixel text-[10px] lg:text-sm bg-primary text-accent px-3 py-2 lg:px-6 lg:py-3 border-[2px] lg:border-[4px] border-accent shadow-[2px_2px_0_0_#2C3E50] lg:shadow-[4px_4px_0_0_#2C3E50] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase">
        ← KEMBALI
      </router-link>
    </div>

    <img :src="currentBackground" alt="Background Game"
      class="absolute inset-0 w-full h-full object-fill transition-all duration-500"
      :class="{ 'blur-sm lg:blur-md brightness-50': gameState === 'dialog' || gameState === 'intro' || gameState === 'video' || gameState === 'ending-video' }" />

    <div v-if="gameState === 'intro'"
      class="absolute inset-0 z-40 flex items-center justify-center p-4 lg:p-10 backdrop-blur-sm bg-black/20">
      <div
        class="bg-primary border-[4px] lg:border-[6px] border-accent p-4 lg:p-14 shadow-[6px_6px_0_0_#2C3E50] lg:shadow-[16px_16px_0_0_#2C3E50] max-w-[95%] lg:max-w-2xl w-full flex flex-col items-center gap-3 lg:gap-8 animate-[bounce_0.5s_ease-out]">
        <h2 class="font-pixel text-2xl lg:text-5xl text-accent uppercase tracking-widest text-center leading-tight">ID
          REGISTRATION</h2>
        <p class="font-main text-xs lg:text-xl font-bold text-accent text-center opacity-80 leading-snug px-2 lg:px-4">
          Masukkan nama lengkapmu untuk diterbitkan di sertifikat penyelesaian misi.
        </p>
        <input v-model="fullName" @keyup.enter="submitName" type="text" placeholder="Ketik nama lengkap..."
          class="w-full font-main font-black text-sm lg:text-2xl p-2 lg:p-5 border-[3px] lg:border-[4px] border-accent bg-white text-accent outline-none focus:shadow-[4px_4px_0_0_#2C3E50] lg:focus:shadow-[6px_6px_0_0_#2C3E50] transition-shadow" />
        <button @click="submitName"
          class="font-pixel w-full mt-1 lg:mt-2 bg-accent text-primary px-4 py-3 lg:px-8 lg:py-6 border-[3px] lg:border-[4px] border-accent hover:bg-primary hover:text-accent hover:shadow-[4px_4px_0_0_#2C3E50] lg:hover:shadow-[6px_6px_0_0_#2C3E50] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none text-base lg:text-2xl uppercase tracking-widest">
          START GAME
        </button>
      </div>
    </div>

    <div v-if="gameState === 'video'"
      class="absolute inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <video :src="currentVideo" autoplay playsinline @ended="onVideoEnded"
        class="w-full h-full max-w-5xl object-contain shadow-[0_0_30px_rgba(0,0,0,0.8)]"></video>
      <button @click="skipVideo"
        class="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 font-pixel text-[10px] lg:text-sm bg-accent text-primary px-4 py-2 lg:px-6 lg:py-3 border-[2px] lg:border-[4px] border-accent shadow-[2px_2px_0_0_#E6DCC8] lg:shadow-[4px_4px_0_0_#E6DCC8] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase z-50">
        Skip Video >>
      </button>
    </div>

    <div v-if="gameState === 'ending-video'" class="absolute inset-0 z-50 flex items-center justify-center bg-black/95">
      <video :src="currentVideo" autoplay playsinline @ended="onVideoEnded"
        class="w-full h-full max-w-5xl object-contain"></video>

      <button v-if="!showRestartMenu" @click="skipVideo"
        class="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 font-pixel text-[10px] lg:text-sm bg-accent text-primary px-4 py-2 lg:px-6 lg:py-3 border-[2px] lg:border-[4px] border-accent shadow-[2px_2px_0_0_#E6DCC8] lg:shadow-[4px_4px_0_0_#E6DCC8] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase z-50">
        Skip Ending >>
      </button>

      <div v-if="showRestartMenu"
        class="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6 animate-[fade-in_1s_ease-out]">
        <h1 class="font-pixel text-4xl lg:text-7xl tracking-widest uppercase drop-shadow-[4px_4px_0_#2C3E50]"
          :class="endingType === 'good' ? 'text-[#F1C40F]' : endingType === 'bad' ? 'text-[#E74C3C]' : 'text-[#9B59B6]'">
          {{ endingType }} ENDING
        </h1>
        <button @click="restartGame"
          class="font-pixel mt-4 bg-primary text-accent px-8 py-4 lg:px-12 lg:py-6 border-[4px] lg:border-[6px] border-accent shadow-[6px_6px_0_0_#2C3E50] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xl lg:text-3xl uppercase tracking-widest">
          MAIN LAGI ↻
        </button>
        <button
          @click="handleGetCertificate"
          :disabled="loadingCert"
          class="font-pixel mt-4 bg-primary text-accent px-8 py-4 lg:px-12 lg:py-6 border-[4px] lg:border-[6px] border-accent shadow-[6px_6px_0_0_#2C3E50] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xl lg:text-3xl uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[6px_6px_0_0_#2C3E50]">
          {{ loadingCert ? 'MEMPROSES...' : 'DAPATKAN SERTIFIKAT!' }}
        </button>
        <!-- STRUK SERTIFIKAT -->
        <CertificateReceipt
          v-if="showReceipt && certificate"
          :certificate="certificate"
          :cert-id="certId!"
          @close="showReceipt = false"
        />
      </div>
    </div>

    <div v-if="gameState === 'explore' || gameState === 'moving'"
      class="absolute inset-0 z-20 transition-all duration-500">
      <div v-if="gameState === 'explore'"
        class="absolute top-12 lg:top-24 left-1/2 -translate-x-1/2 font-pixel text-[10px] lg:text-sm bg-primary px-3 py-2 lg:px-6 lg:py-3 border-[2px] lg:border-[4px] border-accent text-center animate-pulse shadow-[2px_2px_0_0_#2C3E50] lg:shadow-[4px_4px_0_0_#2C3E50] whitespace-nowrap">
        {{ isKamarScene ? 'Klik Dompet untuk interaksi!' : 'Klik Karakter untuk interaksi!' }}
      </div>

      <img :src="gameState === 'moving' ? '/MC_Char_jalan.gif' : '/MC_Char_Diam_Angin.gif'" alt="MC"
        class="absolute pixelated transition-all ease-linear" :class="[
          currentChapter === 2 && isKamarScene ? 'w-36 lg:w-112 bottom-[5%] lg:bottom-[0%]' : 'w-24 lg:w-64 bottom-[15%] lg:bottom-[10%]'
        ]" style="transition-duration: 3000ms;" :style="{ left: mcLeftPos + '%' }" />

      <img v-if="currentNpc" :src="currentNpc" alt="NPC" @click="startInteraction" class="absolute pixelated" :class="[
        // Logika Posisi
        currentChapter === 2 && isKamarScene ? 'bottom-[35%] lg:bottom-[36%] right-[15%] lg:right-[14%] w-16 lg:w-48' : 'bottom-[15%] lg:bottom-[10%] right-[15%] lg:right-[20%]',

        // --- LOGIKA UKURAN YANG DISEMPURNAKAN ---
        // Jika di kamar (Dompet), pakai ukuran dompet.
        // Jika BUKAN di kamar (artinya Teman Ch2 ATAU Kakek Ch3), pakai w-24 lg:w-64 (SAMA DENGAN MC)
        currentChapter === 2 && isKamarScene ? '' : 'w-24 lg:w-64',
        // ------------------------------------------

        gameState === 'explore' ? 'cursor-pointer hover:scale-110 hover:-translate-y-2 lg:hover:-translate-y-4 transition-transform' : ''
      ]" />

      <div v-if="gameState === 'explore'"
        class="absolute text-2xl lg:text-5xl font-pixel animate-bounce pointer-events-none text-white drop-shadow-[2px_2px_0_#2C3E50] lg:drop-shadow-[4px_4px_0_#2C3E50]"
        :class="currentChapter === 2 && isKamarScene ? 'bottom-[48%] lg:bottom-[56%] right-[18%] lg:right-[17%]' : 'bottom-[40%] lg:bottom-[40%] right-[20%] lg:right-[24%]'">
        ▼
      </div>
    </div>

    <div v-if="gameState === 'dialog' && currentDialog" class="absolute inset-0 z-20">
      <img v-if="currentDialog.speaker === 'mc'" :src="'/MC_Char_Diam_Angin.gif'"
        class="absolute bottom-[5%] lg:bottom-[250px] left-2 lg:left-20 w-56 lg:w-80 pixelated drop-shadow-[0_10px_0_rgba(0,0,0,0.5)]" />
      <img v-if="currentDialog.speaker === 'npc' && currentNpc" :src="currentNpc"
        class="absolute bottom-[5%] lg:bottom-[250px] right-2 lg:right-20 pixelated drop-shadow-[0_10px_0_rgba(0,0,0,0.5)]"
        :class="[
          currentChapter === 2 && isKamarScene ? 'w-32 lg:w-48' : 'w-56 lg:w-80',
          // JIKA BUKAN DOMPET (KamarScene), BERARTI ITU MANUSIA (DIMAS/KAKEK) -> BALIK GAMBARNYA!
          !(currentChapter === 2 && isKamarScene) ? '-scale-x-100' : ''
        ]" />

      <div
        class="absolute bottom-2 left-2 right-2 lg:bottom-12 lg:left-24 lg:right-24 bg-primary border-[4px] lg:border-[6px] border-accent p-3 lg:p-10 shadow-[4px_4px_0_0_rgba(44,62,80,0.8)] lg:shadow-[16px_16px_0_0_rgba(44,62,80,0.8)]">
        <div
          class="absolute -top-5 lg:-top-8 border-[2px] lg:border-[4px] border-accent bg-accent text-primary px-4 py-1.5 lg:px-6 lg:py-2 font-pixel uppercase tracking-widest text-[10px] lg:text-base shadow-[2px_2px_0_0_#E6DCC8] lg:shadow-[4px_4px_0_0_#E6DCC8]"
          :class="currentDialog.speaker === 'mc' ? 'left-2 lg:left-10' : 'right-2 lg:right-10'">
          {{ currentDialog.name }}
        </div>

        <div class="max-h-[35vh] lg:max-h-none overflow-y-auto pr-2">
          <div v-if="!currentDialog.isChoice"
            class="mt-1 lg:mt-4 flex flex-col h-full lg:min-h-[120px] justify-between">
            <p class="font-main text-xs lg:text-3xl font-black leading-snug lg:leading-relaxed text-accent"
              :class="{ 'italic opacity-90': currentChapter === 2 && isKamarScene }">
              "{{ currentDialog.text }}"
            </p>
            <button @click="nextDialog()"
              class="self-end mt-2 lg:mt-8 font-pixel bg-accent text-primary px-3 py-2 lg:px-8 lg:py-4 border-[2px] lg:border-[4px] border-accent hover:bg-primary hover:text-accent hover:shadow-[2px_2px_0_0_#2C3E50] lg:hover:shadow-[6px_6px_0_0_#2C3E50] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none text-[8px] lg:text-base">
              > Lanjut
            </button>
          </div>

          <div v-else class="mt-1 lg:mt-4 flex flex-col gap-2 lg:gap-4">
            <button v-for="(choice, index) in currentDialog.choices" :key="index" @click="nextDialog(choice)"
              class="w-full text-left font-main font-black text-[10px] lg:text-2xl p-2 lg:p-6 border-[2px] lg:border-[4px] border-accent bg-white text-accent hover:bg-accent hover:text-primary shadow-[2px_2px_0_0_#2C3E50] lg:shadow-[6px_6px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group">
              {{ choice.text }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute inset-0 z-[60] bg-accent border-b-[12px] lg:border-b-[24px] border-primary flex flex-col items-center justify-center transition-transform duration-700 ease-in-out shadow-[0_10px_0_0_rgba(0,0,0,0.5)] pointer-events-none"
      :class="isChapterTransitioning ? 'translate-y-0' : '-translate-y-[120%]'">
      <div class="flex flex-col items-center gap-3 lg:gap-6">
        <h2
          class="font-pixel text-2xl lg:text-7xl text-primary uppercase tracking-widest drop-shadow-[2px_2px_0_#2C3E50] lg:drop-shadow-[6px_6px_0_#2C3E50] animate-pulse text-center px-4">
          {{ transitionText }}
        </h2>
        <div class="w-24 lg:w-48 h-3 lg:h-6 bg-primary border-[2px] lg:border-[4px] border-primary overflow-hidden">
          <div class="h-full bg-white animate-[pulse_0.5s_infinite] w-full origin-left"></div>
        </div>
      </div>
    </div>

    <div v-if="gameState !== 'intro' && gameState !== 'video' && gameState !== 'ending-video'"
      class="absolute bottom-2 left-2 lg:bottom-4 lg:left-4 z-30 pointer-events-none animate-[fade-in_1s_ease-out]">
      <p
        class="font-pixel text-[6px] lg:text-[10px] text-white/80 drop-shadow-[1px_1px_0_#2C3E50] tracking-widest uppercase">
        ♪ BGM Dibuat oleh Gemini AI
      </p>
    </div>

    <div v-if="showExitModal"
      class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 portrait:hidden">
      <div
        class="bg-primary border-[4px] lg:border-[6px] border-accent p-6 lg:p-10 shadow-[8px_8px_0_0_#2C3E50] lg:shadow-[16px_16px_0_0_#2C3E50] max-w-sm lg:max-w-lg w-full flex flex-col items-center gap-4 lg:gap-6 animate-[bounce_0.3s_ease-out]">
        <h2 class="font-pixel text-xl lg:text-3xl text-accent uppercase tracking-widest text-center leading-tight">
          PERINGATAN!</h2>
        <p class="font-main text-sm lg:text-xl font-bold text-accent text-center opacity-90 leading-snug">
          Progress game kamu akan hilang jika meninggalkan halaman ini sekarang. Yakin ingin keluar?
        </p>
        <div class="flex gap-3 lg:gap-6 w-full mt-2">
          <button @click="cancelExit"
            class="flex-1 font-pixel bg-white text-accent px-2 py-3 lg:py-4 border-[3px] lg:border-[4px] border-accent hover:bg-accent hover:text-primary shadow-[4px_4px_0_0_#2C3E50] lg:shadow-[6px_6px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-[10px] lg:text-base uppercase tracking-wider">
            TETAP MAIN
          </button>
          <button @click="confirmExit"
            class="flex-1 font-pixel bg-accent text-primary px-2 py-3 lg:py-4 border-[3px] lg:border-[4px] border-accent hover:bg-primary hover:text-accent shadow-[4px_4px_0_0_#2C3E50] lg:shadow-[6px_6px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-[10px] lg:text-base uppercase tracking-wider">
            KELUAR
          </button>
        </div>
      </div>
    </div>

    <div
      class="fixed inset-0 z-[999999] bg-accent border-[8px] lg:border-[16px] border-primary flex-col items-center justify-center p-6 lg:p-8 text-center hidden portrait:flex">
      <div class="text-white text-5xl lg:text-7xl mb-6 lg:mb-8 animate-[spin_2s_ease-in-out_infinite]">↻</div>
      <h2
        class="font-pixel text-2xl lg:text-5xl text-primary uppercase tracking-widest drop-shadow-[2px_2px_0_#2C3E50] lg:drop-shadow-[4px_4px_0_#2C3E50] mb-4 lg:mb-6">
        MODE LANDSCAPE</h2>
      <p
        class="font-main text-xs lg:text-xl font-bold text-white opacity-90 leading-snug max-w-xs lg:max-w-md border-[2px] lg:border-[4px] border-primary p-3 lg:p-4 bg-black/20">
        Silakan putar perangkat mobile Anda menjadi horizontal untuk pengalaman bermain yang lebih baik.
      </p>
    </div>

  </div>
</template>

<style scoped>
.pixelated {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>