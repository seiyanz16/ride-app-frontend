import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueGoogleMaps from '@fawmi/vue-google-maps'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// app.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyCnJt8m5vHxG6L9Tc6Rm6q4w3eFv9x9',
//         libraries: 'places'
//     }
// })

app.mount('#app')
