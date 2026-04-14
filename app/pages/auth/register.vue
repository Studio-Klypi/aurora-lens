<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import RegisterForm from "~/components/auth/RegisterForm.vue";

definePageMeta({
  layout: "authentication",
});
</script>

<template>
  <Page
    name="auth.register"
    class="min-h-dvh grid place-items-center"
  >
    <RegisterForm />
  </Page>
</template>
