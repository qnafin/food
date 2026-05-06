// composables/usePhoneValidation.ts
import { checkPhoneNumberValidity, formatPhoneNumber } from '~/utils/phoneHelpers'

const NON_DIGIT_RE = /\D/g

export function usePhoneValidation() {
  const optionsStore = useOptionsStore()
  const countryCode = computed(() => optionsStore.countryCode) // например, 'RU' из стора

  // Форматирование номера как в orderStore
  const formatPhone = (phoneAsString: string): string => {
    if (!phoneAsString) {
      return ''
    }
    // Для полного соответствия с orderStore можно использовать и AsYouType, но formatPhoneNumber уже делает то же самое
    return formatPhoneNumber(phoneAsString, countryCode.value) ?? ''
  }

  // Валидация номера, возвращает { isValid, rawPhone }
  const validatePhone = (formattedPhone: string): { isValid: boolean, rawPhone: string } => {
    if (!formattedPhone || formattedPhone.length > 18) {
      return { isValid: false, rawPhone: '' }
    }
    const isValid = checkPhoneNumberValidity(formattedPhone, countryCode.value)
    const rawPhone = isValid ? formattedPhone.replace(NON_DIGIT_RE, '') : ''
    return { isValid, rawPhone }
  }

  return { formatPhone, validatePhone }
}
