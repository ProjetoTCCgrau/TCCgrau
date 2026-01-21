<template>
  <article class="card-modern group">
    <div class="movie-poster-container">
      <img :src="movie.image" :alt="movie.title" class="movie-poster-img group-hover:scale-105">
      <div class="absolute inset-0 bg-gradient-to-t from-graphite-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    
    <div class="p-6 space-y-4">
      <h3 class="text-xl font-bold text-blood line-clamp-2">{{ movie.title }}</h3>
      <p class="text-graphite-400 text-sm line-clamp-3 leading-relaxed light-mode:text-graphite-600">{{ movie.description }}</p>
      
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-1.5 text-sm font-bold text-graphite-100 light-mode:text-graphite-700">
          <Star :size="16" class="text-yellow-500 fill-yellow-500" />
          {{ movie.rating }}
        </div>
      </div>

      <div class="space-y-3 pt-2">
        <div class="flex gap-2 flex-wrap">
          <a v-for="link in movie.links" :key="link.name" :href="link.url" target="_blank" rel="noopener" class="text-xs px-4 py-2 bg-blood hover:bg-blood-dark text-white rounded-full font-bold transition-all duration-200 shadow-sm flex items-center gap-1.5">
            <Play :size="12" />
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { Star, Play } from 'lucide-vue-next'
defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>
