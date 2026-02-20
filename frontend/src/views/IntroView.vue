<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-6">
    <main class="flex flex-col items-center">
      <h1 class="text-center my-4">F1-Wette</h1>

      <div class="flex flex-col items-center font-extrabold my-2">
        <span class="text-9xl text-slate-100">20</span>
        <span class="text-9xl text-[#E10600]">26</span>
      </div>

      <nav class="flex flex-col gap-6 mt-20">
        <RouterLink
          to="/explanation"
          class="flex justify-center py-4 px-8 rounded-full font-bold text-slate-100 bg-[#E10600] hover:bg-[#F11610] transition-colors"
        >
          Wette abgeben
        </RouterLink>
        <RouterLink
          to="/results"
          class="flex justify-center py-4 px-8 rounded-full font-bold text-slate-100 bg-[#5B5B92] hover:bg-[#6B6BA2] transition-colors"
        >
          Ergebnisse ansehen
        </RouterLink>
      </nav>
    </main>
  </div>
</template>
