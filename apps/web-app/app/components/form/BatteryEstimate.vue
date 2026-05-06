<template>
  <UCard class="bg-elevated/30 border-gray-800">
    <template #header>
      <div class="font-semibold text-lg text-highlighted">
        {{ formTitle }}
      </div>
    </template>
    <FormLead :lead-type="leadType" />
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  leadType?: string
}>()

const formTitle = computed(() => {
  switch (props.leadType) {
    case 'battery_estimate': return 'Оценка аккумулятора'
    case 'scooter_repair': return 'Заявка на ремонт самоката'
    case 'ebike_repair': return 'Заявка на ремонт электровелосипеда'
    default: return 'Заявка на услугу'
  }
})
</script>
