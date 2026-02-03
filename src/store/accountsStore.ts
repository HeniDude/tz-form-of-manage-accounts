import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IAccount } from '../types/account'

import { loadAccountsFromStorage } from './accountsStorage'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<IAccount[]>(loadAccountsFromStorage())

  function createEmptyAccount(): IAccount {
    return {
      labels: [],
      type: 'local',
      login: '',
      password: '',
    }
  }

  function add(): void {
    accounts.value.push(createEmptyAccount())
  }

  function remove(index: number): void {
    accounts.value.splice(index, 1)
  }

  function update(index: number, account: IAccount): void {
    accounts.value[index] = account
  }

  return { accounts, add, remove, update }
})
