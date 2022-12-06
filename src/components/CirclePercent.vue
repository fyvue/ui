<script lang="ts" setup>
withDefaults(
  defineProps<{
    percent: number;
    textXY?: Array<number>;
    color?: string;
  }>(),
  {
    percent: 100,
    textXY: () => [18, 20.85],
    color: "blue",
  }
);
</script>
<template>
  <div class="fui-circlePercent">
    <svg viewBox="0 0 36 36" class="fui-circlePercent__chart">
      <path
        class="fui-circlePercent__bg"
        d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        class="fui-circlePercent__circle"
        :stroke-dasharray="`${percent}, 100`"
        :stroke="color"
        d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text
        :x="textXY[0].toString()"
        :y="textXY[1].toString()"
        class="fui-circlePercent__percent"
      >
        {{ percent }}%
      </text>
    </svg>
  </div>
</template>
