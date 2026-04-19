<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import ResetPasswordForm from "~/components/auth/ResetPasswordForm.vue";

definePageMeta({
  layout: "authentication",
  middleware: ["strict-public"],
});
</script>

<template>
  <Page
    name="auth.reset-password"
    class="flex-1 grid place-items-center"
  >
    <div class="flex flex-col gap-6">
      <header class="grid gap-1.5">
        <h1 class="text-4xl font-serif">
          Nouveau mot de passe
        </h1>
      </header>

      <ResetPasswordForm />
    </div>
  </Page>
</template>
