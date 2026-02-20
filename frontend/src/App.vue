<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import Snackbar from '@/components/Snackbar.vue'

const route = useRoute()
const showTabBar = computed(
  () => route.path !== '/' && !route.path.startsWith('/admin')
)
</script>

<template>
  <TabBar v-if="showTabBar" />
  <RouterView />
  <Snackbar />
</template>

<style scoped></style>
