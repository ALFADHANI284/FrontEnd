// src/data/storyData.ts

// 1. Mendefinisikan cetakan (Interface) agar struktur rapi dan TypeScript tidak protes
export interface Choice {
  text: string;
  nextScene: string;
  // Nanti di sini bisa ditambah: cost: number, stress: number
}

export interface Scene {
  id: string;
  speaker: string;
  text: string;
  choices?: Choice[]; // Pakai tanda "?" karena tidak semua scene ada pilihan
  next?: string;      // Kalau cuma teks biasa (tanpa pilihan), lanjut ke mana?
}

// 2. Membuat "Database" Dummy
export const storyData: Record<string, Scene> = {
  "scene_1": {
    id: "scene_1",
    speaker: "Mentor Misterius",
    text: "Halo, anak muda. Dunia keuangan itu kejam. Satu keputusan salah, gajimu bisa habis tak tersisa. Apakah kamu siap belajar?",
    choices: [
      { text: "Siap dong! Gas!", nextScene: "scene_2_berani" },
      { text: "Agak takut sih...", nextScene: "scene_2_takut" }
    ]
  },
  "scene_2_berani": {
    id: "scene_2_berani",
    speaker: "Mentor Misterius",
    text: "Bagus! Keberanian adalah modal awal. Mari kita mulai simulasi bulan pertamamu bergaji.",
    next: "chapter_1_start"
  },
  "scene_2_takut": {
    id: "scene_2_takut",
    speaker: "Mentor Misterius",
    text: "Wajar. Uang memang bisa jadi monster kalau tidak dikendalikan. Tapi jangan khawatir, aku akan memandumu.",
    next: "chapter_1_start" // Keduanya bermuara ke scene yang sama pada akhirnya
  },
  "chapter_1_start": {
    id: "chapter_1_start",
    speaker: "Sistem",
    text: "[ BAB 1: GAJI PERTAMA ] \n Saldo awalmu adalah Rp 700.000.",
    // Nanti disambung ke logika Pinia
  }
};