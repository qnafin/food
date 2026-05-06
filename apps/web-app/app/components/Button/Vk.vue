<template>
  <UButton
    :to="vkLink"
    target="_blank"
    rel="noopener noreferrer"
    :size="size"
    :color="color"
    :variant="variant"
    :icon="icon"
    :label="label"
    class="font-medium justify-center"
    :class="customClass"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'neutral' | 'orange'
  variant?: 'solid' | 'outline' | 'soft' | 'ghost'
  icon?: string
  label?: string
  customClass?: string
}>(), {
  size: 'lg',
  color: 'secondary',
  variant: 'outline',
  icon: 'lucide:send',
  label: 'Написать',
  customClass: '',
})
const config = useRuntimeConfig()
const vkLink = config.public.vkLink
</script>
