<template>
  <div class="min-h-screen bg-white dark:bg-[#0d0d0d] text-[#0d0d0d] dark:text-[#f0f0ee] transition-colors duration-300">
    <AppNav />
    <main class="pt-14">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
