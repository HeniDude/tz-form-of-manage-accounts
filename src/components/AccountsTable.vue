<script setup lang="ts">
import type { IAccount } from '../types/account'
import AccountRow from './AccountRow.vue'

defineProps<{
  rows: IAccount[]
}>()

const emit = defineEmits<{
  update: [index: number, account: IAccount]
  remove: [index: number]
}>()

function onRowUpdate(index: number, account: IAccount) {
  emit('update', index, account)
}

function onRowRemove(index: number) {
  emit('remove', index)
}
</script>

<template>
  <div class="accounts-table">
    <div class="accounts-table__header">
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
      <span />
    </div>

    <AccountRow
      v-for="(row, index) in rows"
      :key="index"
      :model-value="row"
      @update="onRowUpdate(index, $event)"
      @remove="onRowRemove(index)"
    />
  </div>
</template>

<style scoped>
.accounts-table {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.accounts-table__header {
  display: grid;
  grid-template-columns:
    1.5fr
    1fr
    1.5fr
    1.5fr
    32px;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: #909399;
}
</style>
