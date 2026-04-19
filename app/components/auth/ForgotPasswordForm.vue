<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { CheckCircle } from "@lucide/vue";
import { z } from "zod";

const store = useAuthStore();
const { loading } = storeToRefs(store);

const success = ref<boolean>(false);

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    email: z.string().email(),
  })),
  keepValuesOnUnmount: true,
});
const submit = form.handleSubmit(async ({ email }) => {
  await store.forgotPassword(email);
  success.value = true;
});
</script>

<template>
  <template v-if="success">
    <div class="max-w-sm flex items-start gap-2">
      <CheckCircle class="shrink-0 size-4 mt-1" />
      <p>Nous vous avons envoyé un email de réinitialisation de mot de passe. Regardez dans votre boîte mail.</p>
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
      name="email"
    >
      <UiFormItem>
        <UiFormLabel>
          Adresse e-mail
        </UiFormLabel>
        <UiFormControl>
          <UiInput
            v-bind="componentField"
            type="email"
            placeholder="john.doe@example.xyz"
          />
        </UiFormControl>
      </UiFormItem>
    </UiFormField>

    <UiButton
      type="submit"
      class="@md/page:self-end"
      :disabled="loading.forgot"
    >
      Envoyer
      <UiSpinner v-if="loading.forgot" />
    </UiButton>
  </form>
</template>
