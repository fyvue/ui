<script setup lang="ts">
import { useEventBus } from "@fy-/core";
import { onMounted, onUnmounted, ref } from "vue";
import InnerLoader from "./inc/InnerLoader.vue";

const props = withDefaults(
  defineProps<{
    id?: string;
    loader?: Object;
    showLoadingText?: boolean;
    size?: string;
    force?: boolean;
  }>(),
  {
    loader: () => InnerLoader,
    showLoadingText: true,
    size: "16",
    force: false,
  }
);

const eventBus = useEventBus();
const loading = ref<boolean>(false);
const setLoading = (value: boolean) => {
  loading.value = value;
};
onMounted(() => {
  if (props.id) {
    eventBus.on(`${props.id}-loading`, setLoading);
  } else {
    eventBus.on("loading", setLoading);
  }
});
onUnmounted(() => {
  if (props.id) {
    eventBus.off(`${props.id}-loading`, setLoading);
  } else {
    eventBus.off("loading", setLoading);
  }
});
</script>
<template>
  <div class="fui-loader" v-if="loading || force">
    <div
      class="fui-loader__container"
      role="status"
      :style="`width:${size}rem; height:${size}rem;`"
    >
      <component :is="loader" :size="size" :showLoadingText="showLoadingText" />
    </div>
  </div>
</template>
