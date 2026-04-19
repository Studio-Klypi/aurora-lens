<script setup lang="ts">
import { ArrowRight, Eye, EyeOff } from "@lucide/vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { PasswordValidator } from "#shared/validators/password.validator";

const store = useAuthStore();

const showPassword = ref<boolean>(false);

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().regex(PasswordValidator.regex),
  })),
});
const submit = form.handleSubmit(async (values) => {
  if (await store.login(values)) navigateTo("/");
  else form.resetForm();
});
</script>

<template>
  <form
    class="flex flex-col gap-10 w-full @sm:w-xs"
    @submit="submit"
  >
    <header>
      <h1 class="text-4xl font-serif">
        {{ $t("auth.login.title") }}
      </h1>
    </header>

    <main class="grid gap-4">
      <UiFormField
        v-slot="{ componentField }"
        name="email"
      >
        <UiFormItem>
          <UiFormLabel>{{ $t("auth.login.fields.email.label") }}</UiFormLabel>
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              type="email"
              :placeholder="$t('auth.login.fields.email.placeholder')"
            />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>

      <UiFormField
        v-slot="{ componentField }"
        name="password"
      >
        <UiFormItem class="flex flex-col gap-2 space-y-0">
          <UiFormLabel>{{ $t("auth.login.fields.password.label") }}</UiFormLabel>
          <div class="relative">
            <UiFormControl>
              <UiInput
                v-bind="componentField"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('auth.login.fields.password.placeholder')"
                class="pr-10"
              />
            </UiFormControl>
            <UiButton
              type="button"
              size="icon-sm"
              variant="ghost"
              class="text-muted-foreground absolute top-0.5 right-0.5"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" />
              <Eye v-else />
            </UiButton>
          </div>
          <UiFormDescription class="self-end">
            <UiButton
              type="button"
              variant="link"
              class="p-0 h-auto text-muted-foreground"
              as-child
            >
              <NuxtLinkLocale to="/auth/forgot-password">
                Mot de passe oublié ?
              </NuxtLinkLocale>
            </UiButton>
          </UiFormDescription>
        </UiFormItem>
      </UiFormField>
    </main>

    <footer class="flex flex-col items-center gap-1">
      <UiButton>
        {{ $t("auth.login.action") }}
        <ArrowRight />
      </UiButton>
      <UiButton
        type="button"
        variant="link"
        size="sm"
        class="text-xs"
        as-child
      >
        <NuxtLink to="/auth/register">
          {{ $t("auth.login.not-registered") }}
        </NuxtLink>
      </UiButton>
    </footer>
  </form>
</template>
