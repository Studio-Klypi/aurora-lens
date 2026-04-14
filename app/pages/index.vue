<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
</script>

<template>
  <Page>
    <div class="flex items-center gap-1.5">
      <UiButton
        variant="ghost"
        size="sm"
        as-child
      >
        <NuxtLink to="/auth/register">
          {{ $t("navigation.register") }}
        </NuxtLink>
      </UiButton>
      <UiButton
        size="sm"
        as-child
      >
        <NuxtLink to="/auth/login">
          {{ $t("navigation.login") }}
        </NuxtLink>
      </UiButton>
    </div>
  </Page>
</template>
