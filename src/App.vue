<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import PageWrapper from './components/PageWrapper.vue'
import { useHead } from '@vueuse/head'

const route = useRoute()

const routeName = computed(() => {
  return (route.name || '').substring(4) // delete ege- prefix
})

const title = computed(() => route.meta.title ? route.meta.title + ' в ЕГЭ' : 'ЕГЭ по русскому')
const description = computed(() => routeName.value ? 'Вся теория к ЕГЭ по русскому: тексты, орфография, языковые нормы.' : 'Вся теория: тексты, орфография, языковые нормы.')

useHead(computed(() => ({
  title: title.value,
  meta: [
    {
      name: 'og:title',
      content: title.value,
    },
    {
      name: 'description',
      content: description.value,
    },
    {
      name: 'og:description',
      content: description.value,
    },
    {
      name: 'og:image',
      content: routeName.value ? '' : 'https://tmat.me/ege/og-image.png',
    },
  ],
})))

let scroll_order = [
  'essay',
  'styles',
  'types',
  'roots',
  'verbs',
  'ne',
  'capitals',
  'stress',
  'plural',
  'indeclinable',
  'geo',
  'lexical',
  'speech',
  'grammar',
  'figures',
]

const currentIndex = computed(() => {
  return scroll_order.indexOf(routeName.value)
})

const HorizontalScroll = defineAsyncComponent(async () => {
  return await import('./components/HorizontalScroll.vue')
})
</script>

<template>
  <client-only v-if="scroll_order.includes(routeName)">
    <HorizontalScroll :order="scroll_order"/>
    <template #placeholder>
      <PageWrapper
        :next-route="currentIndex < scroll_order.length - 1 ? scroll_order[currentIndex + 1] : undefined"
      />
    </template>
  </client-only>
  <div v-else class="content-container">
    <router-link v-if="routeName !== ''" to="/ege" class="button-link">На главную</router-link>
    <router-view></router-view>
  </div>
</template>
