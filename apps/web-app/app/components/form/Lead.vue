<!-- components/forms/LeadForm.vue -->
<template>
  <form class="space-y-4" @submit.prevent="submitForm">
    <UFormField label="Ваше имя" :ui="{ label: 'text-muted text-sm' }">
      <UInput
        v-model="form.name"
        size="xl"
        placeholder="Как к вам обращаться"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Номерыы телефона *"
      :ui="{ label: 'text-muted text-sm' }"
      required
    >
      <UInput
        v-model="displayPhone"
        type="tel"
        size="xl"
        maxlength="18"
        :trailing-icon="isValidPhone ? 'i-lucide-check' : undefined"
        :ui="{ trailingIcon: 'text-secondary' }"
        placeholder="+7 (900) 123-45-67"
        class="w-full"
        @input="handlePhoneInput"
        @blur="handlePhoneBlur"
      />
      <div v-if="phoneError" class="text-xs text-red-500 mt-1">
        {{ phoneError }}
      </div>
    </UFormField>

    <UFormField label="Модель устройства" :ui="{ label: 'text-muted text-sm' }">
      <UInput
        v-model="form.device"
        size="xl"
        placeholder="Например, Kugoo M4 Pro"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Проблема / Описание" :ui="{ label: 'text-muted text-sm' }">
      <UTextarea
        v-model="form.problem"
        size="xl"
        placeholder="Опишите неисправность или задайте вопрос"
        :rows="3"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Фото (опционально)" :ui="{ label: 'text-muted text-sm' }">
      <UInput
        :key="fileInputKey"
        type="file"
        accept="image/*"
        class="w-full"
        @change="handleFileUpload"
      />
      <div class="text-xs text-muted mt-1">
        📷 Прикрепите фото, чтобы точнее оценить
      </div>
    </UFormField>

    <UButton
      type="submit"
      block
      size="lg"
      color="secondary"
      icon="lucide:send"
      :loading="isLoading"
      class="font-medium"
    >
      Отправить заявку
    </UButton>

    <div class="text-xs text-muted text-center">
      Отвечаю в течение 10–15 минут в рабочее время. <br>
      Если не ответил — пишите напрямую в VK.
    </div>
  </form>
</template>

<script setup lang="ts">
import { usePhoneValidation } from '~/composables/usePhoneValidation'

const props = defineProps<{
  leadType?: string
}>()

const form = reactive({
  name: '',
  phoneRaw: '',
  device: '',
  problem: '',
  photo: null as File | null,
})

const displayPhone = ref('')
const fileInputKey = ref(0)
const isLoading = ref(false)
const phoneError = ref('')
const isValidPhone = ref(false)

const { sendLead } = useLead()
const { formatPhone, validatePhone } = usePhoneValidation()

function handlePhoneInput() {
  displayPhone.value = formatPhone(displayPhone.value)
}

function handlePhoneBlur() {
  const { isValid, rawPhone } = validatePhone(displayPhone.value)
  isValidPhone.value = isValid
  form.phoneRaw = rawPhone
  phoneError.value = isValid || !displayPhone.value ? '' : 'Введите корректный номер телефона'
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.photo = target.files[0]
  }
}

function resetForm() {
  form.name = ''
  form.phoneRaw = ''
  displayPhone.value = ''
  form.device = ''
  form.problem = ''
  form.photo = null
  isValidPhone.value = false
  phoneError.value = ''
  fileInputKey.value += 1
}

async function submitForm() {
  if (!form.phoneRaw) {
    phoneError.value = 'Укажите номер телефона'
    return
  }
  if (!isValidPhone.value) {
    phoneError.value = 'Введите корректный номер телефона'
    return
  }
  phoneError.value = ''

  if (!form.problem.trim()) {
    // alert('Пожалуйста, опишите проблему или задайте вопрос.')
    return
  }

  isLoading.value = true

  const messageParts = [
    `Имя: ${form.name || 'не указано'}`,
    `Телефон: ${form.phoneRaw}`,
    `Модель: ${form.device || 'не указана'}`,
    `Проблема: ${form.problem}`,
  ]
  const message = messageParts.join('\n')

  try {
    const result = await sendLead(props.leadType || 'general', message, form.phoneRaw, form.photo || undefined)
    if (result.success) {
      resetForm()
      // alert('✅ Заявка отправлена! Мастер свяжется с вами в ближайшее время.')
    } else {
      // alert('❌ Не удалось отправить заявку. Попробуйте позже или напишите напрямую в VK.')
    }
  } catch (error) {
    console.error('Lead error:', error)
    // alert('❌ Произошла ошибка. Пожалуйста, попробуйте ещё раз.')
  } finally {
    isLoading.value = false
  }
}
</script>
