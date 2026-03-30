export function safeJsonParse<T>(value: unknown, defaultValue: T): T {
  if (typeof value !== 'string') {
    return defaultValue
  }
  try {
    return JSON.parse(value) as T
  } catch {
    return defaultValue
  }
}
