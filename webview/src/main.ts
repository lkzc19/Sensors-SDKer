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
  NInputGroup,
  NInputGroupLabel,
  NInput,
  NInputNumber,
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
    NInputGroup,
    NInputGroupLabel,
    NInputNumber,
    NInput,
    NButton,
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
  ],
})

const app = createApp(App)
app.use(naive)
app.mount('#app')
