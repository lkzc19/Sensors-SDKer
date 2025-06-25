<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'

import { NForm, NFormItem, NInput } from 'naive-ui'

import type { BaseTabData } from '@/types/TabData'

const props = defineProps<{
  saType: string
}>()

const event_array = [
  'LightAttack',
  'HeavyAttack',
  'Parry',
  'Riposte',
  'Block',
  'ShieldBash',
  'Roll',
  'Backstep',
  'Jump',
  'PlungingAttack',
  'ComboAttacks',
  'ChargeAttack',
  'UseItem',
  'TwoHandWield',
  'SpellCasting',
]

const distinct_id_array = [
  'the-unspeakable-deep',
  'the-banquet',
  'the-village',
  'the-forest',
  'the-keep',
  'the-imposter',
  'the-castle',
  'the-red-hall',
  'the-cave',
  'the-mire',
  'the-dome',
  'the-sacrifice',
  'the-ziggurat',
  'the-construct',
  'the-ruins',
  'the-pitchwoods',
  'the-lake',
  'the-alkymancery',
  'the-crypt',
  'the-palace',
  'ronin-cran',
  'the-dried-king',
  'the-witch-of-the-lake',
  'the-nameless-god',
]

const data = ref<BaseTabData>({
  event: event_array[Math.floor(Math.random() * event_array.length)],
  item_type: '',
  item_id: '',
  time: '',
  distinct_id: distinct_id_array[Math.floor(Math.random() * distinct_id_array.length)],
  login_id: distinct_id_array[Math.floor(Math.random() * distinct_id_array.length)],
})

let event_tmp = data.value.event

watch(
  () => props.saType,
  (newVal, oldVal) => {
    if ('track' === oldVal && 'track' !== newVal) {
      event_tmp = data.value.event
    }
    if ('track' === newVal) {
      data.value.event = event_tmp
    } else if ('track_signup' === newVal) {
      data.value.event = '$SignUp'
    } else if ('track_id_bind' === newVal) {
      data.value.event = '$BindID'
    } else if ('track_id_unbind' === newVal) {
      data.value.event = '$UnbindID'
    }
  },
)

const emit = defineEmits(['updateData'])
// 数据初始化后触发事件
emit('updateData', data.value)
watch(
  data,
  (newVal: BaseTabData) => {
    emit('updateData', newVal)
  },
  { deep: true },
)

const rules = {
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
    :model="data"
    :rules="rules"
    :style="{
      maxWidth: '640px',
    }"
  >
    <n-form-item label="event" v-show="props.saType.startsWith('track')">
      <n-input
        v-model:value="data.event"
        placeholder="输入事件名"
        :disabled="props.saType !== 'track'"
      />
    </n-form-item>
    <n-form-item label="item_type" v-show="props.saType.startsWith('item')">
      <n-input
        v-model:value="data.item_type"
        placeholder="输入物品所属类型"
      />
    </n-form-item>
    <n-form-item label="item_id" v-show="props.saType.startsWith('item')">
      <n-input
        v-model:value="data.item_id"
        placeholder="输入物品ID"
      />
    </n-form-item>
    <n-form-item label="distinct_id" v-show="'track_signup' !== props.saType">
      <n-input v-model:value="data.distinct_id" placeholder="输入distinct_id" />
    </n-form-item>
    <n-form-item label="login_id" v-show="'track_signup' === props.saType">
      <n-input v-model:value="data.login_id" placeholder="login_id" />
    </n-form-item>
  </n-form>
</template>
