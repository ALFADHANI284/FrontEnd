<script setup lang="ts">
import { ref, computed } from 'vue'
import { storyData } from '../data/storyData'

// State untuk melacak scene mana yang sedang aktif. Dimulai dari 'scene_1'
const currentSceneId = ref('scene_1')

// Otomatis mengambil data object dari storyData berdasarkan ID yang aktif
const currentScene = computed(() => storyData[currentSceneId.value])

// Fungsi untuk berpindah scene saat tombol diklik
const goToScene = (nextId: string | undefined) => {
  if (nextId && storyData[nextId]) {
    currentSceneId.value = nextId
  } else {
    console.log("Scene belum dibuat!")
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-end pb-12 p-4">
    
    <div v-if="currentScene" class="bg-black border-4 border-white p-6 max-w-3xl w-full text-white shadow-[8px_8px_0_0_rgba(16,185,129,1)]">
      
      <p class="text-yellow-400 font-pixel text-sm mb-4">
        >> {{ currentScene.speaker }}
      </p>

      <p class="font-dialog text-3xl mb-8 leading-relaxed">
        {{ currentScene.text }}
      </p>

      <div v-if="currentScene.choices" class="flex flex-col gap-3">
        <button
          v-for="(choice, index) in currentScene.choices"
          :key="index"
          @click="goToScene(choice.nextScene)"
          class="bg-gray-800 hover:bg-emerald-600 hover:text-black border-2 border-gray-500 p-3 text-left font-pixel text-xs transition-colors"
        >
          > {{ choice.text }}
        </button>
      </div>

      <div v-else-if="currentScene.next" class="flex justify-end">
        <button
          @click="goToScene(currentScene.next)"
          class="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2 font-pixel text-sm border-2 border-emerald-200"
        >
          LANJUT ▼
        </button>
      </div>

    </div>
  </div>
</template>