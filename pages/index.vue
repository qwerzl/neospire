<script setup lang="ts">
import { useGhost } from "~/composables/useGhost";
const posts = await useGhost().posts
    .browse({
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
</script>

<template>
  <ul>
    <li v-for="post in posts">{{ post.title }}</li>
  </ul>
</template>

<style scoped>

</style>
