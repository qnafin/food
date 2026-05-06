<template>
  <UButton
    :size="size"
    :variant="variant"
    :icon="computedIcon"
    :loading="isLoading"
    :label="label"
    :color="color"
    class="font-medium justify-center"
    @click="openModal"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  leadType?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'solid' | 'outline' | 'soft' | 'ghost'
  color?: 'primary' | 'secondary' | 'neutral' | 'orange'
  label?: string
  icon?: string
}>(), {
  leadType: 'general',
  color: 'secondary',
  size: 'lg',
  variant: 'solid',
  label: 'Оставить заявку',
})

const isLoading = ref(false)
const { openLeadModal } = useLeadModal()

// Динамическая иконка
const computedIcon = computed(() => {
  if (props.icon) {
    return props.icon
  }
  switch (props.leadType) {
    case 'battery_estimate': return 'lucide:battery'
    case 'scooter_repair': return 'lucide:scooter'
    case 'ebike_repair': return 'lucide:bike'
    default: return 'lucide:send'
  }
})

async function openModal() {
  isLoading.value = true
  try {
    await openLeadModal(props.leadType)
  } finally {
    isLoading.value = false
  }
}
</script>
