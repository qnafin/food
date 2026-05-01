<template>
  <section class="py-12 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
      <!-- ЛЕВАЯ ЧАСТЬ: информация об услуге -->
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold text-highlighted mb-6">
          Ремонт и сборка аккумуляторов
        </h2>

        <p class="text-muted mb-6">
          Ремонтирую и собираю аккумуляторы для электросамокатов, велосипедов и инструмента.
          Работаю с элементами 18650, увеличиваю ёмкость и восстанавливаю АКБ.
        </p>

        <ul class="space-y-2 text-muted mb-8">
          <li class="flex items-center gap-2">
            ✔ Замена элементов 18650
          </li>
          <li class="flex items-center gap-2">
            ✔ Переделка Ni-Cd → Li-ion
          </li>
          <li class="flex items-center gap-2">
            ✔ Увеличение ёмкости
          </li>
          <li class="flex items-center gap-2">
            ✔ Точечная сварка (без перегрева)
          </li>
          <li class="flex items-center gap-2">
            ✔ Ремонт BMS
          </li>
        </ul>

        <div class="mb-8 p-4 rounded-xl bg-elevated/50 border border-gray-800">
          <div class="text-sm text-muted">
            Стоимость
          </div>
          <div class="text-xl font-semibold text-orange-400">
            от 1500 ₽
          </div>
          <div class="text-xs text-muted mt-1">
            зависит от состояния и элементов
          </div>
        </div>

        <div class="mb-8 p-4 rounded-xl bg-elevated/50 border border-gray-800">
          <div class="text-sm text-muted mb-2">
            Пример работы
          </div>
          <div class="text-sm text-muted">
            Было: аккумулятор не держал заряд (~2Ah)<br>
            Стало: увеличили до ~6Ah
          </div>
        </div>

        <div class="text-sm text-muted flex items-center gap-2">
          📦 Работаю по всей России • Гарантия до 6 месяцев
        </div>
      </div>

      <!-- ПРАВАЯ ЧАСТЬ: форма оценки -->
      <div class="space-y-6">
        <div class="rounded-2xl overflow-hidden border border-gray-800 bg-elevated/50 aspect-video flex items-center justify-center text-muted">
          <UIcon name="lucide:battery-charging" class="size-12" />
          <!-- при наличии реального фото: <img src="..." class="w-full h-full object-cover" /> -->
        </div>

        <UCard class="bg-elevated/30 border-gray-800">
          <template #header>
            <div class="font-semibold text-lg text-highlighted">
              Оценка аккумулятора
            </div>
          </template>

          <form @submit.prevent="submitForm">
            <div class="space-y-4">
              <UFormField
                label="Модель устройства"
                :ui="{ label: 'text-muted text-sm' }"
              >
                <UInput
                  v-model="form.device"
                  size="xl"
                  placeholder="Например, Kugoo M4 Pro"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Проблема"
                :ui="{ label: 'text-muted text-sm' }"
              >
                <UTextarea
                  v-model="form.problem"
                  size="xl"
                  placeholder="Опишите неисправность, признаки"
                  :rows="3"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Фото аккумулятора (опционально)"
                :ui="{ label: 'text-muted text-sm' }"
              >
                <UInput
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
                Отправить на оценку
              </UButton>

              <div class="text-xs text-muted text-center">
                Отвечаю в течение 10–15 минут (Telegram/WhatsApp)
              </div>
            </div>
          </form>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Реактивные данные формы
const form = reactive({
  device: '',
  problem: '',
  photo: null as File | null,
})

const isLoading = ref(false)

// Контакты мастера (замените на свои)
const telegramBotToken = '' // если используете бота
const chatId = '' // ваш ID в Telegram
const whatsappNumber = '79001234567' // номер для отправки фото

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.photo = target.files[0]
  }
}

async function submitForm() {
  if (!form.device.trim() || !form.problem.trim()) {
    // можно добавить уведомление
    console.warn('Заполните модель и проблему')
    return
  }

  isLoading.value = true

  try {
    // Способ 1: отправка в Telegram (через бота)
    if (telegramBotToken && chatId) {
      const message = `🔋 Новая заявка на оценку аккумулятора:
      📱 Устройство: ${form.device}
      ❗ Проблема: ${form.problem}
      🖼 Фото: ${form.photo ? 'приложено' : 'нет'}`

      await $fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        body: { chat_id: chatId, text: message },
      })

      if (form.photo) {
        const formData = new FormData()
        formData.append('chat_id', chatId)
        formData.append('photo', form.photo)
        await $fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
          method: 'POST',
          body: formData,
        })
      }
    } else {
      // Способ 2: отправка в WhatsApp (через предзаполненную ссылку)
      const text = encodeURIComponent(`Оценка аккумулятора:\nУстройство: ${form.device}\nПроблема: ${form.problem}\nФото: ${form.photo ? 'приложено (отправьте отдельно)' : 'нет'}`)
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank')
    }

    // Очистка формы после успешной отправки
    form.device = ''
    form.problem = ''
    form.photo = null

    // можно добавить уведомление об успехе
    // alert('Заявка отправлена! Я свяжусь с вами в ближайшее время.')
  } catch (error) {
    console.error('Ошибка отправки:', error)
    // alert('Не удалось отправить заявку. Попробуйте позже или напишите напрямую в Telegram/WhatsApp.')
  } finally {
    isLoading.value = false
  }
}
</script>
