<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { PasswordValidator } from "#shared/validators/password.validator";
import { CheckCircle } from "@lucide/vue";

const { query } = useRoute();
const token = query.token as string;

const store = useAuthStore();
const { loading } = storeToRefs(store);

const success = ref<boolean>(false);
const countdown = useCountdown(() => {
  navigateTo("/auth/login");
});

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    password: z.string().regex(PasswordValidator.regex),
  })),
});
const submit = form.handleSubmit(async ({ password }) => {
  success.value = await store.resetPassword(token, password);
});

watch(success, (value) => {
  if (!value) return;
  countdown.start();
});
</script>

<template>
  <template v-if="success && countdown.interval.value">
    <div class="max-w-sm flex items-start gap-2">
      <CheckCircle class="shrink-0 size-4 mt-1" />
      <p>Votre mot de passe a été réinitialisé et tous les appareils déconnectés. Vous serez redirigé dans {{ countdown.remainingOccurrations }} secondes...</p>
    </div>

    <UiButton
      variant="secondary"
      class="self-center"
      as-child
    >
      <NuxtLinkLocale to="/auth/login">
        Me connecter
      </NuxtLinkLocale>
    </UiButton>
  </template>
  <form
    v-else
    class="flex flex-col gap-6"
    @submit="submit"
  >
    <UiFormField
      v-slot="{ componentField }"
      name="password"
    >
      <UiFormItem>
        <UiFormLabel>Mot de passe</UiFormLabel>
        <UiFormControl>
          <UiInput
            v-bind="componentField"
            type="password"
          />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton
      class="@md/page:self-end"
      :disabled="loading.reset"
    >
      Réinitialiser
      <UiSpinner v-if="loading.reset" />
    </UiButton>
  </form>
</template>
