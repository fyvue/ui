<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>
<template>
  <div>
    <p>Hello world: {{ title }}</p>
  </div>
</template>
