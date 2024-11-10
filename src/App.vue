<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

</script>

<template>
  <div class="d-flex flex-column min-height-full">
    <SiteHeader class="flex-grow-0" />
    <RouterView class="flex-grow-1" />
    <SiteFooter class="flex-grow-0" />
  </div>

</template>

<style scoped>
.min-height-full {
  min-height: 100dvh;
}
</style>
