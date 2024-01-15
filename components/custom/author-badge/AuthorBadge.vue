<script setup lang="ts">
import type { PropType } from 'vue'
import type { Author } from "@tryghost/content-api";
import Badge from "~/components/ui/badge/Badge.vue";

const props = defineProps({
  authors: {
    type: Array as PropType<Array<Author>>,
    required: true
  },
  avatar: {
    type: Boolean,
    required: false,
    default: false,
  }
})
</script>

<template>
  <div class="inline-flex items-center">
    <div v-for="(author, index) in props.authors" class="flex-row items-center">
        <!-- TODO: Change that stupid little author.url when author page is finished -->
        <a :href="author.url ?? ''" class="author-avatar" v-if="author.profile_image && avatar">
          <img class="author-profile-image inline-block h-5 w-5 rounded-full ring-1 ring-neutral-400"
               :src="author.profile_image"
          :alt="author.name" />
        </a>
        <Badge v-else>
          {{ author.name }}
        </Badge>
        <Icon v-if="index !== props.authors.length - 1" name="charm:cross"/>
    </div>
  </div>
</template>

<style scoped>

</style>
