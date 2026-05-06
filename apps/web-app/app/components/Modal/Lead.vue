<!-- components/Modal/LeadModal.vue -->
<template>
  <UModal :title="modalTitle">
    <template #body>
      <FormLead :lead-type="leadType" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  leadType?: string
}>()

const modalTitle = computed(() => {
  switch (props.leadType) {
    case 'battery_estimate': return 'Оценка аккумулятора'
    case 'scooter_repair': return 'Ремонт электросамоката'
    case 'ebike_repair': return 'Ремонт электровелосипеда'
    default: return 'Отправить заявку'
  }
})
</script>
