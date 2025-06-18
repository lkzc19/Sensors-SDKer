<script setup lang="ts">
import { ref, computed, h, watch } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NInput, NButton } from 'naive-ui'

import type { PropData } from '@/types/sensor-types'

const customProp = ref<PropData[]>([{ index: 0, pKey: '', pValue: '', pType: '' }])

const emit = defineEmits(['update'])

watch(customProp, (newVal: PropData[]) => {
  emit('update', newVal)
}, { deep: true })

const idm_version = ref('idm2')

// 生成唯一key
const generateKey = () => {
  return customProp.value.length === 0
    ? 0
    : Math.max(...customProp.value.map((row) => row.index)) + 1
}

// 检查最后一行是否从无数据变为有数据，并添加新行
const checkAndAddRow = () => {
  const lastRow = customProp.value[customProp.value.length - 1]
  if (lastRow && (lastRow.pKey || lastRow.pValue)) {
    addRow()
  }
}

// 新增行
const addRow = () => {
  customProp.value.push({
    index: generateKey(),
    pKey: '',
    pValue: '',
    pType: '',
  })
}

// 删除行
const delRow = (index: number) => {
  customProp.value.splice(index, 1)
}

// 动态列配置
const columns = computed<DataTableColumns<PropData>>(() => [
  {
    type: 'selection',
  },
  {
    title: '属性名',
    key: 'key',
    render: (row, index) =>
      h(NInput, {
        value: row.pKey,
        onUpdateValue: (v) => {
          customProp.value[index].pKey = v
          checkAndAddRow()
        },
      }),
  },
  {
    title: '属性值',
    key: 'value',
    render: (row, index) =>
      h(NInput, {
        value: row.pValue,
        onUpdateValue: (v) => {
          customProp.value[index].pValue = v
          checkAndAddRow()
        },
      }),
  },
  {
    title: '操作',
    key: 'actions',
    render: (row, index) => {
      if (index === customProp.value.length - 1) {
        return null
      }
      return h(
        NButton,
        {
          type: 'error',
          size: 'small',
          onClick: () => delRow(index),
        },
        '删除',
      )
    },
  },
])
</script>

<template>
  <n-space>
    <span>IMD 版本 </span>
    <n-radio
      :checked="idm_version === 'idm2'"
      value="idm2"
      name="idm-version"
      @change="idm_version = 'idm2'"
    >
      idm2
    </n-radio>
    <n-radio
      :checked="idm_version === 'idm3'"
      value="idm3"
      name="idm-version"
      @change="idm_version = 'idm3'"
    >
      idm3
    </n-radio>
  </n-space>
  <n-data-table :columns="columns" :data="customProp" :single-line="false" />
</template>
