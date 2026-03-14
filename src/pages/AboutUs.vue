<script setup>
import { ref } from 'vue'
import AOS from "aos";
import "aos/dist/aos.css";
import { onMounted, nextTick } from "vue";

onMounted(async () => {
  await nextTick();
  AOS.init({
    duration: 600,
    once: true,
    easing: "ease-out-back",
  });
});

// Data untuk Nilai & Prinsip
const coreValues = ref([
  { 
    title: 'Bermain & Belajar', 
    desc: 'Edukasi tidak harus membosankan. Kami menggabungkan mekanik interaktif dengan materi yang solid.'
  },
  { 
    title: 'Aksesibel', 
    desc: 'Semua orang berhak mendapatkan petualangan belajar yang seru di mana saja dan kapan saja.'
  },
  { 
    title: 'Kreativitas Tanpa Batas', 
    desc: 'Mendorong rasa ingin tahu lewat teka-teki dan interaksi visual yang menarik.'
  }
])

// Data untuk Statistik
const stats = ref([
  { label: 'Total Pemain', value: '5,234' },
  { label: 'Modul Selesai', value: '12' },
  { label: 'Quest Harian', value: '1,432' },
  { label: 'Konten Edukasi', value: '45+' }
])

// Data untuk Tim
const teamMembers = ref([
  { 
    name: 'Alfa', 
    role: 'Front-End Developer',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Alfa'
  },
  { 
    name: 'Ega', 
    role: 'Back-End Developer',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Beta'
  },
  { 
    name: 'Saladin', 
    role: 'Content Writer',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Gamma'
  },
  { 
    name: 'Rangga', 
    role: 'Presenter',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Delta'
  }
])

// Data untuk Timeline
const journey = ref([
  { year: '2023', event: 'FUNDIVEST Didirikan' },
  { year: '2024', event: '1000 Pengguna Pertama' },
  { year: '2025', event: 'Fitur Investasi Real-time' }
])
</script>

