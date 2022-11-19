<script setup>
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import HorizontalScroll from "./components/HorizontalScroll.vue";

const route = useRoute();

let routeName = computed(() => {
  return (route.name || '').substring(4); // delete ege- prefix
})

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
  'figures',
  'grammar',
];
</script>

<template>
  <HorizontalScroll v-if="scroll_order.includes(routeName)" :order="scroll_order"/>
  <div v-else class="content-container">
    <router-link v-if="routeName !== ''" to="/ege" class="button-link">На главную</router-link>
    <router-view></router-view>
  </div>
</template>
