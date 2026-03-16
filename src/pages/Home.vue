<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(async () => {
  await nextTick();
  AOS.init({
    duration: 600,
    once: true,
    easing: "ease-out-back",
  });
});

const flags = [
  {
    icon: "/Untung.webp", 
    title: "Untung Gila",
    desc: "Menjanjikan return pasti besar tanpa risiko.",
  },
  {
    icon: "/Incognito.webp",
    title: "Izin Gelap",
    desc: "Tidak terdaftar atau diawasi oleh OJK.",
  },
  {
    icon: "/Koneksi.webp",
    title: "Rekrutmen",
    desc: "Fokus mengajak orang, bukan investasi nyata.",
  },
  {
    icon: "/JamPasir.webp",
    title: "Taktik Fomo",
    desc: "Mendesak transfer cepat dengan kuota fiktif.",
  },
];
</script>

<template>
  <div
    class="bg-primary min-h-screen text-accent font-main selection:bg-accent selection:text-primary overflow-x-hidden"
  >
    <section
      class="max-w-7xl mx-auto px-6 pt-48 pb-24 flex flex-col items-center text-center"
    >
      <div
        data-aos="fade-down"
        class="bg-primary font-pixel text-[10px] px-6 py-2 border-[4px] border-accent mb-10 shadow-[6px_6px_0_0_#2C3E50] rotate-[-1.5deg]"
      >
        STATUS: FINANCIAL PROTECTION ACTIVE
      </div>

      <h1
        data-aos="zoom-in"
        data-aos-delay="200"
        class="font-black text-6xl md:text-8xl leading-[0.85] tracking-tighter mb-10 uppercase text-accent"
      >
        Langkah Bijak, <br />
        <span
          class="italic underline decoration-[8px] decoration-accent underline-offset-8"
          >Masa Depanmu</span
        >
      </h1>

      <p
        data-aos="fade-up"
        data-aos-delay="400"
        class="text-xl md:text-2xl max-w-2xl font-bold leading-tight mb-12 text-accent opacity-90"
      >
        Dunia finansial sedang diserang oleh ancaman
        <span class="bg-accent text-primary">Investasi Bodong</span>. Pelajari
        polanya, selamatkan asetmu, dan bersiaplah untuk simulasi.
      </p>

      <div
        data-aos="fade-up"
        data-aos-delay="600"
        class="flex flex-col items-center gap-6"
      >
        <router-link
          to="/game"
          class="bg-accent text-primary text-2xl font-black px-12 py-6 border-[4px] border-accent shadow-[10px_10px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase"
        >
          Tekan Tombol Untuk Mulai
        </router-link>
        <div class="mt-8 text-4xl text-accent font-pixel animate-bounce">▼</div>
      </div>
    </section>

    <section class="border-y-[4px] border-accent bg-primary">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div
          class="p-16 border-b-[4px] md:border-b-0 md:border-r-[4px] border-accent"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h2 class="font-black text-4xl mb-6 uppercase tracking-tighter">
            Apa itu Investasi Bodong?
          </h2>
          <p class="text-xl font-bold leading-snug">
            Investasi ini adalah penipuan berkedok keuntungan besar. Pelaku
            menawarkan saham fiktif tanpa izin resmi OJK untuk menjerat asetmu.
          </p>
        </div>
        <div
          class="p-16 flex items-center bg-primary italic font-black text-3xl leading-tight text-accent"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          "Uangmu tidak diputar untuk bisnis nyata, melainkan untuk membayar
          anggota lama (Skema Ponzi)."
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-24">
      <h2
        class="font-black text-4xl mb-16 text-center uppercase"
        data-aos="fade-up"
      >
        Deteksi Dini: Red Flags
      </h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-[4px] border-accent shadow-[12px_12px_0_0_#2C3E50]"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          v-for="(flag, index) in flags"
          :key="index"
          class="p-8 border-accent border-b-[4px] md:border-b-0 md:border-r-[4px] last:border-r-0 hover:bg-accent hover:text-primary transition-colors group"
        >
          <div
            class="mb-6 bg-primary border-[3px] border-accent inline-flex items-center justify-center p-4 group-hover:rotate-12 transition-transform w-24 h-24"
          >
            <img
              :src="flag.icon"
              :alt="flag.title"
              class="w-full h-full object-contain"
            />
          </div>
          <h3 class="font-black text-xl mb-4 uppercase">{{ flag.title }}</h3>
          <p class="font-bold opacity-80">{{ flag.desc }}</p>
        </div>
      </div>
    </section>

    <section
      class="bg-accent text-primary py-24 border-y-[4px] border-accent overflow-hidden"
    >
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2
          data-aos="zoom-in"
          class="font-black text-4xl mb-16 tracking-tighter"
        >
          GAME OVER: DAMPAK FATAL
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            data-aos="fade-right"
            class="bg-primary text-accent border-[4px] border-accent p-10 shadow-[10px_10px_0_0_rgba(255,255,255,0.2)] rotate-[-1deg] hover:rotate-0 transition-transform"
          >
            <h3 class="font-black text-2xl mb-6 uppercase underline">
              MODAL HILANG 100%
            </h3>
            <p class="text-xl font-bold leading-relaxed italic">
              Saat skema runtuh, penipu lari, dan seluruh uangmu lenyap tanpa
              sisa fisik yang bisa diklaim.
            </p>
          </div>
          <div
            data-aos="fade-left"
            class="bg-primary text-accent border-[4px] border-accent p-10 shadow-[10px_10px_0_0_rgba(255,255,255,0.2)] rotate-[1deg] hover:rotate-0 transition-transform"
          >
            <h3 class="font-black text-2xl mb-6 uppercase underline">
              LINGKARAN PINJOL
            </h3>
            <p class="text-xl font-bold leading-relaxed italic">
              Terpaksa berhutang ke Pinjol Ilegal untuk menutup kerugian,
              menciptakan lubang hitam finansial.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Menghilangkan seleksi biru default agar lebih brutalist */
::selection {
  background: #2c3e50;
  color: #e6dcc8;
}
</style>
