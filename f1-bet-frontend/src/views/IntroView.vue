<template>
  <div class="min-h-screen flex justify-center items-center p-6">
    <main>
      <div class="flex justify-center my-4">
        <h1>F1-Wette</h1>
      </div>

      <div class="flex justify-center my-2">
        <div class="flex flex-col font-extrabold items-center">
          <div class="text-9xl text-slate-100">20</div>
          <div class="text-9xl text-[#E10600]">26</div>
        </div>
      </div>

      <div class="flex justify-center mt-20 mb-2">
        <div class="flex flex-col space-y-6">
          <div class="flex bg-[#E10600] py-4 px-8 rounded-full justify-center">
            <RouterLink to="/explanation" class="font-bold text-slate-100"
              >Wette abgeben</RouterLink
            >
          </div>
          <div class="flex bg-[#5B5B92] py-4 px-8 rounded-full justify-center">
            <RouterLink to="/results" class="font-bold text-slate-100"
              >Ergebnisse ansehen</RouterLink
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
