import { reactive } from 'vue'

export const authStore = reactive({
  usuarioLogado: localStorage.getItem('usuarioLogado') || null,
  tema: localStorage.getItem('tema') || 'escuro',
  userData: JSON.parse(localStorage.getItem('userData')) || {
    bio: 'Apaixonado por filmes de terror e crítica cinematográfica.',
    avatar: null
  },

  login(usuario, senha) {
    const usersDB = JSON.parse(localStorage.getItem('usersDB')) || []
    const usuarioValido = usersDB.find(u => u.user === usuario && u.pass === senha)
    
    if (usuarioValido) {
      this.usuarioLogado = usuario
      localStorage.setItem('usuarioLogado', usuario)
      return true
    }
    return false
  },

  register(usuario, senha) {
    const usersDB = JSON.parse(localStorage.getItem('usersDB')) || []
    
    if (usersDB.find(u => u.user === usuario)) {
      return false
    }
    
    usersDB.push({ user: usuario, pass: senha })
    localStorage.setItem('usersDB', JSON.stringify(usersDB))
    return true
  },

  logout() {
    this.usuarioLogado = null
    localStorage.removeItem('usuarioLogado')
  },

  toggleTema() {
    this.tema = this.tema === 'escuro' ? 'claro' : 'escuro'
    localStorage.setItem('tema', this.tema)
    
    if (this.tema === 'claro') {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  },

  updateUserData(data) {
    this.userData = { ...this.userData, ...data }
    localStorage.setItem('userData', JSON.stringify(this.userData))
  },

  initTheme() {
    if (this.tema === 'claro') {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  }
})
