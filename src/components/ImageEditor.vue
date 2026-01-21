<template>
  <div class="card-modern p-8 space-y-6">
    <h3 class="text-2xl font-display font-bold text-blood">Editor de Imagem</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Brilho: {{ brightness }}%</label>
          <input v-model.number="brightness" type="range" min="0" max="200" @input="updateImage" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blood">
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Contraste: {{ contrast }}%</label>
          <input v-model.number="contrast" type="range" min="0" max="200" @input="updateImage" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blood">
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Saturação: {{ saturation }}%</label>
          <input v-model.number="saturation" type="range" min="0" max="200" @input="updateImage" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blood">
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Escala de Cinza: {{ grayscale }}%</label>
          <input v-model.number="grayscale" type="range" min="0" max="100" @input="updateImage" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blood">
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Rotação</label>
          <select v-model.number="rotation" @change="updateImage" class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-blood">
            <option value="0">0°</option>
            <option value="90">90°</option>
            <option value="180">180°</option>
            <option value="270">270°</option>
          </select>
        </div>
      </div>

      <div class="flex items-center justify-center bg-slate-800 rounded-lg p-4 min-h-96">
        <img 
          ref="previewImage"
          :src="imageSrc" 
          :style="imageStyle"
          alt="Preview"
          class="max-w-full max-h-96 object-contain"
        >
      </div>
    </div>

    <div class="flex gap-4 pt-4">
      <button @click="resetImage" class="btn-secondary flex-1">Resetar</button>
      <button @click="downloadImage" class="btn-primary flex-1">Baixar Imagem</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  }
})

const brightness = ref(100)
const contrast = ref(100)
const saturation = ref(100)
const grayscale = ref(0)
const rotation = ref(0)
const previewImage = ref(null)

const imageStyle = computed(() => ({
  filter: `brightness(${brightness.value}%) contrast(${contrast.value}%) saturate(${saturation.value}%) grayscale(${grayscale.value}%)`,
  transform: `rotate(${rotation.value}deg)`,
  transition: 'all 0.2s ease'
}))

const updateImage = () => {
}

const resetImage = () => {
  brightness.value = 100
  contrast.value = 100
  saturation.value = 100
  grayscale.value = 0
  rotation.value = 0
}

const downloadImage = () => {
  const canvas = document.createElement('canvas')
  const img = previewImage.value
  
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  
  const ctx = canvas.getContext('2d')
  ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%) saturate(${saturation.value}%) grayscale(${grayscale.value}%)`
  
  if (rotation.value !== 0) {
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation.value * Math.PI) / 180)
    ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2)
  } else {
    ctx.drawImage(img, 0, 0)
  }
  
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'imagem-editada.png'
    a.click()
    URL.revokeObjectURL(url)
  })
}
</script>
