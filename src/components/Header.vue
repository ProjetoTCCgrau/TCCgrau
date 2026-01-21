<template>
  <header class="header-container">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center gap-12">
          <h1 class="text-3xl font-bold text-blood tracking-tighter">Cinneview</h1>
          <nav class="hidden md:flex gap-8">
            <RouterLink to="/" class="nav-link">Filmes</RouterLink>
            <RouterLink to="/ratings" class="nav-link">Avaliações</RouterLink>
            <RouterLink to="/ranking" class="nav-link">Ranking</RouterLink>
            <RouterLink to="/comments" class="nav-link">Comentários</RouterLink>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <button @click="authStore.toggleTema()" class="icon-btn">
            <Sun v-if="authStore.tema === 'escuro'" :size="20" />
            <Moon v-else :size="20" />
          </button>
          
          <RouterLink v-if="authStore.usuarioLogado" to="/profile" class="icon-btn">
            <div v-if="authStore.userData.avatar" class="w-6 h-6 rounded-full overflow-hidden">
              <img :src="authStore.userData.avatar" class="w-full h-full object-cover" />
            </div>
            <User v-else :size="20" />
          </RouterLink>
          
          <button v-else @click="$emit('toggle-auth')" class="icon-btn">
            <User :size="20" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { authStore } from '../stores/authStore'
import { Sun, Moon, User } from 'lucide-vue-next'

defineEmits(['toggle-auth'])
</script>

<style scoped>
.header-container {
  @apply sticky top-0 z-40 border-b transition-colors duration-300 backdrop-blur-md;
  @apply bg-graphite-950/80 border-graphite-800;
}
.light-mode .header-container {
  @apply bg-white/80 border-graphite-200;
}
.nav-link {
  @apply text-graphite-400 hover:text-blood font-semibold transition-colors duration-200;
}
.light-mode .nav-link {
  @apply text-graphite-600 hover:text-blood;
}
.router-link-active {
  @apply text-blood;
}
.icon-btn {
  @apply p-2.5 hover:bg-graphite-800 rounded-full transition-colors duration-200 text-graphite-300 hover:text-white;
}
.light-mode .icon-btn {
  @apply hover:bg-graphite-100 text-graphite-600 hover:text-graphite-900;
}
</style>
