<script setup lang="ts">
import { ref } from 'vue'

import SA from 'sa-sdk-javascript'

import { NInput, NButton } from 'naive-ui'

import type { PropData } from '@/types/sensor-types'

import BaseTab from './components/BaseTab.vue'
import CustomTab from './components/CustomTab.vue'
import IdmTab from './components/IdmTab.vue'
import PresetTab from './components/PresetTab.vue'

// SA.init({
//   server_url: 'https://webhook.site/0928ce21-9bc6-4647-8c95-89caf70c4f28', // 注册地址
//   use_client_time:true,
//   heatmap: {
//      clickmap:'default',
//      scroll_notice_map:'not_collect'
//   },
// })

// const trackButtonClick = () => {
//   SA.track('button_click', {
//     type: 'button',
//   })
// }

const requestUrl = ref('')
const activeTab = ref('Params')
const tabs = ref(['Params', 'Headers', 'Body'])
const queryParams = ref([{ key: '', value: '' }])
const requestBody = ref('')
const responseData = ref('')

const addParam = () => {
  queryParams.value.push({ key: '', value: '' })
  SA.track('add_param')
}

const removeParam = (index: number) => {
  queryParams.value.splice(index, 1)
}

const saTypeOptions = [
  { label: 'track', value: 'track' },
  { label: 'profile', value: 'profile' },
]
const saType = ref('track')
const customData = ref()

const handleCustomUpdate = (newData: PropData[]) => {
  customData.value = newData
}
</script>

<template>
  <div class="sa-container">
    <div class="sa-header">
      <n-space vertical>
        <n-select v-model:value="saType" :options="saTypeOptions" />
      </n-space>

      <n-input type="text" size="large" placeholder="大" />
      <n-button type="success" @click="">上报</n-button>
    </div>

    <div class="sa-main">
      <n-card style="margin-bottom: 16px">
        <n-tabs type="line">
          <n-tab-pane name="base" tab="基础属性">
            <BaseTab />
          </n-tab-pane>
          <n-tab-pane name="idm" tab="ID关联">
            <IdmTab />
          </n-tab-pane>
          <n-tab-pane name="custom" tab="自定义属性">
            <CustomTab @update="handleCustomUpdate" />
          </n-tab-pane>
          <n-tab-pane name="preset" tab="预置属性">
            <PresetTab />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.sa-header {
  display: flex;
  gap: 8px;
  padding: 12px;
  align-items: stretch;
}

.sa-header .n-select,
.sa-header .n-button {
  flex: none;
  width: 120px;
  height: 40px;
  min-height: 40px;
}

.sa-header .n-input {
  flex: 1;
  min-width: 200px;
  height: 40px;
}

.sa-header .n-space {
  height: 40px;
  display: flex;
  align-items: center;
}

.sa-header .n-space :deep(.n-base-selection) {
  height: 100%;
}

.sa-header .n-select :deep(.n-base-selection),
.sa-header .n-input :deep(.n-input__input),
.sa-header .n-button :deep(button) {
  height: 100% !important;
}

.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}

.sa-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sa-main {
  flex: 1;
  overflow: auto;
  padding: 12px;
}
</style>
