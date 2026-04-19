<script setup lang="ts">
import Page from "~/components/composing/Page.vue";

const store = useAuthStore();
const { user } = storeToRefs(store);
</script>

<template>
  <Page>
    <div
      v-if="user"
      class="flex flex-col gap-3"
    >
      <div
        v-if="!user.emailVerifiedAt"
        class="flex items-center gap-2 p-3 border-b-3 border-orange-500 bg-orange-500/20"
      >
        <p>Votre e-mail n'est pas encore vérifié.</p>
        <UiButton
          size="xs"
          @click="store.requestNewCode()"
        >
          Envoyer un code
        </UiButton>
      </div>
      <p>
        {{ user.displayName }}
      </p>
    </div>
    <template v-else>
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
    </template>
  </Page>
</template>
