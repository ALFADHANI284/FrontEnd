<script setup>
import { ref } from 'vue'
import AOS from "aos";
import "aos/dist/aos.css";
import { onMounted, nextTick } from "vue";
import Logo from "../assets/Logo.svg"

onMounted(async () => {
  await nextTick();
  AOS.init({
    duration: 600,
    once: true,
    easing: "ease-out-back",
  });
});

const coreValues = ref([
  { 
    icon: '',
    title: 'Bermain & Belajar', 
    desc: 'Edukasi tidak harus membosankan. Kami menggabungkan mekanik interaktif dengan materi yang solid.'
  },
  { 
    icon: '',
    title: 'Aksesibel', 
    desc: 'Semua orang berhak mendapatkan petualangan belajar yang seru di mana saja dan kapan saja.'
  },
  { 
    icon: '',
    title: 'Kreativitas Tanpa Batas', 
    desc: 'Mendorong rasa ingin tahu lewat teka-teki dan interaksi visual yang menarik.'
  }
])

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
    avatar: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Wyatt'
  },
  { 
    name: 'Rangga', 
    role: 'Presenter',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Delta'
  }
])

const journey = ref([
  { year: '2023', event: 'Ide FUNDIVEST Lahir', desc: 'Riset awal tentang masalah literasi keuangan di Indonesia.' },
  { year: '2024', event: 'Pengembangan Purwarupa Game', desc: 'Prototipe pertama simulasi mini-game investasi selesai dibangun.' },
  { year: '2025', event: 'Perilisan Modul Simulasi Pertama', desc: 'Modul live pertama diluncurkan ke publik secara resmi.' }
])

const stats = ref([
  { value: '3+', label: 'Modul Simulasi' },
  { value: '10K+', label: 'Pengguna Aktif' },
  { value: '95%', label: 'Tingkat Kepuasan' },
  { value: '0', label: 'Biaya Akses' },
])
</script>

