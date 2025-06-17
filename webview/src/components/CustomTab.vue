<script setup lang="ts">
import { ref, computed, h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NInput, NButton } from 'naive-ui'

interface PropData {
  index: number
  key: string
  value: string
  type: string
}

const customProp = ref<PropData[]>([])

// 生成唯一key
const generateKey = () => {
  return customProp.value.length === 0 ? 0 : Math.max(...customProp.value.map(row => row.index)) + 1
}

// 新增行
const addRow = () => {
  customProp.value.push({
    index: generateKey(),
    key: '',
    value: '',
    type: ''
  })
}

// 删除行
const deleteRow = (index: number) => {
  customProp.value.splice(index, 1)
}

// 动态列配置
const columns = computed<DataTableColumns<PropData>>(() => [
  {
    title: '属性名',
    key: 'key',
    render: (row, index) => h(NInput, {
      value: row.key,
      onUpdateValue: (v) => { customProp.value[index].key = v }
    })
  },
  {
    title: '属性值',
    key: 'age',
    render: (row, index) => h(NInput, {
      value: row.value,
      onUpdateValue: (v) => { customProp.value[index].value = v }
    })
  },
  {
    title: '操作',
    key: 'actions',
    render: (row, index) => h(NButton, {
      type: 'error',
      size: 'small',
      onClick: () => deleteRow(index)
    }, '删除')
  }
])
</script>

<template>
  <n-data-table :columns="columns" :data="customProp" />
</template>