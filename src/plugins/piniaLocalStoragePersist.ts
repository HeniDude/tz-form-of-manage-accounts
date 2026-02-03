import type { PiniaPluginContext } from 'pinia'

import { saveAccountsToStorage } from '../store/accountsStorage'

export function piniaLocalStoragePersistPlugin({ store }: PiniaPluginContext) {
  if (store.$id !== 'accounts') return

  store.$subscribe(
    (_mutation, state) => {
      saveAccountsToStorage(state.accounts)
    },
    { detached: true },
  )
}
