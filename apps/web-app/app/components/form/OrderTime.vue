<template>
  <div class="flex flex-col gap-2">
    <h3 class="text-lg md:text-xl font-semibold">
      {{ $dict('web-app.checkout.time-title') }}
    </h3>

    <USelect
      v-model="selectedTimeSlotValue"
      :items="items"
      :ui="{
        leadingIcon: state.readyBy !== '0' && 'text-secondary',
      }"
      size="xl"
      icon="lucide:clock"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@nextorders/food-schema'

const { dict } = useDictionary()
const toast = useToast()

const channelStore = useChannelStore()
const orderStore = useOrderStore()

const defaultTimeSlot = '0'

// Список доступных слотов
const items = computed(() =>
  [
    { label: dict('web-app.checkout.as-soon-as-possible'), value: defaultTimeSlot },
    ...channelStore.timeSlots.map((slot) => ({
      label: `${slot.start} - ${slot.end}`,
      value: `${slot.start} - ${slot.end}`,
    })),
  ],
)

// Преобразование ISO даты в значение слота, если время попадает в интервал
function findSlotByIso(isoString: string): string | null {
  if (!isoString || isoString === defaultTimeSlot) {
    return null
  }
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) {
    return null
  }
  // Получаем время в формате HH:MM
  const targetTime = date.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
  const slot = channelStore.timeSlots.find((slot) => slot.start <= targetTime && targetTime <= slot.end)
  return slot ? `${slot.start} - ${slot.end}` : null
}

// Инициализация состояния из orderStore
const initialReadyBy = orderStore.readyBy?.length ? orderStore.readyBy : defaultTimeSlot
const initialReadyType = orderStore.readyType ?? 'asap'

// Если readyBy — ISO-дата, пытаемся преобразовать в слот
let finalReadyBy = initialReadyBy
let finalReadyType = initialReadyType
if (initialReadyBy !== defaultTimeSlot && initialReadyBy.includes('T') && initialReadyBy.includes('Z')) {
  const foundSlot = findSlotByIso(initialReadyBy)
  if (foundSlot) {
    finalReadyBy = foundSlot
    finalReadyType = 'scheduled'
  } else {
    // Слот не найден, сбрасываем на дефолтный без тоста
    finalReadyBy = defaultTimeSlot
    finalReadyType = 'asap'
  }
}

const state = ref<Pick<Order, 'readyBy' | 'readyType'>>({
  readyBy: finalReadyBy,
  readyType: finalReadyType,
})

const selectedTimeSlotValue = ref<string>(state.value.readyBy)

watch(selectedTimeSlotValue, () => {
  state.value.readyBy = selectedTimeSlotValue.value
  state.value.readyType = selectedTimeSlotValue.value === defaultTimeSlot ? 'asap' : 'scheduled'
}, { immediate: true })

watch(state, () => {
  orderStore.readyBy = state.value.readyBy
  orderStore.readyType = state.value.readyType
  orderStore.isSaved = false
}, { deep: true })

watch(items, () => {
  // Если список слотов пуст (только дефолтный), не выполняем проверку
  if (items.value.length <= 1) {
    return
  }

  // Проверяем, был ли выбран конкретный слот (readyType === 'scheduled')
  // и этого слота больше нет в новом списке
  if (
    state.value.readyType === 'scheduled'
    && selectedTimeSlotValue.value !== defaultTimeSlot
    && !items.value.some((i) => i.value === selectedTimeSlotValue.value)
  ) {
    selectedTimeSlotValue.value = defaultTimeSlot

    toast.add({
      title: dict('web-app.checkout.selected-time-unavailable'),
      description: dict('web-app.checkout.selected-time-unavailable-description'),
      icon: 'lucide:clock',
      color: 'error',
      duration: 5000,
    })
  }
}, { deep: true, immediate: true })
</script>
