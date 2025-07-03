<script setup lang="ts">
import { SparklesSharp } from '@vicons/ionicons5';

import * as ArrayUtils from '@/utils/ArrayUtils';

const data = defineModel();

const { pDisabled = false } = defineProps<{
  pPlaceholder: string;
  pDisabled?: boolean;
  pR: string[];
}>();
</script>

<template>
  <n-input-group>
    <n-input v-model:value="data" :placeholder="pPlaceholder" :disabled="pDisabled" />
    <n-button
      :disabled="pDisabled"
      strong
      secondary
      type="primary"
      @click="data = ArrayUtils.getRandomElement(pR)"
    >
      <template #icon>
        <n-icon>
          <SparklesSharp />
        </n-icon>
      </template>
    </n-button>
  </n-input-group>
</template>
