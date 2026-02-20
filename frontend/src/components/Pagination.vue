<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  totalPages: number
  routePattern: string
}>()

const route = useRoute()
const router = useRouter()

const scrollContainer = ref<HTMLElement | null>(null)
const showLeftGradient = ref(false)
const showRightGradient = ref(true)

const currentPage = computed(() => {
  const path = route.path
  const match = path.match(new RegExp(`${props.routePattern}/(\\d+)`))
  if (match && match[1]) {
    const num = parseInt(match[1], 10)
    return num >= 1 && num <= props.totalPages ? num : 1
  }
  return 1
})

const goToPage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= props.totalPages) {
    router.push(`${props.routePattern}/${pageNumber}`)
  }
}

const allPages = Array.from({ length: props.totalPages }, (_, i) => i + 1)

const updateScrollIndicators = () => {
  if (!scrollContainer.value) return

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  showLeftGradient.value = scrollLeft > 0
  showRightGradient.value = scrollLeft < scrollWidth - clientWidth - 1
}

watch(currentPage, () => {
  nextTick(() => {
    if (scrollContainer.value) {
      const buttons = scrollContainer.value.querySelectorAll('button')
      const activeButton = buttons[currentPage.value - 1] as HTMLElement
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
      setTimeout(updateScrollIndicators, 300)
    }
  })
})

onMounted(() => {
  if (scrollContainer.value) {
    updateScrollIndicators()
    scrollContainer.value.addEventListener('scroll', updateScrollIndicators)
    window.addEventListener('resize', updateScrollIndicators)
    nextTick(() => {
      const buttons = scrollContainer.value?.querySelectorAll('button')
      const activeButton = buttons?.[currentPage.value - 1] as HTMLElement
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
        setTimeout(updateScrollIndicators, 300)
      }
    })
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', updateScrollIndicators)
  }
  window.removeEventListener('resize', updateScrollIndicators)
})
</script>

<template>
  <div class="fixed bottom-6 left-6 right-6 z-50 flex justify-center">
    <div class="relative w-fit max-w-full">
      <div
        v-if="showLeftGradient"
        class="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-[#14141E] to-transparent pointer-events-none z-10 rounded-l-full"
      ></div>

      <div
        v-if="showRightGradient"
        class="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-[#14141E] to-transparent pointer-events-none z-10 rounded-r-full"
      ></div>

      <div
        ref="scrollContainer"
        class="w-fit max-w-full bg-[#14141E]/95 backdrop-blur-sm py-3 px-3 rounded-full overflow-x-auto scrollbar-hide relative"
      >
        <div class="flex items-center justify-start gap-1 min-w-max">
          <button
            v-for="page in allPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-2.5 py-2 rounded-full font-bold text-sm transition-colors min-w-9 shrink-0',
              page === currentPage
                ? 'bg-[#E10600] text-slate-100'
                : 'bg-[#2D2D46] text-[#8888B7] hover:bg-[#3D3D56] active:scale-95',
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@media (max-width: 214px) {
  .fixed {
    left: 0.25rem !important;
    right: 0.25rem !important;
    bottom: 0.25rem !important;
  }
}
</style>
