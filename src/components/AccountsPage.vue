<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useAccountsStore } from '../store/accountsStore'

import AccountsHeader from './AccountsHeader.vue'
import AccountsHint from './AccountsHint.vue'
import AccountsTable from './AccountsTable.vue'

const accountsStore = useAccountsStore()
const { accounts } = storeToRefs(accountsStore)
const { add, remove, update } = accountsStore
</script>

<template>
  <div class="container">
    <AccountsHeader @add="add" />
    <AccountsHint />
    <AccountsTable :rows="accounts" @update="update" @remove="remove" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}
</style>
