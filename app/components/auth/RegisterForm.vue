<script setup lang="ts">
import { Eye, EyeOff, ArrowRight, Info } from "@lucide/vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { UsernameValidator } from "#shared/validators/username.validator";
import { PasswordValidator } from "#shared/validators/password.validator";

const store = useAuthStore();
const { loading } = storeToRefs(store);

const showPassword = ref<boolean>(false);

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    username: z.string().regex(UsernameValidator.regex),
    email: z.string().email(),
    password: z.string().regex(PasswordValidator.regex),
  })),
});
const submit = form.handleSubmit(async (values) => {
  if (await store.register(values)) navigateTo("/");
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
        {{ $t("auth.register.title") }}
      </h1>
    </header>

    <main class="grid gap-4">
      <UiFormField
        v-slot="{ componentField }"
        name="username"
      >
        <UiFormItem>
          <UiFormLabel>
            {{ $t("auth.register.fields.username.label") }}

            <UiTooltip>
              <UiTooltipTrigger>
                <Info class="size-3.5 text-muted-foreground" />
              </UiTooltipTrigger>
              <UiTooltipContent>
                <p>{{ $t("auth.register.fields.username.tooltip") }}</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiFormLabel>
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              :disabled="loading.register"
              :placeholder="$t('auth.register.fields.username.placeholder')"
            />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>

      <UiFormField
        v-slot="{ componentField }"
        name="email"
      >
        <UiFormItem>
          <UiFormLabel>{{ $t("auth.register.fields.email.label") }}</UiFormLabel>
          <UiFormControl>
            <UiInput
              v-bind="componentField"
              type="email"
              :disabled="loading.register"
              :placeholder="$t('auth.register.fields.email.placeholder')"
            />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>

      <UiFormField
        v-slot="{ componentField }"
        name="password"
      >
        <UiFormItem>
          <UiFormLabel>
            {{ $t("auth.register.fields.password.label") }}

            <UiTooltip>
              <UiTooltipTrigger>
                <Info class="size-3.5 text-muted-foreground" />
              </UiTooltipTrigger>
              <UiTooltipContent>
                <ul class="list-disc list-inside">
                  <li
                    v-for="i in 4"
                    :key="i"
                  >
                    {{ $t(`auth.register.fields.password.tooltip[${i - 1}]`) }}
                  </li>
                </ul>
              </UiTooltipContent>
            </UiTooltip>
          </UiFormLabel>
          <div class="relative">
            <UiFormControl>
              <UiInput
                v-bind="componentField"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('auth.register.fields.password.placeholder')"
                :disabled="loading.register"
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
        </UiFormItem>
      </UiFormField>
    </main>

    <footer class="flex flex-col items-center gap-1">
      <p class="text-xs text-muted-foreground mb-3 text-center">
        <i18n-t keypath="auth.register.warning">
          <template #link>
            <NuxtLink
              to="/"
              class="underline-offset-4 hover:underline hover:text-foreground transition-colors duration-75"
            >
              {{ $t("auth.register.terms-of-use") }}
            </NuxtLink>
          </template>
        </i18n-t>
      </p>

      <UiButton :disabled="loading.register">
        {{ $t("auth.register.action") }}
        <UiSpinner v-if="loading.register" />
        <ArrowRight v-else />
      </UiButton>
      <UiButton
        type="button"
        variant="link"
        size="sm"
        class="text-xs"
        as-child
      >
        <NuxtLink to="/auth/login">
          {{ $t("auth.register.already-registered") }}
        </NuxtLink>
      </UiButton>
    </footer>
  </form>
</template>
