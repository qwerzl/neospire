<script setup lang="ts">
import type { PropType } from 'vue'
import type { Author } from "@tryghost/content-api";
import Badge from "~/components/ui/badge/Badge.vue";

const props = defineProps({
  authors: {
    type: Array as PropType<Array<Author>>,
    default: '',
  },
})
</script>

<template>
  <div class="inline-flex items-center">
    <ul v-for="(author, index) in props.authors" class="flex items-center">
        <!-- TODO: Change that stupid little author.url when author page is finished -->
<!--        <a :href="author.url ?? ''" class="author-avatar ml-1" v-if="author.profile_image">-->
<!--          <img class="author-profile-image inline-block h-5 w-5 rounded-full ring-1 ring-neutral-400"-->
<!--               :src="author.profile_image"-->
<!--          :alt="author.name" />-->
<!--        </a>-->
<!--        <a :href="author.url ?? ''" class="author-avatar ml-1" v-else>-->
<!--          <img class="author-profile-image inline-block h-5 w-5 rounded-full ring-1 ring-neutral-400"-->
<!--               src=""-->
<!--               alt="" />-->
<!--        </a>-->
        <Badge>
          {{ author.name }}
        </Badge>
        <Icon v-if="index !== props.authors.length - 1" name="charm:cross"/>
    </ul>
  </div>
</template>

<style scoped>

</style>
