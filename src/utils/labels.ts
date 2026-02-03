import type { ILabel } from '../types/account'

const LABELS_SEPARATOR = ';'

export function parseLabels(value: string): ILabel[] {
  return value
    .split(LABELS_SEPARATOR)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

export function formatLabels(labels: ILabel[]): string {
  return labels.map((label) => label.text).join(`${LABELS_SEPARATOR} `)
}
