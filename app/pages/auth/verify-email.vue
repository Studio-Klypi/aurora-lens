<script setup lang="ts">
import Page from "~/components/composing/Page.vue";

definePageMeta({
  layout: "authentication",
  middleware: ["strict-private"],
});

const { query } = useRoute();
const token = query.token;

const store = useAuthStore();
const { loading } = storeToRefs(store);

const countdown = useCountdown(() => {
  navigateTo("/");
});
const error = ref<{
  title: string;
  message: string;
} | null>(null);

onMounted(async () => {
  if (await store.verifyEmail(token as string)) countdown.start();
  else error.value = {
    title: "Une erreur est survenue.",
    message: "Le code de vérification fourni est invalide !",
  };
});
</script>

<template>
  <Page
    name="auth.verify-email"
    class="flex-1 grid place-items-center"
  >
    <div class="flex flex-col items-center gap-2">
      <template v-if="loading.verify">
        <UiSpinner class="size-10" />
        <p class="font-medium">
          Vérification de votre compte en cours...
        </p>
      </template>
      <template v-else-if="countdown.interval.value">
        <h1 class="text-xl font-bold">
          Félicitation, votre compte a été confirmé
        </h1>
        <p class="text-muted-foreground">
          Redirection automatique dans {{ countdown.remainingOccurrations }} secondes...
        </p>

        <UiButton
          size="sm"
          class="mt-4"
          as-child
        >
          <NuxtLinkLocale to="/">
            Retourner à l'accueil
          </NuxtLinkLocale>
        </UiButton>
      </template>
      <template v-else-if="error">
        <h1 class="text-xl font-bold">
          {{ error.title }}
        </h1>
        <p class="text-muted-foreground">
          {{ error.message }}
        </p>

        <UiButton
          size="sm"
          class="mt-4"
          as-child
        >
          <NuxtLinkLocale to="/">
            Retourner à l'accueil
          </NuxtLinkLocale>
        </UiButton>
      </template>
    </div>
  </Page>
</template>
