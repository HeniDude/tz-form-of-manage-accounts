import type { IAccount } from '../types/account'

export const ACCOUNTS_STORAGE_KEY = 'accounts'

function isAccountValid(account: IAccount): boolean {
  if (!account.type) return false
  if (account.login.trim().length === 0) return false
  if (account.type === 'local' && (account.password ?? '').trim().length === 0) return false
  return true
}

export function loadAccountsFromStorage(): IAccount[] {
  try {
    return (JSON.parse(localStorage.getItem(ACCOUNTS_STORAGE_KEY) || '[]') as IAccount[]).filter(
      isAccountValid,
    )
  } catch {
    return []
  }
}

export function saveAccountsToStorage(accounts: IAccount[]): void {
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts.filter(isAccountValid)))
}
