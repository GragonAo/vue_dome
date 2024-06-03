import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'md-editor-v3/lib/style.css';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
