<script setup>
const props = defineProps({
  component: {
    type: Object,
    default: null,
  },
  nextRoute: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <div class="content-container">
    <router-link to="/ege" class="button-link">На главную</router-link>
    <component v-if="props.component" :is="props.component" class="item"/>
    <router-view v-else/>
    <div class="end-button">
      <router-link v-if="props.nextRoute" :to="'/ege/' + props.nextRoute" class="button-link">
        Дальше
      </router-link>
      <router-link v-else to="/ege" class="button-link">На главную</router-link>
    </div>
  </div>
</template>
