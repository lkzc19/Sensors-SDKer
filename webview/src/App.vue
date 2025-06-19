<script setup lang="ts">
import { ref } from 'vue'

import { zhCN, dateZhCN } from 'naive-ui'

import sensors from 'sa-sdk-javascript'

import type { BaseTabData, OtherTabData } from '@/types/TabData'

import BaseTab from './components/BaseTab.vue'
import CustomTab from './components/CustomTab.vue'
import IdmTab from './components/IdmTab.vue'
import PresetTab from './components/PresetTab.vue'


const serverURL = ref('https://webhook.site/6c8f1b35-88cf-46ee-ba3d-6f5309adb30f')

const saTypeOptions = [
  { label: 'track', value: 'track' },
  { label: 'profile', value: 'profile' },
]
const saType = ref('track')

// 4个tab中收集上的数据

const baseTabData = ref<BaseTabData>() 
const handleBaseTabData = (data: BaseTabData) => {
  baseTabData.value = data
}

const customTabData = ref<OtherTabData[]>([])
const handleCustomUpdate = (data: OtherTabData[]) => {
  customTabData.value = data
}

const send = () => {
  console.log(baseTabData.value)
  console.log(customTabData.value)

  sensors.init({
    server_url: serverURL.value,
    show_log: true,
    use_client_time:true,
    heatmap: {
      clickmap: 'not_collect',
      scroll_notice_map:'not_collect'
    },
  })
  
  if ('track' === saType.value) {
    sensors.track(baseTabData.value!.event!, {

    })
  }
  console.log("send");
};
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div class="sa-container">
      <div class="sa-header">
        <n-space vertical>
          <n-select v-model:value="saType" :options="saTypeOptions" />
        </n-space>

        <n-input type="text" size="large" placeholder="大" v-model:value="serverURL"/>
        <n-button type="success" @click="send">上报</n-button>
      </div>

      <div class="sa-main">
        <n-card style="margin-bottom: 16px">
          <n-tabs type="line">
            <n-tab-pane name="base" display-directive="show" tab="基础属性">
              <BaseTab @updateData="handleBaseTabData" />
            </n-tab-pane>
            <n-tab-pane name="idm" display-directive="show" tab="ID关联">
              <IdmTab />
            </n-tab-pane>
            <n-tab-pane name="custom" display-directive="show" tab="自定义属性">
              <CustomTab @update="handleCustomUpdate" />
            </n-tab-pane>
            <n-tab-pane name="preset" display-directive="show" tab="预置属性">
              <PresetTab />
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped>
.sa-header {
  display: flex;
  gap: 8px;
  padding: 12px;
  align-items: stretch;
}

.sa-main {
  flex: 1;
  overflow: auto;
  padding: 12px;
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
</style>
