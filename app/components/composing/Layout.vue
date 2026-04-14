<script setup lang="ts">
import type { ComposingProps } from "~/components/composing/index";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<ComposingProps>(), {
  name: "default",
});
</script>

<template>
  <div
    :data-layout-name="name"
    :class="cn('@container/layout', props.class)"
  >
    <slot />
  </div>
</template>
