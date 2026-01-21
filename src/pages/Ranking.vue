<template>
  <main class="flex-1">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-4xl font-display font-bold text-blood">Ranking</h2>
        <button @click="calculateAverage" class="btn-primary">Calcular Média</button>
      </div>

      <div class="card-modern overflow-hidden">
        <table class="w-full">
          <thead class="bg-slate-800 border-b border-slate-700">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-blood">Posição</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-blood">Filme</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-blood">Gênero</th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-blood">Nota</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700">
            <tr v-for="(movie, index) in sortedMovies" :key="movie.id" class="hover:bg-slate-800 transition-colors duration-200">
              <td class="px-6 py-4 text-sm font-medium text-slate-300">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-sm font-medium text-slate-100">{{ movie.title }}</td>
              <td class="px-6 py-4 text-sm text-slate-400">{{ movie.genre }}</td>
              <td class="px-6 py-4 text-sm font-semibold text-blood text-right">{{ movie.rating }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const movies = ref([
  { id: 1, title: 'O Exorcista', genre: 'Terror', rating: 9.5 },
  { id: 2, title: 'Hereditário', genre: 'Terror Psicológico', rating: 8.9 },
  { id: 3, title: 'A Bruxa', genre: 'Terror', rating: 8.3 },
  { id: 4, title: 'Halloween', genre: 'Slasher', rating: 8.7 },
  { id: 5, title: 'O Iluminado', genre: 'Terror Psicológico', rating: 9.0 }
])

const sortedMovies = computed(() => {
  return [...movies.value].sort((a, b) => b.rating - a.rating)
})

const calculateAverage = () => {
  const total = movies.value.reduce((sum, movie) => sum + movie.rating, 0)
  const average = (total / movies.value.length).toFixed(2)
  alert(`Média das notas: ${average}`)
}
</script>
