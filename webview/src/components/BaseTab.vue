<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'

const data = ref({
  event: '',
  time: '',
  distinct_id: '',
})

const rules = {
  event: { required: true },
  time: { required: true },
  distinct_id: { required: true },
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

const ts = ref(new Date().getTime().toString());
const dt = ref(formatDate(new Date()));
const timeType = ref('timestamp')
const timeTypeOptions = [
  { label: '默认时间', value: 'default' },
  { label: '时间戳', value: 'timestamp' },
  { label: '日期时间', value: 'datetime' },
]

</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    :show-require-mark="true"
    :model="data"
    :rules="rules"
    :style="{
      maxWidth: '640px',
    }"
  >
    <n-form-item label="事件名">
      <n-input v-model:value="data.event" placeholder="输入事件名" />
    </n-form-item>
    <n-form-item label="时间戳">
      <n-input-group>
        <n-select :style="{ width: '20%' }" :options="timeTypeOptions" v-model:value="timeType" />
        <n-input
          v-if="timeType === 'default'"
          placeholder="客户端上报的时间"
          disabled
          :style="{ width: '80%' }"
        />
        <n-input
          v-if="timeType === 'timestamp'"
          v-model:value="ts" 
          placeholder="输入时间戳"
          :style="{ width: '80%' }"
        />
        <n-date-picker 
          v-if="timeType === 'datetime'"
          v-model:formatted-value="dt"
          value-format="yyyy.MM.dd HH:mm:ss"
          type="datetime"
          :style="{ width: '80%' }"
        />
      </n-input-group>
    </n-form-item>
    <n-form-item label="distinct_id">
      <n-input v-model:value="data.distinct_id" placeholder="输入distinct_id" />
    </n-form-item>
  </n-form>
</template>