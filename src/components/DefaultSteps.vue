<script setup lang="ts">
import { computed } from "vue";
import type { Step } from "../types";

const props = withDefaults(
  defineProps<{
    steps?: Step[];
    currentStep?: number;
  }>(),
  {
    steps: () => [],
    currentStep: 1,
  }
);

const barWidth = computed(() => (props.currentStep * 100) / props.steps.length);
const getStepClass = (index: number) => {
  if (index + 1 < props.currentStep) return "fui-steps__past-step";
  if (index + 1 == props.currentStep) return "fui-steps__current-step";
  return "fui-steps__past-step";
};
</script>
<template>
  <div class="fui-steps">
    <div class="fui-steps__bar-container">
      <div class="fui-steps__bar" :style="`width:${barWidth}%`"></div>
    </div>

    <ol>
      <li
        v-for="(step, index) in steps"
        v-bind:key="index"
        :class="getStepClass(index as number)"
      >
        <span> {{ $t(step.name) }} </span>

        <component :is="step.icon" v-if="step.icon" />
      </li>
    </ol>
  </div>
</template>
