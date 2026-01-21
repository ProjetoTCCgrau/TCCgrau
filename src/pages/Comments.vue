<template>
  <main class="flex-1">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-4xl font-display font-bold text-blood mb-8">Deixe seu Comentário</h2>
      
      <form @submit.prevent="submitComment" class="card-modern p-8 space-y-6 mb-12">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Nome</label>
          <input v-model="form.name" type="text" placeholder="Seu nome" class="input-field" required>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Email</label>
          <input v-model="form.email" type="email" placeholder="seu@email.com" class="input-field" required>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Filme</label>
          <select v-model="form.movie" class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-blood" required>
            <option value="">Selecione um filme</option>
            <option v-for="movie in movies" :key="movie.id" :value="movie.title">
              {{ movie.title }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-300">Comentário</label>
          <textarea v-model="form.message" placeholder="Seu comentário..." rows="5" class="input-field resize-none" required></textarea>
        </div>

        <button type="submit" class="btn-primary w-full">Enviar Comentário</button>
      </form>

      <div v-if="comments.length > 0" class="space-y-4">
        <h3 class="text-2xl font-display font-bold text-blood">Comentários Recentes</h3>
        <div v-for="(comment, index) in comments" :key="index" class="card-modern p-6 space-y-2 border-l-4 border-blood">
          <div class="flex justify-between items-start">
            <strong class="text-slate-100">{{ comment.name }}</strong>
            <span class="text-xs text-slate-500">{{ comment.email }}</span>
          </div>
          <p class="text-sm text-blood font-medium">{{ comment.movie }}</p>
          <p class="text-slate-400">{{ comment.message }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  movie: '',
  message: ''
})

const comments = ref([])

const movies = [
  { id: 1, title: 'O Exorcista' },
  { id: 2, title: 'Hereditário' },
  { id: 3, title: 'A Bruxa' },
  { id: 4, title: 'Halloween' }
]

const submitComment = () => {
  comments.value.unshift({ ...form.value })
  alert('Comentário enviado com sucesso!')
  form.value = { name: '', email: '', movie: '', message: '' }
}
</script>
