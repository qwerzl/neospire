<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { PostOrPage } from "@tryghost/content-api";
import { useGhost } from "~/composables/useGhost";

interface featuredArticle {
  image: string,
  href: string
}
// TODO: Explore a better way to manage featured posts.
// Current strategy is to create a page in ghost with slug "top-carousel" then write plain JSON as content.
const post: PostOrPage = await useGhost().pages.read({
      slug: "top-carousel"
    },
    {formats: ['plaintext']}
)
if (!post.plaintext) throw {"errorCode": 500}
const featuredArticles: Array<featuredArticle> = JSON.parse(post.plaintext)
</script>

<template>
  <Carousel>
    <CarouselContent class="">
      <CarouselItem v-for="article in featuredArticles">
        <NuxtLink :to="article.href">
          <NuxtImg :src="article.image" class="object-cover h-full w-screen aspect-[5/2] lg:aspect-[4/1]"/>
        </NuxtLink>

      </CarouselItem>
      <CarouselPrevious class="absolute left-10 bg-background border-none"/>
      <CarouselNext class="absolute right-10 bg-background border-none"/>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
