<script setup lang="ts">
import { watch } from 'vue'
import { toTypedSchema } from '@vee-validate/yup'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

import type { IAccount } from '../types/account'
import { formatLabels, parseLabels } from '../utils/labels'

const props = defineProps<{
  modelValue: IAccount
}>()

const emit = defineEmits<{
  update: [IAccount]
  remove: []
}>()

const schema = yup.object({
  labelsText: yup.string().max(50).default(''),
  type: yup.mixed<IAccount['type']>().oneOf(['local', 'ldap']).required('Обязательное поле'),
  login: yup.string().max(100),
  passwordText: yup
    .string()
    .max(100)
    .when('type', {
      is: 'local',
      then: (s: yup.StringSchema<string | undefined>) =>
        s.test('required', 'Обязательное поле', (value: unknown) =>
          typeof value === 'string' ? value.trim().length > 0 : false,
        ),
      otherwise: (s: yup.StringSchema<string | undefined>) => s.notRequired(),
    })
    .default(''),
})

const { validate, resetForm, setFieldValue, validateField } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    labelsText: '',
    type: 'local',
    login: '',
    passwordText: '',
  },
})

const { value: labelsText } = useField<string>('labelsText', undefined, {
  validateOnValueUpdate: false,
})
const { value: type, errorMessage: typeError } = useField<IAccount['type']>('type', undefined, {
  validateOnValueUpdate: false,
})
const { value: login, errorMessage: loginError } = useField<string>('login', undefined, {
  validateOnValueUpdate: false,
})
const { value: passwordText, errorMessage: passwordError } = useField<string>(
  'passwordText',
  undefined,
  {
    validateOnValueUpdate: false,
  },
)

watch(
  () => props.modelValue,
  (value) => {
    resetForm({
      values: {
        labelsText: formatLabels(value.labels),
        type: value.type,
        login: value.login,
        passwordText: value.password ?? '',
      },
    })
  },
  { immediate: true },
)

async function normalizeAndCommit(): Promise<void> {
  const result = await validate()
  if (!result.valid) return

  const normalizedLabels = parseLabels(labelsText.value)
  setFieldValue('labelsText', formatLabels(normalizedLabels), false)

  emit('update', {
    ...props.modelValue,
    labels: normalizedLabels,
    type: type.value,
    login: login.value.trim(),
    password: type.value === 'local' ? passwordText.value : null,
  })
}

function onLabelsBlur(): void {
  void normalizeAndCommit()
}

async function onTypeChange(nextType: IAccount['type']): Promise<void> {
  setFieldValue('type', nextType, false)

  if (nextType === 'ldap') {
    setFieldValue('passwordText', '', false)
  } else {
    await validateField('passwordText')
  }

  await normalizeAndCommit()
}

function onLoginBlur(): void {
  void normalizeAndCommit()
}

function onPasswordBlur(): void {
  void normalizeAndCommit()
}
</script>

<template>
  <div class="accounts-table__row">
    <el-input v-model="labelsText" maxlength="50" @blur="onLabelsBlur" />

    <el-select
      :class="{ 'is-invalid': !!typeError }"
      :model-value="type"
      @update:model-value="onTypeChange"
    >
      <el-option label="Локальная" value="local" />
      <el-option label="LDAP" value="ldap" />
    </el-select>

    <el-input
      v-model="login"
      :class="{ 'is-invalid': !!loginError }"
      maxlength="100"
      @blur="onLoginBlur"
    />

    <el-input
      v-if="type === 'local'"
      v-model="passwordText"
      :class="{ 'is-invalid': !!passwordError }"
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
