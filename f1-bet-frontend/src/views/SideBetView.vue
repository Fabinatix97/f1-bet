<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col p-6">
    <NavBar />
    <main class="flex-1 mt-6">
      <div class="mb-24">
        <RouterView />
      </div>
    </main>
  </div>
</template>
