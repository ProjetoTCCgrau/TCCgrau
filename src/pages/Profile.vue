<template>
  <main class="flex-1">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="!editMode" class="space-y-8">
        <div class="card-modern overflow-hidden">
          <div class="h-48 bg-gradient-to-br from-blood via-blood-dark to-graphite-950 light-mode:to-blood-light"></div>
          
          <div class="relative px-8 pb-8">
            <div class="flex flex-col md:flex-row gap-8 -mt-24">
              <div class="flex flex-col items-center md:items-start">
                <div class="w-48 h-48 rounded-3xl bg-graphite-900 border-8 border-graphite-950 overflow-hidden shadow-2xl flex items-center justify-center light-mode:border-white light-mode:bg-graphite-100">
                  <img v-if="authStore.userData.avatar" :src="authStore.userData.avatar" class="w-full h-full object-cover" />
                  <User v-else :size="80" class="text-graphite-700 light-mode:text-graphite-400" />
                </div>
                <button @click="editMode = true" class="mt-6 btn-primary w-full">
                  <Edit3 :size="18" />
                  Editar Perfil
                </button>
              </div>

              <div class="flex-1 pt-24 md:pt-28">
                <h1 class="text-4xl font-bold text-white mb-2 light-mode:text-graphite-900">{{ authStore.usuarioLogado }}</h1>
                <p class="text-graphite-400 mb-8 flex items-center gap-2 light-mode:text-graphite-500">
                  <Calendar :size="16" />
                  Membro desde {{ memberSince }}
                </p>
                
                <div class="grid grid-cols-2 gap-6">
                  <div class="bg-graphite-800/50 rounded-2xl p-6 border border-graphite-800 light-mode:bg-graphite-50 light-mode:border-graphite-200">
                    <p class="text-graphite-400 text-sm font-bold mb-1 light-mode:text-graphite-500">Filmes Avaliados</p>
                    <p class="text-3xl font-bold text-blood">12</p>
                  </div>
                  <div class="bg-graphite-800/50 rounded-2xl p-6 border border-graphite-800 light-mode:bg-graphite-50 light-mode:border-graphite-200">
                    <p class="text-graphite-400 text-sm font-bold mb-1 light-mode:text-graphite-500">Nota Média</p>
                    <p class="text-3xl font-bold text-blood">8.5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-modern p-10 space-y-6">
          <h2 class="text-2xl font-bold text-blood flex items-center gap-2">
            <Info :size="24" />
            Sobre
          </h2>
          <p class="text-graphite-300 leading-relaxed text-lg light-mode:text-graphite-600">{{ authStore.userData.bio }}</p>
        </div>

        <button @click="handleLogout" class="w-full px-6 py-4 bg-graphite-900 hover:bg-red-900/20 border border-graphite-800 text-red-500 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 light-mode:bg-white light-mode:border-graphite-200">
          <LogOut :size="20" />
          Sair da Conta
        </button>
      </div>

      <div v-else class="space-y-8">
        <div class="flex items-center gap-4">
          <button @click="cancelEdit" class="p-2 hover:bg-graphite-800 rounded-full transition-colors light-mode:hover:bg-graphite-100">
            <ArrowLeft :size="24" />
          </button>
          <h2 class="text-4xl font-bold text-blood">Editar Perfil</h2>
        </div>

        <div class="card-modern p-10 space-y-8">
          <div class="space-y-4">
            <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Foto de Perfil</label>
            <div class="flex items-center gap-8">
              <div class="w-32 h-32 rounded-3xl bg-graphite-800 overflow-hidden border-4 border-graphite-700 flex items-center justify-center light-mode:bg-graphite-100 light-mode:border-graphite-200">
                <img v-if="editForm.avatar" :src="editForm.avatar" class="w-full h-full object-cover" />
                <User v-else :size="48" class="text-graphite-600 light-mode:text-graphite-400" />
              </div>
              <div class="flex-1 space-y-3">
                <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden">
                <button @click="$refs.fileInput.click()" class="btn-secondary w-full">
                  <Upload :size="18" />
                  Escolher Imagem
                </button>
                <p class="text-xs text-graphite-500 text-center">Recomendado: JPG ou PNG, máx 2MB</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Sobre Você</label>
            <textarea v-model="editForm.bio" placeholder="Conte um pouco sobre você..." rows="4" class="input-field resize-none"></textarea>
          </div>

          <div class="section-divider"></div>

          <div class="space-y-6">
            <h3 class="text-xl font-bold text-blood flex items-center gap-2">
              <Lock :size="20" />
              Segurança
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Senha Atual</label>
                <input v-model="editForm.currentPassword" type="password" placeholder="Sua senha atual" class="input-field">
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-bold text-graphite-300 light-mode:text-graphite-600">Nova Senha</label>
                <input v-model="editForm.newPassword" type="password" placeholder="Nova senha" class="input-field">
              </div>
            </div>
          </div>

          <div class="flex gap-4 pt-6">
            <button @click="cancelEdit" class="btn-secondary flex-1">Cancelar</button>
            <button @click="saveProfile" class="btn-primary flex-1">Salvar Alterações</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authStore'
import { 
  User, Edit3, Calendar, Info, LogOut, 
  ArrowLeft, Upload, Lock 
} from 'lucide-vue-next'

const router = useRouter()
const editMode = ref(false)
const fileInput = ref(null)

const editForm = ref({
  avatar: authStore.userData.avatar,
  bio: authStore.userData.bio,
  currentPassword: '',
  newPassword: ''
})

const memberSince = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const cancelEdit = () => {
  editMode.value = false
  editForm.value = {
    avatar: authStore.userData.avatar,
    bio: authStore.userData.bio,
    currentPassword: '',
    newPassword: ''
  }
}

const saveProfile = () => {
  if (editForm.value.newPassword && !editForm.value.currentPassword) {
    alert('Digite sua senha atual para alterar a senha!')
    return
  }

  if (editForm.value.newPassword && editForm.value.currentPassword) {
    const usersDB = JSON.parse(localStorage.getItem('usersDB')) || []
    const userIndex = usersDB.findIndex(u => u.user === authStore.usuarioLogado && u.pass === editForm.value.currentPassword)
    
    if (userIndex !== -1) {
      usersDB[userIndex].pass = editForm.value.newPassword
      localStorage.setItem('usersDB', JSON.stringify(usersDB))
    } else {
      alert('Senha atual incorreta!')
      return
    }
  }

  authStore.updateUserData({
    avatar: editForm.value.avatar,
    bio: editForm.value.bio
  })

  editMode.value = false
  alert('Perfil atualizado com sucesso!')
}

const handleLogout = () => {
  authStore.logout()
  alert('Você saiu da conta.')
  router.push('/')
}
</script>
