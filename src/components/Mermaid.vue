<template>
  <client-only>
    <ClientMermaid :code="code"/>
    <template #placeholder>
      Загрузка схемы... <noscript>Пожалуйста, включите JavaScript для загрузки схемы</noscript>
    </template>
  </client-only>
</template>

<script setup>
import ClientMermaid from './ClientMermaid.vue'

const props = defineProps({
  code: String,
})
</script>
