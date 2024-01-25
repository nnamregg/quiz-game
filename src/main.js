import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/tailwind.css'

const app = createApp(App)
const pinia = createPinia()

app.config.performance = true;

app.use(pinia)
app.mount('#app')
