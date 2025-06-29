<script setup lang="ts">
import { ref } from 'vue'

import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { ChevronDown, PaperPlaneSharp } from '@vicons/ionicons5'

import sensors from 'sa-sdk-javascript'

import * as StringUtils from '@/utils/StringUtils'
import type { BaseTabData, OtherTabData } from '@/types/TabData'

import BaseTab from './components/BaseTab.vue'
import CustomTab from './components/CustomTab.vue'

const serverURL = ref('http://10.129.20.17:8106/sa?project=default')

const saTypeOptions = [
  { label: 'track', value: 'track' },
  { label: 'track_signup', value: 'track_signup' },
  { label: 'track_id_bind', value: 'track_id_bind' },
  { label: 'track_id_unbind', value: 'track_id_unbind' },
  { label: 'profile_set', value: 'profile_set' },
  { label: 'profile_set_once', value: 'profile_set_once' },
  { label: 'profile_append', value: 'profile_append' },
  { label: 'profile_increment', value: 'profile_increment' },
  { label: 'profile_unset', value: 'profile_unset' },
  { label: 'profile_delete', value: 'profile_delete' },
  { label: 'item_set', value: 'item_set' },
  { label: 'item_delete', value: 'item_delete' },
]
const saType = ref('track')

// 2个tab中收集上的数据

const baseTabData = ref<BaseTabData>()
const handleBaseTabData = (data: BaseTabData) => {
  baseTabData.value = data
}

const customTabData = ref<OtherTabData[]>([])
const handleCustomTabData = (data: OtherTabData[]) => {
  customTabData.value = data
}

const loading = ref(false)
const send = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 300)
  const properties = customTabData.value.reduce(
    (r: Record<string, any>, { pKey, pValue, pType }) => {
      if ('profile_increment' === saType.value || 'profile_unset' === saType.value) {
        if (StringUtils.isEmpty(pKey)) {
          return r
        }
      } else {
        if (StringUtils.isEmpty(pKey) || pValue === null) {
          return r
        }
        if ('Bool' === pType) {
          pValue = pValue === 'true'
        }
      }

      r[pKey] = pValue
      return r
    },
    {} as Record<string, any>,
  )
  console.log(properties)

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
    sensors.identify(baseTabData.value!.distinct_id, false)
  }

  if ('track' === saType.value) {
    sensors.track(baseTabData.value!.event!, {
      ...properties,
    })
  } else if ('track_signup' === saType.value) {
    sensors.login(baseTabData.value!.login_id)
  } else if ('track_id_bind' === saType.value) {
    sensors.bind(baseTabData.value!.idm_key, baseTabData.value!.idm_value)
  } else if ('track_id_unbind' === saType.value) {
    sensors.unbind(baseTabData.value!.idm_key, baseTabData.value!.idm_value)
  } else if ('profile_set' === saType.value) {
    sensors.setProfile(properties)
  } else if ('profile_set_once' === saType.value) {
    sensors.setOnceProfile(properties)
  } else if ('profile_append' === saType.value) {
    sensors.appendProfile(properties)
  } else if ('profile_increment' === saType.value) {
    sensors.incrementProfile(properties)
  } else if ('profile_unset' === saType.value) {
    sensors.unsetProfile(Object.keys(properties))
  } else if ('profile_delete' === saType.value) {
    sensors.deleteProfile()
  } else if ('item_set' === saType.value) {
    sensors.setItem(baseTabData.value!.item_type, baseTabData.value!.item_id, properties)
  } else if ('item_delete' === saType.value) {
    sensors.deleteItem(baseTabData.value!.item_type, baseTabData.value!.item_id)
  }
}

const logout = () => {
  sensors.logout()
}

// const bg = ref('白')
// const changeBodyBg = () => {
//   if (document.body.style.backgroundColor === 'rgb(41, 41, 41)') {
//     document.body.style.backgroundColor = '#fff'
//     bg.value = '黑'
//   } else {
//     document.body.style.backgroundColor = '#292929'
//     bg.value = '白'
//   }
// }
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
    <!-- <n-back-top :right="100" show @click="changeBodyBg">
      <div>变 {{ bg }}</div>
    </n-back-top> -->
    <div class="sa-header">
      <n-space vertical>
        <n-select v-model:value="saType" :options="saTypeOptions" size="large" />
      </n-space>
      <n-input type="text" size="large" placeholder="数据接收地址" v-model:value="serverURL" />
      <n-button-group size="large">
        <n-button class="send" :loading="loading" type="success" @click="send">
          <template #icon>
            <n-icon>
              <PaperPlaneSharp />
            </n-icon>
          </template>
          上 报
        </n-button>
        <n-dropdown
          placement="bottom-end"
          trigger="click"
          size="medium"
          :options="[{ label: '清除缓存(logout)', key: 'logout' }]"
          @click="logout"
        >
          <n-button class="logout" type="success" strong secondary>
            <template #icon>
              <n-icon>
                <ChevronDown />
              </n-icon>
            </template>
          </n-button>
        </n-dropdown>
      </n-button-group>
    </div>
    <div>
      <n-card>
        <n-tabs>
          <n-tab-pane name="base" display-directive="show" tab="基础属性">
            <BaseTab @updateData="handleBaseTabData" :saType="saType" />
          </n-tab-pane>
          <n-tab-pane
            name="custom"
            display-directive="show"
            tab="自定义属性"
            :disabled="'profile_delete' === saType || 'item_delete' === saType"
          >
            <CustomTab
              @updateData="handleCustomTabData"
              :saType="saType"
              v-show="'profile_delete' !== saType && 'item_delete' !== saType"
            />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </n-config-provider>
</template>

<style scoped>
.sa-header {
  display: flex;
  gap: 8px;
  padding-bottom: 20px;
  align-items: stretch;
}

.sa-header .n-select {
  width: 160px;
}

.sa-header .n-button-group .send {
  width: 110px;
}

.sa-header .n-button-group .logout {
  width: 40px;
}
</style>
