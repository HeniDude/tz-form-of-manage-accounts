export type TAccountType = 'local' | 'ldap'

export interface ILabel {
  text: string
}

export interface IAccount {
  labels: ILabel[]
  type: TAccountType
  login: string
  password: string | null
}
