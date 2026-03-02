<script setup lang="ts">
import { ref, computed } from 'vue'
import { storyData } from '../data/storyData'
import DialogBox from '../components/DialogBox.vue' 

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
  <div class="min-h-screen bg-[#2C3E50] flex flex-col items-center justify-center p-4">
    
    <div v-if="currentScene" class="w-full max-w-4xl flex flex-col gap-6">
      
      <DialogBox 
        :characterName="currentScene.speaker" 
        :dialogueText="currentScene.text" 
      />

      <div class="flex flex-col gap-3 px-12 md:px-20"> 
        
        <div v-if="currentScene.choices" class="flex flex-col gap-3">
          <button
            v-for="(choice, index) in currentScene.choices"
            :key="index"
            @click="goToScene(choice.nextScene)"
            class="bg-[#E6DCC8] hover:bg-[#D3C5AE] text-black border-[3px] border-black p-4 text-left font-mono text-lg transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none cursor-pointer"
          >
            > {{ choice.text }}
          </button>
        </div>

        <div v-else-if="currentScene.next" class="flex justify-end mt-4">
          <button
            @click="goToScene(currentScene.next)"
            class="bg-[#D3C5AE] hover:bg-[#C2B299] text-black px-8 py-3 font-mono text-xl border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all cursor-pointer font-bold"
          >
            LANJUT ▼
          </button>
        </div>

      </div>

    </div>
  </div>
</template>