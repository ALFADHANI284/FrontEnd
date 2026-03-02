<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    // Pengaturan global
    duration: 600, // Durasi sedikit cepat agar terasa responsif
    once: true,    // Animasi hanya berjalan sekali
    easing: 'ease-out-back', // Memberikan efek sedikit membal di akhir
  })
})
</script>

<template>
  <div class="bg-primary min-h-screen text-black font-main selection:bg-accent selection:text-white overflow-x-hidden">

    <section class="max-w-6xl mx-auto px-6 pt-52 pb-20 flex flex-col items-center text-center h-screen">
      <div data-aos="fade-down"
        class="text-[#A63A3A] font-pixel text-xs tracking-widest px-4 py-2 border-[3px] border-[#A63A3A] mb-8 shadow-[4px_4px_0_0_#A63A3A] font-bold">
        WARNING: FINANCIAL HAZARD DETECTED
      </div>

      <h1 data-aos="zoom-in" data-aos-delay="200"
        class="font-pixel text-5xl md:text-7xl lg:text-8xl text-black mb-8 leading-tight">
        SURVIVE THE <br />
        <span class="text-accent drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">MARKET</span>
      </h1>

      <p data-aos="fade-up" data-aos-delay="400"
        class="text-2xl md:text-3xl max-w-3xl leading-relaxed text-gray-800 mb-12 font-bold">
        Dunia finansial sedang diserang oleh ancaman <span class="text-black border-b-[4px] border-[#A63A3A]">Saham
          Bodong</span>. Pelajari polanya, selamatkan asetmu, dan bersiaplah untuk simulasi.
      </p>

      <div data-aos="fade-up" data-aos-delay="600" class="mt-8 text-4xl text-black font-pixel animate-bounce">▼</div>
    </section>

    <section class="bg-primary border-y-[4px] border-black py-20 relative">
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative z-10">
        <div class="md:col-span-1 sticky top-32" data-aos="fade-right">
          <h2 class="font-pixel text-3xl leading-snug">
            APA ITU <br /><span class="text-accent">SAHAM BODONG?</span>
          </h2>
          <div class="w-16 h-2 bg-black mt-6 border-b-[4px] border-black"></div>
        </div>
        <div class="md:col-span-2 text-2xl leading-loose text-gray-900 space-y-6" data-aos="fade-left"
          data-aos-delay="200">
          <p>
            Secara sederhana, investasi ini adalah <strong>penipuan berkedok keuntungan besar</strong>. Pelaku
            menawarkan kepemilikan saham dari perusahaan yang fiktif, tidak memiliki izin resmi, atau tidak pernah
            tercatat di bursa efek yang sah.
          </p>
          <div class="bg-[#D3C5AE] border-[3px] border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <p class="text-xl font-bold">"Uangmu tidak diputar untuk bisnis nyata, melainkan untuk membayar anggota lama
              (Skema Ponzi) atau langsung masuk ke kantong penipu."</p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-24">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="font-pixel text-3xl mb-4">DETEKSI DINI: RED FLAGS</h2>
        <p class="text-xl text-gray-800 font-bold">Kenali ciri-citinya sebelum kamu menekan tombol investasi.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div data-aos="flip-up" data-aos-delay="100"
          class="bg-primary border-[3px] border-black p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-[#D3C5AE] transition-all cursor-default hover:-translate-y-1">
          <div class="text-4xl mb-4 border-[3px] border-black inline-block p-2 bg-white">🤑</div>
          <h3 class="font-pixel text-xl mb-3">UNTUNG TIDAK LOGIS</h3>
          <p class="text-xl text-gray-900 leading-relaxed">Menjanjikan *return* pasti yang sangat besar tanpa risiko.
          </p>
        </div>
        <div data-aos="flip-up" data-aos-delay="200"
          class="bg-primary border-[3px] border-black p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-[#D3C5AE] transition-all cursor-default hover:-translate-y-1">
          <div class="text-4xl mb-4 border-[3px] border-black inline-block p-2 bg-white">🕵️‍♂️</div>
          <h3 class="font-pixel text-xl mb-3">LEGALITAS GELAP</h3>
          <p class="text-xl text-gray-900 leading-relaxed">Tidak terdaftar atau diawasi oleh OJK.</p>
        </div>
        <div data-aos="flip-up" data-aos-delay="300"
          class="bg-primary border-[3px] border-black p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-[#D3C5AE] transition-none cursor-default">
          <div class="text-4xl mb-4 border-[3px] border-black inline-block p-2 bg-white">🤝</div>
          <h3 class="font-pixel text-xl mb-3">FOKUS REKRUTMEN</h3>
          <p class="text-xl text-gray-900 leading-relaxed">Keuntungan terbesarmu dijanjikan dari komisi mengajak orang
            lain. Ini adalah ciri mutlak dari Skema Ponzi, bukan investasi murni.</p>
        </div>
        <div data-aos="flip-up" data-aos-delay="400"
          class="bg-primary border-[3px] border-black p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-[#D3C5AE] transition-none cursor-default">
          <div class="text-4xl mb-4 border-[3px] border-black inline-block p-2 bg-white">⏳</div>
          <h3 class="font-pixel text-xl mb-3">TAKTIK FOMO</h3>
          <p class="text-xl text-gray-900 leading-relaxed">Mendesakmu untuk transfer cepat dengan alasan "kuota mau
            habis". Tujuannya mematikan logika berpikirmu.</p>
        </div>
      </div>
    </section>

    <section class="bg-secondary text-primary py-24 border-y-[4px] border-black overflow-hidden">
      <div class="max-w-5xl mx-auto px-6 text-center">

        <h2 data-aos="zoom-in" data-aos-duration="800"
          class="font-pixel text-3xl md:text-4xl text-primary mb-12 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          GAME OVER: DAMPAK FATAL
        </h2>

        <div class="flex flex-col md:flex-row gap-8 justify-center">

          <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="800"
            class="flex-1 bg-primary border-[4px] border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 group">
            <h3 class="font-pixel text-xl text-black mb-4 group-hover:text-accent transition-colors">MODAL HILANG 100%
            </h3>
            <p class="text-xl leading-relaxed text-gray-900 font-bold">
              Tidak ada aset fisik yang bisa diklaim. Saat skema runtuh, penipu lari, dan seluruh uangmu lenyap tanpa
              sisa.
            </p>
          </div>

          <div data-aos="fade-left" data-aos-delay="400" data-aos-duration="800"
            class="flex-1 bg-primary border-[4px] border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 group">
            <h3 class="font-pixel text-xl text-black mb-4 group-hover:text-accent transition-colors">LINGKARAN PINJOL
            </h3>
            <p class="text-xl leading-relaxed text-gray-900 font-bold">
              Korban yang menggunakan "uang panas" sering terpaksa berhutang ke Pinjol Ilegal untuk menutup kerugian,
              menciptakan masalah baru.
            </p>
          </div>

        </div>
      </div>
    </section>

    <section class="max-w-5xl mx-auto px-6 pt-24 pb-24 text-center my-24">
      <div data-aos="zoom-out-up"
        class="bg-primary border-[6px] border-black p-12 md:p-16 shadow-[16px_16px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-8 relative">
        <h2 class="font-pixel text-3xl md:text-4xl text-black">UJI PENGETAHUANMU!</h2>
        <router-link to="/game" data-aos="fade-up" data-aos-delay="300" data-aos-anchor-placement="top-bottom"
          class="font-pixel bg-accent text-primary px-12 py-6 text-2xl border-[4px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:translate-y-1 active:translate-x-0 active:shadow-none transition-all duration-150 inline-block mt-4">
          PRESS START TO PLAY
        </router-link>
      </div>
    </section>

    <!-- <section class="w-full border-t-[4px] border-black pb-12"></section> -->

    <!-- <section class="w-full border-t-[4px] border-black">
      <img 
        src="/pixel-city.png" 
        alt="Pixel Art Cityscape" 
        class="w-full h-auto object-cover"
      />
    </section> -->

  </div>
</template>