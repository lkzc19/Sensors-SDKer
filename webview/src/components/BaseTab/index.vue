<script setup lang="ts">
import { ref, watch } from 'vue';

import BtInput from './BtInput.vue';
import type { BaseTabData } from '@/types/TabData';
import * as ArrayUtils from '@/utils/ArrayUtils';

const props = defineProps<{
  saType: string;
}>();

import { EVENT_ARRAY, IDENTITIES_ARRAY } from '@/constants/r';

const data = ref<BaseTabData>({
  event: ArrayUtils.getRandomElement(EVENT_ARRAY)!,
  idm_key: '',
  idm_value: '',
  item_type: '',
  item_id: '',
  distinct_id: ArrayUtils.getRandomElement(IDENTITIES_ARRAY)!,
  login_id: ArrayUtils.getRandomElement(IDENTITIES_ARRAY)!,
});

let event_tmp = data.value.event;

watch(
  () => props.saType,
  (newVal, oldVal) => {
    if ('track' === oldVal && 'track' !== newVal) {
      event_tmp = data.value.event;
    }
    if ('track' === newVal) {
      data.value.event = event_tmp;
    } else if ('track_signup' === newVal) {
      data.value.event = '$SignUp';
    } else if ('track_id_bind' === newVal) {
      data.value.event = '$BindID';
    } else if ('track_id_unbind' === newVal) {
      data.value.event = '$UnbindID';
    }
  },
);

const emit = defineEmits(['updateData']);
// 数据初始化后触发事件
emit('updateData', data.value);
watch(
  data,
  (newVal: BaseTabData) => {
    emit('updateData', newVal);
  },
  { deep: true },
);

const rules = {
  event: { required: true },
  time: { required: true },
};
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
    <n-form-item label="event" v-show="saType.startsWith('track')">
      <BtInput
        v-model="data.event"
        p-label="event"
        p-placeholder="输入事件名"
        :p-disabled="props.saType !== 'track'"
        :p-r="EVENT_ARRAY"
      />
    </n-form-item>

    <n-form-item label="idm_key" v-show="props.saType.endsWith('bind')">
      <n-input-group>
        <n-input
          v-model:value="data.idm_key"
          :placeholder="
            props.saType === 'track_id_bind' ? '输入要绑定id的key' : '输入要解绑id的key'
          "
        />
      </n-input-group>
    </n-form-item>

    <n-form-item label="idm_value" v-show="props.saType.endsWith('bind')">
      <n-input
        v-model:value="data.idm_value"
        :placeholder="props.saType === 'track_id_bind' ? '输入要绑定id的key' : '输入要解绑id的key'"
      />
    </n-form-item>

    <n-form-item label="item_type" v-show="props.saType.startsWith('item')">
      <n-input v-model:value="data.item_type" placeholder="输入物品所属类型" />
    </n-form-item>

    <n-form-item label="item_id" v-show="props.saType.startsWith('item')">
      <n-input v-model:value="data.item_id" placeholder="输入物品ID" />
    </n-form-item>

    <n-form-item label="distinct_id" v-show="'track_signup' !== props.saType">
      <BtInput
        v-show="'track_signup' !== props.saType"
        v-model="data.distinct_id"
        p-placeholder="输入distinct_id"
        :p-r="IDENTITIES_ARRAY"
      />
    </n-form-item>

    <n-form-item label="login_id" v-show="'track_signup' === props.saType">
      <BtInput
        v-model="data.login_id"
        p-label="login_id"
        p-placeholder="输入login_id"
        :p-r="IDENTITIES_ARRAY"
      />
    </n-form-item>
  </n-form>
</template>
