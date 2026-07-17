<script setup lang="ts">
import { UploadCloud } from '@lucide/vue'
import { toBase64 } from '@md/shared/utils/fileHelpers'
import { ref } from 'vue'
import PanelDialog from '@/components/shared/panel-dialog/PanelDialog.vue'
import { Button } from '@/components/ui/button'
import { validateImageFile } from '@/lib/upload/validate-image'
import { useUIStore } from '@/stores/ui'

const emit = defineEmits([`uploadImage`])

const { t } = useI18n()

const uiStore = useUIStore()
const dialogOpen = computed({
  get: () => true,
  set: () => {
    uiStore.toggleShowUploadImgDialog(false)
  },
})

const previewUrl = ref<string | null>(null)
const isUploading = ref(false)
const errorMessage = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const dragOver = ref(false)

async function handleFile(file: File) {
  errorMessage.value = null
  const validationResult = validateImageFile(file, t)
  if (!validationResult.ok) {
    errorMessage.value = validationResult.msg
    return
  }

  isUploading.value = true
  try {
    const rawBase64 = await toBase64(file)
    const base64 = `data:${file.type};base64,${rawBase64}`
    previewUrl.value = base64
    emit(`uploadImage`, base64)
  }
  catch (err: any) {
    errorMessage.value = err?.message || t(`store.uploader.uploadFailed`)
  }
  finally {
    isUploading.value = false
  }
}

function onFileInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file)
    void handleFile(file)
}

function onDrop(event: DragEvent) {
  dragOver.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file)
    void handleFile(file)
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  dragOver.value = true
}

function onDragLeave() {
  dragOver.value = false
}

function openFileDialog() {
  fileInputRef.value?.click()
}

function closeDialog() {
  uiStore.toggleShowUploadImgDialog(false)
}
</script>

<template>
  <PanelDialog
    v-model:open="dialogOpen"
    :title="t('upload.imageDialogTitle')"
    :description="t('upload.base64Description')"
    :icon="UploadCloud"
  >
    <div class="px-4 py-4 sm:px-6 space-y-4">
      <div
        class="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors"
        :class="{ 'border-primary bg-accent/40': dragOver }"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
      >
        <UploadCloud class="size-10 text-muted-foreground" />
        <p class="text-sm text-muted-foreground">
          {{ t('upload.dragOrClick') }}
        </p>
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileInputChange"
        >
        <Button variant="outline" size="sm" :disabled="isUploading" @click="openFileDialog">
          {{ t('upload.chooseFile') }}
        </Button>
      </div>

      <div v-if="previewUrl" class="space-y-2">
        <p class="text-xs text-muted-foreground">
          {{ t('upload.base64Preview') }}
        </p>
        <img :src="previewUrl" :alt="t('upload.base64Preview')" class="mx-auto max-h-64 rounded-lg ring-1 ring-border">
      </div>

      <p v-if="errorMessage" class="text-sm text-destructive">
        {{ errorMessage }}
      </p>

      <p class="text-xs text-muted-foreground">
        {{ t('upload.base64Hint') }}
      </p>

      <div class="flex justify-end">
        <Button variant="ghost" size="sm" @click="closeDialog">
          {{ t('common.close') }}
        </Button>
      </div>
    </div>
  </PanelDialog>
</template>
