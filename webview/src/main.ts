import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import {
  // create naive ui
  create,
  // component
  NConfigProvider,
  NSpace,
  NButton,
  NInput,
  NInputGroup,
  NSelect,
  NCard,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NDataTable,
  NSwitch,
  NRadio,
  NRadioGroup,

  NDatePicker,
  NTimePicker,
} from 'naive-ui'

const naive = create({
  components: [
    NConfigProvider,
    NSpace,
    NButton, NInput, NInputGroup, NSelect, NCard, NTabs, NTabPane, NForm, NFormItem, NDataTable, NSwitch,
    NRadio, NRadioGroup,
    NDatePicker, NTimePicker
  ],
})

const app = createApp(App)
app.use(naive)
app.mount('#app')
