<script setup lang="ts">
import { ExternalLink, HelpCircle } from '@lucide/vue'
import { computed } from 'vue'
import PanelDialog from '@/components/shared/panel-dialog/PanelDialog.vue'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { t } = useI18n()

const dialogOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit(`update:open`, val),
})

function onRedirect() {
  window.open(`https://github.com/doocs/md`, `_blank`, `noopener,noreferrer`)
}
</script>

<template>
  <PanelDialog
    v-model:open="dialogOpen"
    :title="t('about.title')"
    :description="t('about.description')"
    :icon="HelpCircle"
  >
    <div class="space-y-4 px-4 py-4 text-center sm:px-6">
      <Button variant="outline" class="h-10 gap-1.5 px-4" @click="onRedirect()">
        <ExternalLink class="size-3.5" />
        <span class="text-sm">GitHub</span>
      </Button>
    </div>
  </PanelDialog>
</template>
