<template>
  <footer class="border-t border-[#e0e0e0] dark:border-[#2a2a2a] py-8 px-6 text-center">
    <p class="font-mono text-[12px] text-[#8a8a8a]">
      érico nunes carneiro · fullstack developer · manaus, br · {{ year }}
    </p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
