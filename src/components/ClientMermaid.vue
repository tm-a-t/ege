<script setup>
import { computed, ref } from 'vue'
import mermaid from 'mermaid'
import { customAlphabet } from 'nanoid'

const props = defineProps({
  code: String,
})

mermaid.startOnLoad = false
mermaid.initialize({ startOnLoad: false })

const nanoid = customAlphabet('abcedfghicklmn', 10)

const el = ref()
const html = computed(() => {
  mermaid.initialize({
    startOnLoad: false,
  })
  const id = nanoid()
  const code = props.code || ''
  return mermaid.render(id, code)
})
</script>

<template>
  <div
    ref="el"
    v-html="html"
  />
</template>
