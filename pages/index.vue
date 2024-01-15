<script setup lang="ts">
import { useGhost } from "~/composables/useGhost";
import type { PostOrPage } from "@tryghost/content-api";

const posts: PostOrPage[] | void = await useGhost().posts
    .browse({
      limit: "all",
      include: ['authors']
    })
    .catch(err => {
      console.error(err);
    });
if (!posts) throw {"errorCode": 500}

</script>

<template>
  <div class="post-feed max-w-[96ch] px-6 mx-auto grid grid-cols-1 gap-4 mt-6">
    <div v-for="post in posts">
      <CustomPostCard :post="post" />
    </div>
  </div>
</template>

<style scoped>

</style>
