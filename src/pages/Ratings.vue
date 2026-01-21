<template>
  <main class="flex-1">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-4xl font-display font-bold text-blood mb-8">Avaliações</h2>
      
      <ImageEditor :image-src="selectedImage" v-if="selectedImage" />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div v-for="movie in movies" :key="movie.id" class="card-modern group cursor-pointer" @click="selectImage(movie.image)">
          <div class="relative overflow-hidden h-80">
            <img :src="movie.image" :alt="movie.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          </div>
          <div class="p-6 space-y-4">
            <h3 class="text-lg font-display font-bold text-blood">{{ movie.title }}</h3>
            <p class="text-slate-400 text-sm">{{ movie.description }}</p>
            <div class="flex gap-1">
              <button v-for="i in 5" :key="i" @click.stop="setRating(movie.id, i)" class="text-2xl transition-colors duration-200" :class="ratings[movie.id] >= i ? 'text-blood' : 'text-slate-600 hover:text-blood'">★</button>
            </div>
            <p class="text-sm font-medium text-slate-400">{{ ratings[movie.id] || 0 }}/5</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import ImageEditor from '../components/ImageEditor.vue'

const selectedImage = ref(null)
const ratings = ref({})

const movies = [
  { id: 1, title: 'O Exorcista (1973)', image: '/src/assets/img/exorcista.webp', description: 'Um dos maiores clássicos do terror.' },
  { id: 2, title: 'Hereditário (2018)', image: '/src/assets/img/hereditario.jpg', description: 'Terror psicológico intenso.' },
  { id: 3, title: 'A Bruxa (2015)', image: '/src/assets/img/a bruxa.jpg', description: 'Atmosfera sombria e lenta.' },
  { id: 4, title: 'Halloween', image: '/src/assets/img/halloween.webp', description: 'Clássico do slasher.' }
]

const selectImage = (image) => {
  selectedImage.value = image
}

const setRating = (movieId, rating) => {
  ratings.value[movieId] = rating
}
</script>
