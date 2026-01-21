<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" @click="closeModal">
    <div class="bg-graphite-900 rounded-[2.5rem] w-full max-w-md shadow-2xl border border-graphite-800 relative overflow-hidden light-mode:bg-white light-mode:border-graphite-100" @click.stop>
      <button @click="closeModal" class="absolute top-8 right-8 text-graphite-500 hover:text-white transition-colors duration-200 light-mode:hover:text-graphite-900">
        <X :size="24" />
      </button>

      <div class="p-12">
        <form v-if="!showRegister" @submit.prevent="handleLogin" class="space-y-8">
          <div class="space-y-2">
            <h2 class="text-4xl font-bold text-blood">Entrar</h2>
            <p class="text-graphite-500 font-medium">Bem-vindo de volta ao Cinneview.</p>
          </div>
          
          <div class="space-y-5">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Usuário</label>
              <div class="relative">
                <User class="absolute left-4 top-1/2 -translate-y-1/2 text-graphite-500" :size="18" />
                <input v-model="loginUser" type="text" placeholder="Seu usuário" class="input-field pl-12" required>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Senha</label>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-graphite-500" :size="18" />
                <input v-model="loginPass" type="password" placeholder="Sua senha" class="input-field pl-12" required>
              </div>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full py-4 text-lg">Entrar</button>
          
          <p class="text-center text-graphite-500 font-medium">
            Não tem conta? 
            <button type="button" @click.prevent="showRegister = true" class="text-blood hover:text-blood-light font-bold transition-colors duration-200">
              Criar agora
            </button>
          </p>
        </form>

        <form v-else @submit.prevent="handleRegister" class="space-y-8">
          <div class="space-y-2">
            <h2 class="text-4xl font-bold text-blood">Criar Conta</h2>
            <p class="text-graphite-500 font-medium">Junte-se à nossa comunidade.</p>
          </div>
          
          <div class="space-y-5">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Usuário</label>
              <div class="relative">
                <User class="absolute left-4 top-1/2 -translate-y-1/2 text-graphite-500" :size="18" />
                <input v-model="regUser" type="text" placeholder="Escolha um usuário" class="input-field pl-12" required>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Senha</label>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-graphite-500" :size="18" />
                <input v-model="regPass" type="password" placeholder="Escolha uma senha" class="input-field pl-12" required>
              </div>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full py-4 text-lg">Criar Conta</button>
          
          <p class="text-center text-graphite-500 font-medium">
            Já tem conta? 
            <button type="button" @click.prevent="showRegister = false" class="text-blood hover:text-blood-light font-bold transition-colors duration-200">
              Entrar
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { authStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { X, User, Lock } from 'lucide-vue-next'

const router = useRouter()
const showRegister = ref(false)
const loginUser = ref('')
const loginPass = ref('')
const regUser = ref('')
const regPass = ref('')

const handleLogin = () => {
  if (authStore.login(loginUser.value, loginPass.value)) {
    alert(`Bem-vindo, ${loginUser.value}!`)
    closeModal()
    router.push('/')
  } else {
    alert('Usuário ou senha incorretos.')
  }
}

const handleRegister = () => {
  if (authStore.register(regUser.value, regPass.value)) {
    alert('Conta criada com sucesso!')
    showRegister.value = false
    regUser.value = ''
    regPass.value = ''
  } else {
    alert('Usuário já existe!')
  }
}

const closeModal = () => {
  showRegister.value = false
  loginUser.value = ''
  loginPass.value = ''
  regUser.value = ''
  regPass.value = ''
}
</script>
