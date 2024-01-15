<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <nav
      :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <a
        href="/"
        class="text-sm font-medium transition-colors hover:text-primary"
    >
      博客
    </a>
    <a
        href="/store"
        class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      商店
    </a>
    <a
        href="/about"
        class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      关于我们
    </a>
  </nav>
</template>
