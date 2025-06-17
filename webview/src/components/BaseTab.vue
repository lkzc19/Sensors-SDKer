<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'

const formBase = ref({
  event: '',
  time: '',
})

const ruleBase = {
  event: { required: true },
  time: { required: true },
}

</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    :show-require-mark="true"
    :model="formBase"
    :rules="ruleBase"
    :style="{
      maxWidth: '640px',
    }"
  >
    <n-form-item label="事件名">
      <n-input v-model:value="formBase.event" placeholder="输入事件名" />
    </n-form-item>
    <n-form-item label="时间戳">
      <n-input v-model:value="formBase.time" placeholder="输入时间戳" />
    </n-form-item>
  </n-form>
</template>