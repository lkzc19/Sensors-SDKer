<script setup lang="ts">
import { ref } from 'vue'

import { zhCN, dateZhCN } from 'naive-ui'

import sensors from 'sa-sdk-javascript'

import * as StringUtils from '@/utils/StringUtils'
import type { BaseTabData, OtherTabData } from '@/types/TabData'

import BaseTab from './components/BaseTab.vue'
import CustomTab from './components/CustomTab.vue'
import IdmTab from './components/IdmTab.vue'

const serverURL = ref('https://webhook.site/2cfbbc96-7a2c-440a-a4cc-d7adafb80d39')

const saTypeOptions = [
  { label: 'track', value: 'track' },
  { label: 'track_signup', value: 'track_signup' },
  { label: 'track_id_bind', value: 'track_id_bind', disabled: true },
  { label: 'track_id_unbind', value: 'track_id_unbind', disabled: true },
  { label: 'profile_set', value: 'profile_set' },
  { label: 'profile_set_once', value: 'profile_set_once' },
  { label: 'profile_append', value: 'profile_append' },
  { label: 'profile_increment', value: 'profile_increment', disabled: true },
  { label: 'profile_unset', value: 'profile_unset', disabled: true },
  { label: 'profile_delete', value: 'profile_delete', disabled: true },
  { label: 'item_set', value: 'item_set', disabled: true },
  { label: 'item_delete', value: 'item_delete', disabled: true },
]
const saType = ref('track')

// 4个tab中收集上的数据

const baseTabData = ref<BaseTabData>()
const handleBaseTabData = (data: BaseTabData) => {
  baseTabData.value = data
}

const idmTabData = ref<OtherTabData[]>([])
const handleIdmTabData = (data: OtherTabData[]) => {
  idmTabData.value = data
}

const customTabData = ref<OtherTabData[]>([])
const handleCustomTabData = (data: OtherTabData[]) => {
  customTabData.value = data
}

const send = () => {
  let identities: Record<string, string> = {}
  if (baseTabData.value?.idmv === 'idm3') {
    identities = Object.fromEntries(
      idmTabData.value
        .filter(({ pKey, pValue }) => !StringUtils.isEmpty(pKey) && pValue !== null)
        .map(({ pKey, pValue }) => [pKey, pValue]),
    )
  }

  const properties = customTabData.value.reduce(
    (r: Record<string, any>, { pKey, pValue, pType }) => {
      if (StringUtils.isEmpty(pKey) || pValue === null) {
        return r
      }

      if ('Bool' === pType) {
        pValue = pValue === 'true'
      }

      r[pKey] = pValue
      return r
    },
    {} as Record<string, any>,
  )

  sensors.init({
    server_url: serverURL.value,
    show_log: true,
    use_client_time: true,
    heatmap: {
      clickmap: 'not_collect',
      scroll_notice_map: 'not_collect',
    },
  })

  if (StringUtils.isNotEmpty(baseTabData.value!.distinct_id)) {
    console.log(sensors.identify(baseTabData.value!.distinct_id!, false))
  }

  if ('track' === saType.value) {
    sensors.track(baseTabData.value!.event!, {
      ...properties,
    })
  } else if ('track_signup' === saType.value) {
    sensors.login(baseTabData.value!.login_id)
  } else if ('track_id_bind' === saType.value) {
    console.log('暂未支持')
  } else if ('track_id_unbind' === saType.value) {
    console.log('暂未支持')
  } else if ('profile_set' === saType.value) {
    sensors.setProfile(properties)
  } else if ('profile_set_once' === saType.value) {
    sensors.setOnceProfile(properties)
  } else if ('profile_append' === saType.value) {
    sensors.appendProfile(properties)
  } else if ('profile_increment' === saType.value) {
    console.log('暂未支持')
    // sensors.incrementProfile(properties)
  } else if ('profile_unset' === saType.value) {
    console.log('暂未支持')
    // sensors.unsetProfile(properties)
  } else if ('profile_delete' === saType.value) {
    console.log('暂未支持')
    // sensors.deleteProfile()
  } else if ('item_set' === saType.value) {
    console.log('暂未支持')
    // sensors.setItem(properties)
  } else if ('item_delete' === saType.value) {
    console.log('暂未支持')
    // sensors.deleteItem(properties)
  }
}
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div class="sa-container">
      <div class="sa-header">
        <n-space vertical>
          <n-select v-model:value="saType" :options="saTypeOptions" size="large" />
        </n-space>
        <n-input type="text" size="large" placeholder="大" v-model:value="serverURL" />
        <n-button type="success" size="large" @click="send">上 报</n-button>
      </div>

      <div class="sa-main">
        <n-card style="margin-bottom: 16px">
          <n-tabs type="line">
            <n-tab-pane name="base" display-directive="show" tab="基础属性">
              <BaseTab @updateData="handleBaseTabData" :saType="saType" />
            </n-tab-pane>
            <n-tab-pane
              name="idm"
              display-directive="show"
              tab="ID关联"
              :disabled="baseTabData?.idmv === 'idm2'"
            >
              <IdmTab @updateData="handleIdmTabData" />
            </n-tab-pane>
            <n-tab-pane name="custom" display-directive="show" tab="自定义属性">
              <CustomTab @updateData="handleCustomTabData" />
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

.sa-header .n-select {
  width: 160px;
}

.sa-header .n-button {
  width: 120px;
}
</style>
