<script setup lang="ts">
import Page from "~/components/composing/Page.vue";
import ForgotPasswordForm from "~/components/auth/ForgotPasswordForm.vue";

definePageMeta({
  layout: "authentication",
  middleware: ["strict-public"],
});
</script>

<template>
  <Page
    name="auth.forgot-password"
    class="flex-1 grid place-items-center"
  >
    <div class="flex flex-col gap-6">
      <header class="grid gap-1.5">
        <h1 class="text-4xl font-serif">
          Mot de passe oublié
        </h1>
        <p class="max-w-sm text-muted-foreground">
          Entrez votre adresse e-mail et, si un compte existe, nous vous enverrons un e-mail de réinitialisation de mot de passe.
        </p>
      </header>

      <ForgotPasswordForm />
    </div>
  </Page>
</template>
