import { createApp } from 'vue'
import 'vuetify/styles'
import App from './App.vue'
import router from './router'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives
})

createApp(App)
.use(vuetify)
.use(router)
.mount('#app')
