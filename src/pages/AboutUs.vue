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
    title: 'Belajar Lewat Aksi', 
    desc: 'Pemahaman yang sesungguhnya lahir dari pengalaman langsung. Kami merancang simulasi yang memaksa kamu berpikir, bukan sekadar membaca.'
  },
  { 
    icon: '',
    title: 'Terbuka untuk Semua', 
    desc: 'Literasi finansial bukan hak eksklusif. FundiVest dirancang agar siapa pun — dari pelajar hingga profesional — dapat mengaksesnya tanpa hambatan.'
  },
  { 
    icon: '',
    title: 'Pilihan & Konsekuensi', 
    desc: 'Kamu adalah sutradara finansialmu sendiri. Setiap keputusan akan mengarahkanmu pada alur yang berbeda.'
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
          "Karena pengalaman adalah tameng terbaik melawan penipuan."
        </p>

        <div class="w-16 h-1.5 bg-accent mx-auto mb-8"></div>

        <div class="text-base md:text-lg font-bold leading-relaxed text-left space-y-4 border-[4px] border-accent p-6 md:p-8 bg-primary shadow-[10px_10px_0_0_#2C3E50]">
          <p>
            Masih banyak yang gampang tergiur investasi bodong—mulai dari skema Ponzi, robot trading abal-abal, sampai janji profit yang nggak masuk akal. Kenapa? Karena tahu teorinya saja tidak cukup kalau kamu belum pernah berhadapan langsung dengan trik manipulatif para penipu.
          </p>
          <p>
            Di situlah <span class="bg-accent text-primary px-2 py-0.5 uppercase tracking-wider">FundiVest</span> hadir. Kami mengubah edukasi finansial menjadi simulasi interaktif berbasis cerita. Di sini, kamu akan dihadapkan pada skenario godaan investasi fiktif. Latih instingmu untuk membaca <em>red flags</em>, tentukan pilihanmu, dan hadapi konsekuensinya tanpa perlu takut kehilangan uang sepeser pun!
          </p>
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
              Membangun generasi yang melek finansial dan "kebal" penipuan—punya insting tajam untuk mengenali mana peluang emas dan mana jebakan investasi bodong.
            </p>
          </div>

          <div class="p-10 md:p-14 hover:bg-accent hover:text-primary transition-colors group" data-aos="fade-left">
            <div class="font-black text-5xl mb-4 opacity-20 group-hover:opacity-30">02</div>
            <h2 class="font-black text-3xl mb-4 uppercase tracking-tighter group-hover:text-primary">
              Misi Kami
            </h2>
            <p class="text-base font-bold leading-snug group-hover:text-primary opacity-80 group-hover:opacity-100">
              Mengubah cara belajar investasi dari sekadar baca teori menjadi pengalaman praktik yang aman. Kami menyediakan ruang untuk bereksperimen, salah langkah, dan belajar dari <em>Bad Ending</em> agar kamu siap membuat keputusan bijak di dunia nyata.
            </p>
          </div>

        </div>
      </section>
      
        <!-- NILAI & PRINSIP -->
        <section class="mb-16">
          <h2 class="font-black text-3xl mb-2 text-center uppercase" data-aos="fade-up">
            Nilai & Prinsip
          </h2>
          <p class="text-center font-bold opacity-60 text-sm mb-8 uppercase tracking-widest" data-aos="fade-up">
            Fondasi yang memandu setiap keputusan kami
          </p>
          
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

        <!-- MENGAPA FUNDIVEST -->
        <section class="mb-16" data-aos="fade-up">
        <h2 class="font-black text-3xl mb-2 text-center uppercase">
          Mengapa FundiVest?
        </h2>
        <p class="text-center font-bold opacity-60 text-sm mb-8 uppercase tracking-widest">
          Bukan sekadar platform edukasi biasa
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border-[4px] border-accent shadow-[10px_10px_0_0_#2C3E50]">
          <div class="p-8 border-b-[4px] md:border-b-0 md:border-r-[4px] border-accent group hover:bg-accent hover:text-primary transition-colors">
            <div class="font-black text-xs uppercase tracking-widest mb-3 opacity-50 group-hover:opacity-70">Masalah</div>
            <h3 class="font-black text-xl mb-3 uppercase group-hover:text-primary">Teori Saja Tidak Cukup</h3>
            <p class="font-bold text-sm opacity-75 group-hover:text-primary group-hover:opacity-100 leading-relaxed">
              Artikel dan video edukasi finansial hanya memberikan teori, tapi tidak melatih mental. Pengetahuan yang cuma dibaca akan mudah terlupakan saat kamu benar-benar dihadapkan pada godaan investasi bodong atau janji manis keuntungan instan.
            </p>
          </div>

          <div class="p-8 border-b-[4px] md:border-b-0 border-accent group hover:bg-accent hover:text-primary transition-colors">
            <div class="font-black text-xs uppercase tracking-widest mb-3 opacity-50 group-hover:opacity-70">Solusi</div>
            <h3 class="font-black text-xl mb-3 uppercase group-hover:text-primary">Simulasi dengan Beragam Akhir</h3>
            <p class="font-bold text-sm opacity-75 group-hover:text-primary group-hover:opacity-100 leading-relaxed">
              Kami menyajikan simulasi interaktif di mana kamu memegang kendali penuh. Setiap pilihanmu menentukan jalannya cerita—apakah kamu akan meraih <strong>Happy Ending</strong>, terjebak dalam <strong>Bad Ending</strong>, atau memicu <strong>Secret Ending</strong>? Rasakan langsung konsekuensi dari setiap keputusanmu tanpa risiko kehilangan uang sungguhan!
            </p>
          </div>
        </div>
      </section>

      <!-- TIM KAMI -->
      <section class="mb-16">
        <h2 class="font-black text-3xl mb-2 text-center uppercase" data-aos="fade-up">
          Tim Kami
        </h2>
        <p class="text-center font-bold opacity-60 text-sm mb-8 uppercase tracking-widest" data-aos="fade-up">
          Orang-orang di balik FundiVest
        </p>
        
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
          <p class="font-black text-xs uppercase tracking-widest mb-3 opacity-60" data-aos="fade-up">
            Uji Insting Finansialmu
          </p>
          
          <h2 class="font-black text-4xl mb-4 tracking-tighter uppercase" data-aos="zoom-in">
            Buktikan Kamu Susah Ditipu!
          </h2>
          
          <p class="text-lg font-bold mb-8 max-w-2xl mx-auto opacity-80 leading-relaxed" data-aos="fade-up">
            Jangan tunggu sampai rugi beneran di dunia nyata. Hadapi berbagai godaan investasi bodong, tentukan pilihanmu, dan lihat <strong>Ending</strong> seperti apa yang akan kamu dapatkan. 
          </p>
          
          <router-link to="/game"
            class="bg-primary text-accent text-xl font-black px-10 py-5 border-[4px] border-primary shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase inline-block"
            data-aos="fade-up" data-aos-delay="150">
            Mulai Simulasi Sekarang →
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