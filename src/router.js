import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Ratings from './pages/Ratings.vue'
import Ranking from './pages/Ranking.vue'
import Comments from './pages/Comments.vue'
import Profile from './pages/Profile.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/ratings', component: Ratings, name: 'ratings' },
  { path: '/ranking', component: Ranking, name: 'ranking' },
  { path: '/comments', component: Comments, name: 'comments' },
  { path: '/profile', component: Profile, name: 'profile' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'profile') {
    const usuarioLogado = localStorage.getItem('usuarioLogado')
    if (!usuarioLogado) {
      alert('Você precisa estar logado para acessar o perfil.')
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
