import type { PdfExportOptions } from '@/services/export'
import { DEFAULT_PDF_EXPORT_OPTIONS, normalizePdfExportOptions } from '@/services/export'
import { store } from '@/storage'
import { addPrefix } from '@/storage/prefix'

/** Global UI state: dark mode, sidebars, dialogs, view mode, etc. */
export const useUIStore = defineStore(`ui`, () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const isOpenRightSlider = store.reactive(addPrefix(`is_open_right_slider`), false)

  const isOpenPostSlider = store.reactive(addPrefix(`is_open_post_slider`), false)

  const isOpenFolderPanel = store.reactive(addPrefix(`is_open_folder_panel`), false)

  const isMobile = store.reactive(`isMobile`, false)

  // viewMode: edit | split | preview
  const viewMode = store.reactive<'edit' | 'split' | 'preview'>(`viewMode`, `split`)

  function setViewMode(mode: 'edit' | 'split' | 'preview') {
    viewMode.value = mode
  }

  // previewDevice: desktop | mobile (simulated)
  const previewDevice = store.reactive<'desktop' | 'mobile'>(`previewDevice`, `mobile`)

  function setPreviewDevice(device: 'desktop' | 'mobile') {
    previewDevice.value = device
  }

  function togglePreviewDevice() {
    previewDevice.value = previewDevice.value === `desktop` ? `mobile` : `desktop`
  }

  const enableScrollSync = store.reactive(addPrefix(`enableScrollSync`), true)
  const toggleScrollSync = useToggle(enableScrollSync)

  const copyMode = store.reactive(addPrefix(`copyMode`), `txt`)

  const isShowCssEditor = store.reactive(`isShowCssEditor`, false)
  const toggleShowCssEditor = useToggle(isShowCssEditor)

  const isShowInsertFormDialog = ref(false)
  const toggleShowInsertFormDialog = useToggle(isShowInsertFormDialog)

  const isShowUploadImgDialog = ref(false)
  const toggleShowUploadImgDialog = useToggle(isShowUploadImgDialog)

  const isShowFormulaEditorDialog = ref(false)
  const formulaEditorValue = ref(``)
  const formulaEditorDisplayMode = ref(true)
  const formulaEditorSourceRaw = ref<string | null>(null)

  function openFormulaEditor(options: {
    value?: string
    displayMode?: boolean
    sourceRaw?: string | null
  } = {}) {
    formulaEditorValue.value = options.value ?? ``
    formulaEditorDisplayMode.value = options.displayMode ?? true
    formulaEditorSourceRaw.value = options.sourceRaw ?? null
    isShowFormulaEditorDialog.value = true
  }

  function closeFormulaEditor() {
    isShowFormulaEditorDialog.value = false
    formulaEditorValue.value = ``
    formulaEditorDisplayMode.value = true
    formulaEditorSourceRaw.value = null
  }

  const isShowImportMdDialog = ref(false)
  const toggleShowImportMdDialog = useToggle(isShowImportMdDialog)
  /** URL from ?open= query; import dialog auto-imports when opened with this set. */
  const importMdOpenUrl = ref<string | null>(null)

  const isShowTemplateDialog = ref(false)
  const toggleShowTemplateDialog = useToggle(isShowTemplateDialog)

  const isShowComponentDialog = ref(false)
  const toggleShowComponentDialog = useToggle(isShowComponentDialog)

  const isShowPdfExportDialog = ref(false)

  const pdfExportOptions = store.reactive<PdfExportOptions>(
    `pdfExportOptions`,
    { ...DEFAULT_PDF_EXPORT_OPTIONS },
  )

  function openPdfExportDialog() {
    // Drop legacy fields (e.g. paperSize) and backfill newly added keys.
    pdfExportOptions.value = normalizePdfExportOptions(pdfExportOptions.value)
    isShowPdfExportDialog.value = true
  }

  const isShowAboutDialog = ref(false)
  const toggleShowAboutDialog = useToggle(isShowAboutDialog)

  const isShowMarkdownHelpDialog = ref(false)
  const toggleShowMarkdownHelpDialog = useToggle(isShowMarkdownHelpDialog)

  const isShowEditorStateDialog = ref(false)
  const toggleShowEditorStateDialog = useToggle(isShowEditorStateDialog)

  const isShowPreferencesDialog = ref(false)
  const toggleShowPreferencesDialog = useToggle(isShowPreferencesDialog)

  const isShowKeyboardShortcutsDialog = ref(false)
  const toggleShowKeyboardShortcutsDialog = useToggle(isShowKeyboardShortcutsDialog)

  const isShowCommandPalette = ref(false)
  const toggleShowCommandPalette = useToggle(isShowCommandPalette)

  /** Component name to expand when opening the component dialog (e.g. 'MpProfile'). */
  const componentDialogTarget = ref<string | null>(null)

  function openComponentDialogWithTarget(target: string) {
    componentDialogTarget.value = target
    isShowComponentDialog.value = true
  }

  const searchTabRequest = ref<{ word: string, showReplace: boolean } | null>(null)

  function openSearchTab(searchWord: string = '', showReplace: boolean = false) {
    searchTabRequest.value = { word: searchWord, showReplace }
  }

  function clearSearchTabRequest() {
    searchTabRequest.value = null
  }

  /** Incremented to request go-to-line from Footer. */
  const goToLineRequest = ref(0)

  function requestGoToLine() {
    goToLineRequest.value++
  }

  let splitCollapsedByResize = false

  function handleResize() {
    const wasMobile = isMobile.value
    isMobile.value = window.innerWidth <= 768

    if (!wasMobile && isMobile.value && viewMode.value === `split`) {
      // Desktop → mobile while split: collapse to edit and remember for restore
      viewMode.value = `edit`
      splitCollapsedByResize = true
    }
    else if (wasMobile && !isMobile.value && splitCollapsedByResize) {
      // Mobile → desktop after resize collapse: restore split
      viewMode.value = `split`
      splitCollapsedByResize = false
    }
  }

  onMounted(() => {
    handleResize()
    window.addEventListener(`resize`, handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(`resize`, handleResize)
  })

  return {
    isDark,
    isOpenRightSlider,
    isOpenPostSlider,
    isMobile,
    viewMode,
    previewDevice,
    isOpenFolderPanel,
    enableScrollSync,
    copyMode,

    isShowCssEditor,
    toggleShowCssEditor,
    isShowInsertFormDialog,
    toggleShowInsertFormDialog,
    isShowUploadImgDialog,
    toggleShowUploadImgDialog,
    isShowFormulaEditorDialog,
    formulaEditorValue,
    formulaEditorDisplayMode,
    formulaEditorSourceRaw,
    openFormulaEditor,
    closeFormulaEditor,
    isShowImportMdDialog,
    toggleShowImportMdDialog,
    importMdOpenUrl,
    isShowTemplateDialog,
    toggleShowTemplateDialog,
    isShowComponentDialog,
    toggleShowComponentDialog,
    isShowPdfExportDialog,
    openPdfExportDialog,
    pdfExportOptions,
    isShowAboutDialog,
    toggleShowAboutDialog,
    isShowMarkdownHelpDialog,
    toggleShowMarkdownHelpDialog,
    isShowEditorStateDialog,
    toggleShowEditorStateDialog,
    isShowPreferencesDialog,
    toggleShowPreferencesDialog,
    isShowKeyboardShortcutsDialog,
    toggleShowKeyboardShortcutsDialog,
    isShowCommandPalette,
    toggleShowCommandPalette,
    componentDialogTarget,
    openComponentDialogWithTarget,

    searchTabRequest,
    openSearchTab,
    clearSearchTabRequest,
    goToLineRequest,
    requestGoToLine,

    toggleDark,
    toggleScrollSync,
    setViewMode,
    setPreviewDevice,
    togglePreviewDevice,
  }
})
