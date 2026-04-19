<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import LoginForm from "~/components/auth/LoginForm.vue";

definePageMeta({
  layout: "authentication",
  middleware: ["strict-public"],
});
</script>

<template>
  <Page
    name="auth.login"
    class="min-h-dvh grid place-items-center"
  >
    <LoginForm />
  </Page>
</template>
