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
    <div class="rounded-lg shadow bg-background relative top-16 mt-6 h-32 flex justify-between border-t">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <CustomNavIcon></CustomNavIcon>
        <span class="text-sm sm:text-center text-foreground">© 2024 <a href="https://computerization.io" class="hover:underline">Computerization</a>. All Rights Reserved.
        </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
            <li>
              <!-- TODO: GitHub link -->
              <NuxtLink href="#" class="me-4">
                <Icon name="mdi:github" size="2em"/>
              </NuxtLink>
            </li>
            <li>
              <!-- TODO: Mail link -->
              <NuxtLink href="#" class="me-4">
                <Icon name="material-symbols:mail" size="2em" />
              </NuxtLink>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
