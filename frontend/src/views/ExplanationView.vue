<script setup lang="ts">
import NavButtons from '@/components/NavButtons.vue'
</script>

<template>
  <main class="p-6">
    <h1>Aufbau</h1>
    <p>Diese Umfrage gliedert sich in zwei Abschnitte: eine Hauptwette und eine Nebenwette.</p>
    <p>
      Bei der Hauptwette geht es darum, den Saisonsieger in der Fahrer- und Teamwertung
      vorherzusagen.
    </p>
    <p class="mb-8">
      Die Nebenwette enthält zum Teil skurrilere und schwerer vorhersehbare Fragen, die den
      Spaßfaktor erhöhen und zusätzliche Punkte ermöglichen.
    </p>
    <div class="flex">
      <div class="bg-[#5B5B92] rounded-lg py-1 px-2 my-2 text-slate-100 font-bold">NEU</div>
    </div>
    <h1>Bepunktung</h1>
    <p>Für jede korrekt beantwortete Frage gibt es Punkte.</p>
    <p>
      Die Hauptwette ist höher gewichtet als die Nebenwette, da sie den Saisonverlauf als Ganzes
      abbildet.
    </p>
    <p>
      Die Nebenwette dient vor allem dazu, auch mit mutigen oder kreativen Tipps noch Boden
      gutzumachen. Die Anzahl möglicher Punkte wird bei jeder Frage oben rechts angezeigt.
    </p>
  </main>

  <NavButtons :selected="true" :show-overview="false" back-route="/" next-route="/user-info" />
</template>
