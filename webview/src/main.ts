import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import {
  // create naive ui
  create,
  // component
  NButton,
  NInput,
  NSelect,
  NCard,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NDataTable,
} from 'naive-ui'

const naive = create({
  components: [NButton, NInput, NSelect, NCard, NTabs, NTabPane, NForm, NFormItem, NDataTable],
})

const app = createApp(App)
app.use(naive)
app.mount('#app')
