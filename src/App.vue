<template>
  <div :class="authStore.tema === 'claro' ? 'light-mode' : ''" class="min-h-screen bg-inherit text-inherit">
    <Header @toggle-auth="showAuthModal = !showAuthModal" />
    <AuthModal v-if="showAuthModal && !authStore.usuarioLogado" />
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import AuthModal from './components/AuthModal.vue'
import { authStore } from './stores/authStore'

const showAuthModal = ref(false)
</script>
