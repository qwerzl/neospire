<script setup lang="ts">
import type { PropType } from 'vue'
import type { Author } from "@tryghost/content-api";

const props = defineProps({
  authors: {
    type: Array as PropType<Array<Author>>,
    default: '',
  },
})
</script>

<template>
  <div class="inline-flex items-center">
    <ul class="flex -space-x-1 overflow-hidden">
      <li v-for="author in props.authors">
        <!-- TODO: Change that stupid little author.url when author page is finished -->
        <a :href="author.url ?? ''" class="author-avatar" v-if="author.profile_image">
          <img class="author-profile-image inline-block h-6 w-6 rounded-full ring-2 ring-white"
               :src="author.profile_image"
          :alt="author.name" />
        </a>
        <a :href="author.url ?? ''" class="author-avatar" v-else>
          <img class="author-profile-image inline-block h-6 w-6 rounded-full ring-2 ring-white"
               src=""
               alt="" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
