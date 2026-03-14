<template>
  <!-- Gunakan h-screen dan overflow-hidden agar tidak bisa scroll -->
  <div class="h-screen bg-primary flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
    
    <!-- Pixelated Background Pattern -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div class="absolute inset-0" style="background-image: radial-gradient(black 1px, transparent 1px); background-size: 16px 16px;"></div>
    </div>

    <!-- 404 dengan Efek Glitch - Warna disesuaikan -->
    <div class="relative mb-6">
      <h1 class="text-8xl md:text-[150px] font-bold text-secondary drop-shadow-[8px_8px_0px_#000000] glitch-effect">
        404
      </h1>
    </div>

    <!-- Teks Sederhana -->
    <div class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-black mb-2">
        Halaman Tidak Ditemukan
      </h2>
      <p class="text-black text-lg">
        Halaman yang kamu tuju tidak ditemukan.
      </p>
    </div>

    <!-- Tombol Aksi -->
    <div class="flex flex-col sm:flex-row gap-4">
      <router-link 
        to="/" 
        class="bg-secondary text-primary border-4 border-black px-6 py-3 text-lg font-bold uppercase hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all duration-100 flex items-center gap-2"
      >
        <span class="text-xl">←</span> 
        Kembali ke Halaman Utama
      </router-link>

      <button 
        @click="goBack"
        class="bg-black text-primary border-4 border-secondary px-6 py-3 text-lg font-bold uppercase hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,215,0,1)] active:translate-y-0 active:shadow-none transition-all duration-100 flex items-center gap-2"
      >
        <span class="text-xl">↺</span> 
        Coba Lagi
      </button>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
/* Efek Glitch untuk Teks 404 - dengan warna yang nyambung ke tema */
.glitch-effect {
  position: relative;
  animation: glitch-skew 4s infinite;
}

.glitch-effect::before,
.glitch-effect::after {
  content: '404';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

/* Warna glitch disesuaikan dengan tema */
.glitch-effect::before {
  animation: glitch-1 2s infinite;
  color: #4A90E2; /* Biru lebih kalem, nyambung dengan primary */
  z-index: -1;
}

.glitch-effect::after {
  animation: glitch-2 2s infinite;
  color: #F5A623; /* Oren/gold, nyambung dengan secondary */
  z-index: -2;
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  10% { transform: skew(0deg); }
  11% { transform: skew(1deg); } /* Dikurangi dari 2deg */
  12% { transform: skew(-1deg); } /* Dikurangi dari -2deg */
  13% { transform: skew(0deg); }
  100% { transform: skew(0deg); }
}

@keyframes glitch-1 {
  0% { transform: translate(0); }
  10% { transform: translate(-1px, 1px); } /* Dikurangi intensitasnya */
  11% { transform: translate(2px, -1px); }
  12% { transform: translate(-1px, 1px); }
  13% { transform: translate(0); }
  100% { transform: translate(0); }
}

@keyframes glitch-2 {
  0% { transform: translate(0); }
  10% { transform: translate(1px, -1px); } /* Dikurangi intensitasnya */
  11% { transform: translate(-2px, 1px); }
  12% { transform: translate(1px, -1px); }
  13% { transform: translate(0); }
  100% { transform: translate(0); }
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 100px;
  }
}
</style>