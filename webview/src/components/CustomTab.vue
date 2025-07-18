<script setup lang="ts">
import type { VNodeArrayChildren } from 'vue';
import { ref, computed, h, watch } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import {
  NInputGroup,
  NInputGroupLabel,
  NInput,
  NInputNumber,
  NSelect,
  NButton,
  NDatePicker,
} from 'naive-ui';

import type { OtherTabData } from '@/types/TabData';

const props = defineProps<{
  saType: string;
}>();

const kTypeOptions = [
  { label: '字符串', value: 'String' },
  { label: '数值', value: 'Number' },
  { label: '布尔', value: 'Bool' },
  { label: '集合', value: 'List' },
  { label: '日期时间', value: 'Datetime' },
];

const data = ref<OtherTabData[]>([{ index: 0, pKey: '', pValue: null, pType: 'String' }]);

const emit = defineEmits(['updateData']);

watch(
  data,
  (newVal: OtherTabData[]) => {
    emit('updateData', newVal);
  },
  { deep: true },
);

// 生成唯一key
const generateKey = () => {
  return data.value.length === 0 ? 0 : Math.max(...data.value.map((row) => row.index)) + 1;
};

// 检查最后一行是否从无数据变为有数据，并添加新行
const checkAndAddRow = () => {
  const lastRow = data.value[data.value.length - 1];
  if (lastRow && (lastRow.pKey || lastRow.pValue)) {
    addRow();
  }
};

// 新增行
const addRow = () => {
  data.value.push({
    index: generateKey(),
    pKey: '',
    pValue: null,
    pType: 'String',
  });
};

// 删除行
const delRow = (index: number) => {
  data.value.splice(index, 1);
};

// 动态列配置
const columns = computed<DataTableColumns<OtherTabData>>(() => [
  {
    type: 'selection',
    width: 20,
  },
  {
    title: '属性名',
    key: 'key',
    width: '45%',
    render: (row, index) => {
      const group: VNodeArrayChildren = [];
      group.push(
        h(NInput, {
          value: row.pKey,
          style: 'width: 90%',
          onUpdateValue: (v) => {
            data.value[index].pKey = v;
            checkAndAddRow();
          },
        }),
      );

      if ('profile_increment' === props.saType) {
        group.push(
          h(
            NInputGroupLabel,
            {
              style: 'width: 10%; min-width: 100px',
            },
            () => '数值',
          ),
        );
      } else {
        group.push(
          h(NSelect, {
            value: row.pType,
            style: 'width: 10%; min-width: 100px',
            options: kTypeOptions,
            onUpdateValue: (v) => {
              data.value[index].pValue = null;
              data.value[index].pType = v;
            },
          }),
        );
      }

      return h(NInputGroup, () => group);
    },
  },
  {
    title: '属性值',
    key: 'value',
    width: '45%',
    render: (row, index) => {
      if ('profile_unset' === props.saType || 'item_delete' === props.saType) {
        return h(NInput, {
          disabled: true,
          placeholder: `${props.saType} 不需要属性值`,
        });
      }

      if ('profile_increment' === props.saType) {
        return h(NInputNumber, {
          value: row.pValue,
          onUpdateValue: (v) => {
            data.value[index].pValue = v;
            checkAndAddRow();
          },
        });
      }

      if ('Number' === row.pType) {
        return h(NInputNumber, {
          value: row.pValue,
          onUpdateValue: (v) => {
            data.value[index].pValue = v;
            checkAndAddRow();
          },
        });
      } else if ('Bool' === row.pType) {
        return h(NSelect, {
          value: row.pValue,
          options: [
            { label: 'true', value: 'true' },
            { label: 'false', value: 'false' },
          ],
          onUpdateValue: (v) => {
            data.value[index].pValue = v;
            checkAndAddRow();
          },
        });
      } else if ('List' === row.pType) {
        return h(NSelect, {
          value: row.pValue,
          filterable: true,
          multiple: true,
          tag: true,
          showArrow: false,
          show: false,
          placeholder: '输入，按回车确认',
          onUpdateValue: (v) => {
            data.value[index].pValue = v;
            checkAndAddRow();
          },
        });
      } else if ('Datetime' === row.pType) {
        return h(NInputGroup, () => [
          h(NDatePicker, {
            value: row.pValue,
            type: 'datetime',
            valueFormat: 'yyyy.MM.dd HH:mm:ss',
            style: 'width: 100%',
            onUpdateValue: (v) => {
              data.value[index].pValue = v;
              checkAndAddRow();
            },
          }),
        ]);
      } else {
        return h(NInput, {
          value: row.pValue,
          onUpdateValue: (v) => {
            data.value[index].pValue = v;
            checkAndAddRow();
          },
        });
      }
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: '8%',
    render: (row, index) => {
      if (index === data.value.length - 1) {
        return null;
      }
      return h(
        NButton,
        {
          type: 'error',
          size: 'small',
          onClick: () => delRow(index),
        },
        () => '删除',
      );
    },
  },
]);
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-key="(data: OtherTabData) => data.index"
    :single-line="false"
    size="small"
  />
</template>
