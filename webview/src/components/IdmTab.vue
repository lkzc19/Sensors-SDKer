<script setup lang="ts">
import { ref, computed, h, watch } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NInput, NButton } from 'naive-ui'

import type { OtherTabData } from '@/types/TabData'

const data = ref<OtherTabData[]>([{ index: 0, pKey: '', pValue: '', pType: '' }])

const emit = defineEmits(['update'])

watch(data, (newVal: OtherTabData[]) => {
  emit('update', newVal)
}, { deep: true })

// 生成唯一key
const generateKey = () => {
  return data.value.length === 0
    ? 0
    : Math.max(...data.value.map((row) => row.index)) + 1
}

// 检查最后一行是否从无数据变为有数据，并添加新行
const checkAndAddRow = () => {
  const lastRow = data.value[data.value.length - 1]
  if (lastRow && (lastRow.pKey || lastRow.pValue)) {
    addRow()
  }
}

// 新增行
const addRow = () => {
  data.value.push({
    index: generateKey(),
    pKey: '',
    pValue: '',
    pType: '',
  })
}

// 删除行
const delRow = (index: number) => {
  data.value.splice(index, 1)
}

// 动态列配置
const columns = computed<DataTableColumns<OtherTabData>>(() => [
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
          data.value[index].pKey = v
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
          data.value[index].pValue = v
          checkAndAddRow()
        },
      }),
  },
  {
    title: '操作',
    key: 'actions',
    render: (row, index) => {
      if (index === data.value.length - 1) {
        return null
      }
      return h(
        NButton,
        {
          type: 'error',
          size: 'small',
          onClick: () => delRow(index),
        },
        () => '删除',
      )
    },
  },
])
</script>

<template>
  <n-data-table :columns="columns" :data="data" :row-key="(data: OtherTabData) => data.index" :single-line="false"/>
</template>