<template>
  <div class="bg-primary min-h-screen text-accent font-main selection:bg-accent selection:text-primary overflow-x-hidden">
    
    <Navbar />

    <main class="max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
      
      <!-- Hero Section -->
      <section class="text-center max-w-3xl mx-auto mb-32" data-aos="fade-down">
        <div class="bg-primary font-pixel text-[10px] px-6 py-2 border-[4px] border-accent mb-10 shadow-[6px_6px_0_0_#2C3E50] rotate-[-1.5deg] inline-block">
          STATUS: ABOUT PAGE
        </div>
        
        <h1 class="font-black text-6xl md:text-7xl leading-[0.85] tracking-tighter mb-10 uppercase text-accent">
          Tentang <br />
          <span class="italic underline decoration-[8px] decoration-accent underline-offset-8">FUNDIVEST</span>
        </h1>
        
        <p class="text-xl md:text-2xl font-bold leading-tight text-accent opacity-90">
          Platform edukasi finansial yang mengubah cara belajar investasi 
          menjadi pengalaman interaktif dan menyenangkan.
        </p>
      </section>

      <!-- Misi Section - Styling seperti "Apa itu Saham Bodong?" -->
      <section class="border-y-[4px] border-accent mb-32">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="p-16 border-b-[4px] md:border-b-0 md:border-r-[4px] border-accent"
               data-aos="fade-right">
            <h2 class="font-black text-4xl mb-6 uppercase tracking-tighter">
              Misi Kami
            </h2>
            <p class="text-xl font-bold leading-snug">
              Memberikan literasi keuangan yang mudah dipahami, interaktif, 
              dan dapat diakses oleh semua kalangan tanpa terkecuali.
            </p>
          </div>
          <div class="p-16 flex items-center bg-primary italic font-black text-3xl leading-tight text-accent"
               data-aos="fade-left">
            "Literasi keuangan adalah kunci masa depan yang lebih baik."
          </div>
        </div>
      </section>

      <!-- Statistik - Grid seperti di home -->
      <section class="mb-32">
        <h2 class="font-black text-4xl mb-16 text-center uppercase" data-aos="fade-up">
          Capaian Kami
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="(stat, index) in stats" :key="index" 
               class="bg-primary border-[4px] border-accent p-8 text-center shadow-[8px_8px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
               data-aos="zoom-in" :data-aos-delay="index * 100">
            <div class="text-4xl font-black text-accent mb-2">{{ stat.value }}</div>
            <div class="font-bold uppercase text-sm tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- Nilai & Prinsip - Styling seperti Red Flags -->
      <section class="mb-32">
        <h2 class="font-black text-4xl mb-16 text-center uppercase" data-aos="fade-up">
          Nilai & Prinsip
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border-[4px] border-accent shadow-[12px_12px_0_0_#2C3E50]"
             data-aos="fade-up">
          <div v-for="(value, index) in coreValues" :key="index"
               class="p-8 border-accent border-b-[4px] md:border-b-0 md:border-r-[4px] last:border-r-0 hover:bg-accent hover:text-primary transition-colors group">
            <h3 class="font-black text-2xl mb-4 uppercase group-hover:text-primary">{{ value.title }}</h3>
            <p class="font-bold opacity-80 group-hover:text-primary">{{ value.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Timeline Perjalanan -->
      <section class="mb-32">
        <h2 class="font-black text-4xl mb-16 text-center uppercase" data-aos="fade-up">
          Perjalanan Kami
        </h2>
        
        <div class="flex flex-col md:flex-row justify-between items-start gap-6 relative"
             data-aos="fade-up" data-aos-delay="200">
          <div v-for="(item, index) in journey" :key="index" 
               class="flex-1 w-full">
            <div class="bg-primary border-[4px] border-accent p-8 text-center shadow-[8px_8px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              <div class="font-black text-3xl text-accent mb-3">{{ item.year }}</div>
              <div class="font-bold text-lg">{{ item.event }}</div>
            </div>
            <!-- Panah penghubung (desktop only) -->
            <div v-if="index < journey.length - 1" 
                 class="hidden md:block absolute top-1/2 -right-3 text-3xl text-accent">→</div>
          </div>
        </div>
      </section>

      <!-- Tim Kami -->
      <section class="mb-32">
        <h2 class="font-black text-4xl mb-16 text-center uppercase" data-aos="fade-up">
          Tim Kami
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(member, index) in teamMembers" :key="index"
               class="text-center group cursor-pointer"
               data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="relative mb-4 inline-block">
              <div class="w-32 h-32 mx-auto bg-primary border-[4px] border-accent overflow-hidden shadow-[8px_8px_0_0_#2C3E50] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                <img :src="member.avatar" :alt="member.name" 
                     class="w-full h-full object-cover pixelated" />
              </div>
              <!-- Decorative corner (opsional, subtle) -->
              <div class="absolute -top-2 -right-2 w-4 h-4 bg-accent border-2 border-accent"></div>
            </div>
            <h3 class="font-black text-xl mb-1">{{ member.name }}</h3>
            <p class="font-bold text-sm opacity-80">{{ member.role }}</p>
          </div>
        </div>
      </section>

      <!-- Call to Action - Styling seperti GAME OVER section -->
      <section class="bg-accent text-primary py-20 border-y-[4px] border-accent -mx-6 px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="font-black text-4xl mb-6 tracking-tighter" data-aos="zoom-in">
            Siap Memulai Petualangan?
          </h2>
          <p class="text-xl font-bold mb-10 max-w-2xl mx-auto opacity-90" data-aos="fade-up">
            Bergabung dengan ribuan pemain lain dalam petualangan finansial.
          </p>
          <router-link to="/game"
             class="bg-primary text-accent text-2xl font-black px-12 py-6 border-[4px] border-accent shadow-[10px_10px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase inline-block"
             data-aos="fade-up" data-aos-delay="200">
            Mulai Sekarang →
          </router-link>
        </div>
      </section>

    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Font pixel untuk status badge - copy dari home */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-pixel {
  font-family: 'Press Start 2P', cursive;
}

/* Pixelated image rendering */
.pixelated {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

/* Selection styling - copy dari home */
::selection {
  background: #2c3e50;
  color: #e6dcc8;
}

/* Responsive */
@media (max-width: 768px) {
  .p-16 {
    padding: 3rem;
  }
  
  .text-7xl {
    font-size: 3.5rem;
  }
  
  .w-32 {
    width: 100px;
    height: 100px;
  }
}

/* Hover effects minimal */
.group:hover .group-hover\:text-primary {
  color: #e6dcc8;
}
</style>