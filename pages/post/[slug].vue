<script setup lang="ts">
import type { PostOrPage } from "@tryghost/content-api";
import { useGhost } from "~/composables/useGhost";
const route = useRoute()

if (typeof route.params.slug !== "string") throw { statusCode: 404, message: 'Post not found' }

const post: PostOrPage = await useGhost().posts.read({
      slug: route.params.slug
    }, {
      include: 'authors'
    }
)

// console.log(post)
</script>

<template>
  <div class="max-w-prose mx-auto px-6 md:px-0">
    <header id="article-header" class="overflow-hidden pt-6 pb-6 md:pt-12">
      <figure class="rounded-2xl overflow-hidden mb-4" v-if="post.feature_image">
        <NuxtPicture
            format="avif, webp"
            :imgAttrs="{class: 'h-full w-full object-cover'}"
            :src="post.feature_image"
            :alt="post.title"
        />
      </figure>
      <div class="pt-4 md:pt-6">
        <h1 class="text-[2rem] text-foreground font-bold leading-snug mb-4 md:mb-6 md:text-[2.6rem]">{{ post.title }}</h1>

        <p class="text-primary-foreground mb-6" v-if="post.custom_excerpt">{{post.custom_excerpt}}</p>

        <div class="text-primary-foreground">
          <section class="flex items-center gap-3 text-sm flex-wrap">
            <CustomAuthorBadge :authors="post.authors" />
            <div>
<!--              <time datetime='{{date format='YYYY-MM-DD'}}'>{{date}}</time>-->
              <div class="text-primary-foreground"> 发布于 {{ $dayjs(post.published_at).format("YYYY/MM/DD").toString() }}</div>
            </div>
          </section>
        </div>
      </div>
    </header>

    <section class="mt-10 prose">
      <div v-html="post.html"
           class="flex-col space-y-7 text-primary-foreground article leading-relaxed"
      />
    </section>
  </div>
</template>

<style scoped>

</style>
