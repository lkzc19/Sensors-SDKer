export function isEmpty(value?: string | null): boolean {
  return value?.trim().length === 0;
}

export function isNotEmpty(value?: string | null): boolean {
  return !isEmpty(value);
}
