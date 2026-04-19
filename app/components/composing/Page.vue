<script setup lang="ts">
import type { ComposingProps } from "~/components/composing/index";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<ComposingProps>(), {
  name: "home",
});
</script>

<template>
  <main
    :data-page-name="name"
    :class="cn('@container/page', props.class)"
  >
    <slot />
  </main>
</template>
