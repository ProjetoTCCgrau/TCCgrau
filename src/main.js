import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authStore } from './stores/authStore'
import './style.css'

authStore.initTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
