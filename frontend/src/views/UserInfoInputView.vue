<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useBetStore } from '@/stores/bet'
import NavButtons from '@/components/NavButtons.vue'

const router = useRouter()
const betStore = useBetStore()

const userName = computed({
  get: () => betStore.userName,
  set: (value: string) => betStore.setUserName(value),
})

const handleContinue = () => {
  if (betStore.userName.trim()) {
    router.push('/mainbet')
  }
}
</script>

<template>
  <main>
    <h1>Dein Name</h1>
    <p>Bitte gib deinen Namen ein, um fortzufahren.</p>
    <div class="mt-6">
      <input
        v-model="userName"
        type="text"
        placeholder="Name eingeben..."
        class="w-full bg-[#2D2D46] text-slate-100 px-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#E10600] text-lg"
        @keyup.enter="handleContinue"
      />
    </div>
  </main>

  <NavButtons :selected="userName.trim().length > 0" next-route="/mainbet/1" />
</template>

<style scoped>
@media (max-width: 214px) {
  .fixed {
    left: 0.25rem !important;
    right: 0.25rem !important;
    bottom: 0.25rem !important;
  }
}
</style>