<template>
  <div class="bg-primary min-h-screen text-accent font-main selection:bg-accent selection:text-primary overflow-x-hidden">
    
    <main class="max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">

      <!-- HERO SECTION -->
      <section class="max-w-4xl mx-auto mb-16 text-center" data-aos="fade-up">
        <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center overflow-hidden">
          <img :src="Logo" alt="Logo FundiVest" class="w-full h-full object-contain" />
        </div>

        <h2 class="font-black text-4xl md:text-5xl mb-3 uppercase tracking-tighter">
          Apa itu FundiVest?
        </h2>

        <p class="text-lg font-bold italic mb-6 text-accent opacity-70">
          Lawan investasi bodong dengan simulasi nyata, bukan sekadar teori.
        </p>

        <div class="w-16 h-1.5 bg-accent mx-auto mb-8"></div>

        <div class="text-base md:text-lg font-bold leading-relaxed text-left space-y-4 border-[4px] border-accent p-6 md:p-8 bg-primary shadow-[10px_10px_0_0_#2C3E50]">
          <p>
            Kami muak melihat masyarakat terus menjadi korban penipuan berkedok investasi seperti skema Ponzi atau trading abal-abal. Banyak platform edukasi yang mencoba menyelesaikan masalah ini, tapi sayangnya materi yang disampaikan seringkali terlalu kaku, penuh jargon, dan sangat membosankan.
          </p>
          <p>
            Di situlah <span class="bg-accent text-primary px-2 py-0.5 uppercase tracking-wider">FundiVest</span> lahir. Kami hadir sebagai platform edukasi finansial yang mengubah cara belajar investasi menjadi pengalaman interaktif. Melalui simulasi mini-game, kamu bisa merasakan langsung tegangnya mengambil keputusan finansial, mengenali <em>red flags</em>, dan melihat dampak dari setiap pilihanmu tanpa harus kehilangan uang sepeser pun di dunia nyata.
          </p>
        </div>
      </section>

      <!-- STATS BAR -->
      <section class="mb-16" data-aos="fade-up">
        <div class="grid grid-cols-2 md:grid-cols-4 border-[4px] border-accent shadow-[8px_8px_0_0_#2C3E50]">
          <div 
            v-for="(stat, i) in stats" :key="i"
            class="p-6 text-center border-accent border-b-[4px] md:border-b-0 border-r-[4px] last:border-r-0 hover:bg-accent hover:text-primary transition-colors group"
          >
            <div class="font-black text-3xl md:text-4xl mb-1 group-hover:text-primary">{{ stat.value }}</div>
            <div class="font-bold text-xs uppercase tracking-widest opacity-70 group-hover:text-primary group-hover:opacity-90">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- VISI & MISI -->
      <section class="border-y-[4px] border-accent mb-16 bg-primary">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="p-10 md:p-14 border-b-[4px] md:border-b-0 md:border-r-[4px] border-accent hover:bg-accent hover:text-primary transition-colors group" data-aos="fade-right">
            <div class="font-black text-5xl mb-4 opacity-20 group-hover:opacity-30">01</div>
            <h2 class="font-black text-3xl mb-4 uppercase tracking-tighter group-hover:text-primary">
              Visi Kami
            </h2>
            <p class="text-base font-bold leading-snug group-hover:text-primary opacity-80 group-hover:opacity-100">
              Menciptakan generasi cerdas finansial yang kebal terhadap segala bentuk jebakan investasi bodong dan skema penipuan.
            </p>
          </div>

          <div class="p-10 md:p-14 hover:bg-accent hover:text-primary transition-colors group" data-aos="fade-left">
            <div class="font-black text-5xl mb-4 opacity-20 group-hover:opacity-30">02</div>
            <h2 class="font-black text-3xl mb-4 uppercase tracking-tighter group-hover:text-primary">
              Misi Kami
            </h2>
            <p class="text-base font-bold leading-snug group-hover:text-primary opacity-80 group-hover:opacity-100">
              Menghadirkan edukasi keuangan yang mudah dipahami, praktis, dan interaktif melalui simulasi nyata yang membongkar taktik penipuan.
            </p>
          </div>
        </div>
      </section>

      <!-- NILAI & PRINSIP -->
      <section class="mb-16">
        <h2 class="font-black text-3xl mb-8 text-center uppercase" data-aos="fade-up">
          Nilai & Prinsip
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border-[4px] border-accent shadow-[10px_10px_0_0_#2C3E50]" data-aos="fade-up">
          <div 
            v-for="(value, index) in coreValues" :key="index"
            class="p-8 border-accent border-b-[4px] md:border-b-0 md:border-r-[4px] last:border-r-0 hover:bg-accent hover:text-primary transition-colors group"
          >
            <div class="text-3xl mb-4">{{ value.icon }}</div>
            <h3 class="font-black text-xl mb-3 uppercase group-hover:text-primary">{{ value.title }}</h3>
            <p class="font-bold text-sm opacity-75 group-hover:text-primary group-hover:opacity-100 leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </section>

      <!-- TIMELINE / PERJALANAN -->
      <section class="mb-16">
        <h2 class="font-black text-3xl mb-8 text-center uppercase" data-aos="fade-up">
          Perjalanan Kami
        </h2>
        
        <div class="relative" data-aos="fade-up" data-aos-delay="100">
          <!-- connector line -->
          <div class="hidden md:block absolute top-8 left-0 right-0 h-[4px] bg-accent z-0" style="margin: 0 calc(100%/6)"></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div 
              v-for="(item, index) in journey" :key="index"
              class="bg-primary border-[4px] border-accent shadow-[6px_6px_0_0_#2C3E50] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              :data-aos="'fade-up'" :data-aos-delay="index * 100"
            >
              <!-- year header -->
              <div class="bg-accent text-primary px-6 py-3 flex items-center justify-between">
                <span class="font-black text-2xl">{{ item.year }}</span>
                <span class="font-black text-lg opacity-60">0{{ index + 1 }}</span>
              </div>
              <!-- content -->
              <div class="p-6">
                <div class="font-black text-base uppercase mb-2">{{ item.event }}</div>
                <div class="font-bold text-sm opacity-70 leading-relaxed">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TIM KAMI -->
      <section class="mb-16">
        <h2 class="font-black text-3xl mb-8 text-center uppercase" data-aos="fade-up">
          Tim Kami
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-0 border-[4px] border-accent shadow-[10px_10px_0_0_#2C3E50]">
          <div 
            v-for="(member, index) in teamMembers" :key="index"
            class="p-8 text-center group cursor-pointer border-accent border-b-[4px] md:border-b-0 border-r-[4px] last:border-r-0 hover:bg-accent hover:text-primary transition-colors"
            data-aos="fade-up" :data-aos-delay="index * 80"
          >
            <div class="relative mb-4 inline-block">
              <div class="w-24 h-24 mx-auto bg-primary border-[4px] border-accent overflow-hidden shadow-[4px_4px_0_0_#2C3E50] group-hover:shadow-none group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                <img :src="member.avatar" :alt="member.name" class="w-full h-full object-cover pixelated" />
              </div>
              <div class="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-accent border-2 border-accent group-hover:bg-primary"></div>
            </div>
            <h3 class="font-black text-lg mb-1 group-hover:text-primary">{{ member.name }}</h3>
            <p class="font-bold text-xs opacity-70 uppercase tracking-wider group-hover:text-primary group-hover:opacity-90">{{ member.role }}</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bg-accent text-primary py-16 border-[4px] border-accent -mx-6 px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="font-black text-4xl mb-4 tracking-tighter" data-aos="zoom-in">
            Siap Memulai Petualangan?
          </h2>
          <p class="text-lg font-bold mb-8 max-w-2xl mx-auto opacity-80" data-aos="fade-up">
            Bergabung dengan para pemain lain dalam membasmi investasi bodong.
          </p>
          <router-link to="/game"
            class="bg-primary text-accent text-xl font-black px-10 py-5 border-[4px] border-primary shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase inline-block"
            data-aos="fade-up" data-aos-delay="150">
            Mulai Sekarang →
          </router-link>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-pixel {
  font-family: 'Press Start 2P', cursive;
}

.pixelated {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

::selection {
  background: #2c3e50;
  color: #e6dcc8;
}

@media (max-width: 768px) {
  .p-10 {
    padding: 2rem;
  }
}
</style>