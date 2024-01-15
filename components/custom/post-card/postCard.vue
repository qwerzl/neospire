<script setup lang="ts">
import type { PropType } from 'vue'
import type { PostOrPage } from "@tryghost/content-api";

const props = defineProps({
  post: {
    type: Object as PropType<PostOrPage>,
    required: true,
  },
})
console.log(props.post)
</script>

<template>
  <a :href="`/post/${post.slug}`" class="py-6">
    <div class="flex bg-secondary shadow-sm rounded-sm overflow-hidden h-48 align-middle">
      <!-- TODO: Replace placeholder image -->
      <NuxtImg class="w-1/3 object-cover" :src="post.feature_image ?? 'https://images.unsplash.com/photo-1705086254104-753c689e5062?q=80&w=3714&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" />
      <div class="w-2/3 flex flex-col justify-around h-full px-6 py-3">
        <div>
          <div class="text-foreground font-bold text-2xl">{{ post.title }}</div>
          <div class="mt-2 text-secondary-foreground" v-if="post.custom_excerpt">{{ post.custom_excerpt }}</div>
        </div>
        <div class="w-full flex items-center justify-between">
          <div class="text-secondary-foreground text-sm"> {{ $dayjs(post.published_at).format("YYYY/MM/DD").toString() }}</div>
          <CustomAuthorBadge :authors="post.authors" v-if="post.authors" avatar />
        </div>

      </div>
    </div>
  </a>
</template>

<style scoped>

</style>
