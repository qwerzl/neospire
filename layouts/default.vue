<script setup lang="ts">
</script>

<template>
  <div>
    <div class="border-b px-4 fixed top-0 w-full z-10 backdrop-blur-3xl">
      <div class="flex h-16 items-center">
        <CustomNavIcon />
        <CustomNavMain class="mx-6 invisible lg:visible" />
        <div class="ml-auto flex items-center space-x-4 invisible lg:visible">
          <CustomNavSearch />
          <CustomNavUser />
        </div>
      </div>
    </div>
    <div class="relative top-16">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
