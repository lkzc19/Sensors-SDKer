<template>
  <n-form-item :label="pLabel">
    <n-input-group>
      <n-input :value="data" :placeholder="pPlaceholder" :disabled="pDisabled" />
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
  </n-form-item>
</template>

<script setup lang="ts">
import { SparklesSharp } from '@vicons/ionicons5'

import * as ArrayUtils from '@/utils/ArrayUtils'

const data = defineModel()

const { pDisabled = false } = defineProps<{
  pLabel: string
  pPlaceholder: string
  pDisabled?: boolean
  pR: string[]
}>()
</script>
