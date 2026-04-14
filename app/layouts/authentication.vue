<script setup lang="ts">
import Layout from "~/components/composing/Layout.vue";
import { ArrowLeft } from "@lucide/vue";
</script>

<template>
  <Layout name="authentication">
    <header class="fixed top-0 inset-x-0 h-16 flex items-center gap-2 px-6">
      <UiButton
        size="icon-sm"
        variant="ghost"
        as-child
      >
        <NuxtLink to="/">
          <ArrowLeft />
        </NuxtLink>
      </UiButton>
      <p class="font-serif leading-none">
        Aurora Lens
      </p>
    </header>

    <main>
      <NuxtPage />
    </main>
  </Layout>
</template>
