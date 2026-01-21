<template>
  <main class="flex-1">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex gap-4 mb-12">
        <div class="relative flex-1">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-graphite-500" :size="20" />
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Pesquisar filme..."
            class="input-field pl-12"
          >
        </div>
        <button @click="performSearch" class="btn-primary px-8">
          <Search :size="20" />
          Buscar
        </button>
      </div>

      <section class="mb-16">
        <h2 class="text-4xl font-bold text-blood mb-8 flex items-center gap-3">
          <Clapperboard :size="32" />
          Em Cartaz
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="movie in cinemaMovies" :key="movie.id" class="card-modern group">
            <div class="movie-poster-container h-64">
              <img :src="movie.image" :alt="movie.title" class="movie-poster-img group-hover:scale-105">
            </div>
            <div class="p-6 space-y-3">
              <h3 class="text-xl font-bold text-blood">{{ movie.title }}</h3>
              <p class="text-graphite-400 text-sm leading-relaxed light-mode:text-graphite-600">{{ movie.description }}</p>
              <span class="inline-flex items-center gap-1.5 text-xs font-bold text-blood bg-blood/10 px-4 py-1.5 rounded-full">
                <MapPin :size="12" />
                Nos cinemas
              </span>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider mb-16"></div>

      <section>
        <h2 class="text-4xl font-bold text-blood mb-8 flex items-center gap-3">
          <Film :size="32" />
          Filmes Disponíveis
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import { Search, Clapperboard, MapPin, Film } from 'lucide-vue-next'

const searchTerm = ref('')

const cinemaMovies = [
  { id: 1, title: 'O Ritual (2025)', image: '/src/assets/img/ritual.jpg', description: 'Terror sobrenatural inspirado em exorcismos reais.' },
  { id: 2, title: 'Nosferatu', image: '/src/assets/img/nosferatu.jpg', description: 'Releitura moderna do clássico vampírico.' },
  { id: 3, title: 'Imaculada', image: '/src/assets/img/imaculada.jpg', description: 'Religião, isolamento e horror psicológico.' },
]

const movies = [
  { id: 1, title: 'O Escuro e o Perverso (2020)', image: '/src/assets/img/1c71b2a2-2923-4823-b153-f7713db0e08b.jpg', description: 'Família isolada é tomada por uma escuridão opressiva — terror psicológico, silencioso e inexorável.', rating: 9.5, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }, { name: 'Apple TV', url: 'https://tv.apple.com' }] },
  { id: 2, title: 'O Ritual (The Ritual)', image: '/src/assets/img/ritual.jpg', description: 'Dois padres enfrentam o desconhecido e ritos que testam fé e sanidade — terror sobrenatural.', rating: 9.5, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }] },
  { id: 3, title: 'Frankenstein de Mary Shelley (1994)', image: '/src/assets/img/frankestein.jpg', description: 'Adaptação sombria sobre criação, culpa e os limites da ciência — drama e horror em um só.', rating: 9.5, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }] },
  { id: 4, title: 'Livrai-nos do Mal (2014)', image: '/src/assets/img/livrai nos do mal.jpg', description: 'Policial e padre enfrentam força maligna em uma trama de exorcismo e investigação sobrenatural.', rating: 9.5, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }] },
  { id: 5, title: 'Texas Chainsaw 3D (2013)', image: '/src/assets/img/texas.jpg', description: 'Heather retorna à propriedade ancestral e confronta Leatherface — slasher e violência visceral.', rating: 9.5, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }] },
  { id: 6, title: 'O Exorcista (1973)', image: '/src/assets/img/exorcista.webp', description: 'Um dos maiores clássicos do terror, envolvendo possessão demoníaca e fé.', rating: 9.5, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }] },
  { id: 7, title: 'Hereditário (2018)', image: '/src/assets/img/hereditario.jpg', description: 'Terror psicológico intenso que explora luto, culpa e forças sobrenaturais.', rating: 8.9, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }] },
  { id: 8, title: 'A Bruxa (2015)', image: '/src/assets/img/a bruxa.jpg', description: 'Atmosfera sombria e lenta sobre paranoia religiosa e o mal oculto.', rating: 8.3, links: [{ name: 'Prime Video', url: 'https://www.primevideo.com' }] }
]

const filteredMovies = computed(() => {
  if (!searchTerm.value.trim()) return movies
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const performSearch = () => {
}
</script>
