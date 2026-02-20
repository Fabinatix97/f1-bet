<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { getBets, deleteBetByUserName } from '@/services/betApi'
import type { BetData } from '@/types/bet'
import { useSnackbarStore } from '@/stores/snackbar'

const bets = ref<BetData[]>([])
const loading = ref(true)
const deletingUserName = ref<string | null>(null)
const snackbar = useSnackbarStore()

async function loadBets() {
  loading.value = true
  try {
    bets.value = await getBets()
  } catch (e) {
    snackbar.show(
      e instanceof Error ? e.message : 'Fehler beim Laden der Wetten',
      'error'
    )
  } finally {
    loading.value = false
  }
}

async function deleteUser(bet: BetData) {
  const name = bet.userName.trim()
  if (!name) return
  if (!confirm(`Wette von „${name}“ wirklich löschen? Der Nutzer kann danach erneut abgeben.`)) {
    return
  }

  deletingUserName.value = name
  try {
    await deleteBetByUserName(name)
    snackbar.show(`Wette von „${name}“ gelöscht.`, 'success')
    await loadBets()
  } catch (e) {
    snackbar.show(
      e instanceof Error ? e.message : 'Löschen fehlgeschlagen',
      'error'
    )
  } finally {
    deletingUserName.value = null
  }
}

function formatDate(iso: string | undefined): string {
  if (!iso) return '–'
  try {
    const d = new Date(iso)
    return d.toLocaleString('de-DE', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

onMounted(loadBets)
</script>

<template>
  <main class="min-h-screen bg-[#1a1a2e] text-slate-100 p-6">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-2">Admin – Wetten verwalten</h1>
      <p class="text-slate-400 text-sm mb-6">
        Hier kannst du die abgegebene Wette eines Nutzers löschen. Danach kann der Nutzer erneut abgeben.
      </p>

      <div v-if="loading" class="text-slate-400 py-8">Lade Wetten…</div>

      <div v-else-if="bets.length === 0" class="text-slate-400 py-8">
        Keine Wetten vorhanden.
      </div>

      <ul v-else class="space-y-3">
        <li
          v-for="bet in bets"
          :key="bet.userName"
          class="flex items-center justify-between gap-4 bg-[#2D2D46] rounded-xl px-4 py-3"
        >
          <div class="min-w-0">
            <span class="font-semibold text-slate-100">{{ bet.userName }}</span>
            <span v-if="bet.submittedAt" class="block text-slate-400 text-sm mt-0.5">
              Abgegeben: {{ formatDate(bet.submittedAt) }}
            </span>
          </div>
          <button
            type="button"
            :disabled="deletingUserName === bet.userName.trim()"
            class="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            @click="deleteUser(bet)"
          >
            <Icon
              v-if="deletingUserName === bet.userName.trim()"
              icon="mdi:loading"
              class="text-lg animate-spin"
            />
            <Icon v-else icon="mdi:delete-outline" class="text-lg" />
            Löschen
          </button>
        </li>
      </ul>

      <button
        type="button"
        class="mt-6 px-4 py-2 rounded-lg bg-[#5B5B92] hover:bg-[#6B6BA2] text-slate-100 text-sm font-medium transition-colors"
        :disabled="loading"
        @click="loadBets"
      >
        Aktualisieren
      </button>
    </div>
  </main>
</template>
