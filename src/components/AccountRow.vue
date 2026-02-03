<script setup lang="ts">
import { reactive, watch } from 'vue'

import type { IAccount } from '../types/account'
import { formatLabels, parseLabels } from '../utils/labels'

const props = defineProps<{
  modelValue: IAccount
}>()

const emit = defineEmits<{
  update: [IAccount]
  remove: []
}>()

type Field = 'labels' | 'type' | 'login' | 'password'

const draft = reactive({
  labelsText: '',
  type: 'local' as IAccount['type'],
  login: '',
  passwordText: '',
})

const errors = reactive<Record<Field, boolean>>({
  labels: false,
  type: false,
  login: false,
  password: false,
})

watch(
  () => props.modelValue,
  (value) => {
    draft.labelsText = formatLabels(value.labels)
    draft.type = value.type
    draft.login = value.login
    draft.passwordText = value.password ?? ''

    errors.labels = false
    errors.type = false
    errors.login = false
    errors.password = false
  },
  { immediate: true },
)

function validateRequired(): boolean {
  errors.type = !draft.type
  errors.login = draft.login.trim().length === 0
  errors.password = draft.type === 'local' && draft.passwordText.trim().length === 0

  return !errors.type && !errors.login && !errors.password
}

function normalizeAndCommit(): void {
  if (!validateRequired()) return

  const normalizedLabels = parseLabels(draft.labelsText)
  draft.labelsText = formatLabels(normalizedLabels)

  emit('update', {
    ...props.modelValue,
    labels: normalizedLabels,
    type: draft.type,
    login: draft.login.trim(),
    password: draft.type === 'local' ? draft.passwordText : null,
  })
}

function onLabelsBlur(): void {
  normalizeAndCommit()
}

function onTypeChange(type: IAccount['type']): void {
  draft.type = type
  if (type === 'ldap') draft.passwordText = ''
  normalizeAndCommit()
}

function onLoginBlur(): void {
  normalizeAndCommit()
}

function onPasswordBlur(): void {
  normalizeAndCommit()
}
</script>

<template>
  <div class="accounts-table__row">
    <el-input v-model="draft.labelsText" maxlength="50" @blur="onLabelsBlur" />

    <el-select
      :class="{ 'is-invalid': errors.type }"
      :model-value="draft.type"
      @update:model-value="onTypeChange"
    >
      <el-option label="Локальная" value="local" />
      <el-option label="LDAP" value="ldap" />
    </el-select>

    <el-input
      v-model="draft.login"
      :class="{ 'is-invalid': errors.login }"
      maxlength="100"
      @blur="onLoginBlur"
    />

    <el-input
      v-if="draft.type === 'local'"
      v-model="draft.passwordText"
      :class="{ 'is-invalid': errors.password }"
      type="password"
      maxlength="100"
      @blur="onPasswordBlur"
    />

    <el-button text type="danger" circle title="Удалить" @click="emit('remove')">🗑</el-button>
  </div>
</template>

<style scoped>
.accounts-table__row {
  display: grid;
  grid-template-columns:
    1.3fr
    0.7fr
    1.5fr
    1.3fr
    32px;
  gap: 8px;
  align-items: center;
}

.accounts-table__row :deep(.el-input),
.accounts-table__row :deep(.el-select) {
  width: 100%;
}

.is-invalid :deep(.el-input__wrapper),
.is-invalid :deep(.el-select__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>
