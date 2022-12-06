<script lang="ts" setup>
import { HomeIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import type { BreadcrumbLink } from "../types";
withDefaults(
  defineProps<{
    nav: BreadcrumbLink[];
  }>(),
  {
    nav: () => [],
  }
);
</script>
<template>
  <nav class="fui-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <template v-for="(item, index) in nav" :key="`bc_${index.toString()}`">
        <li
          :class="
            item.to
              ? index == 0
                ? 'fui-breadcrumb__home'
                : 'fui-breadcrumb__normal'
              : 'fui-breadcrumb__current'
          "
          :aria-current="item.to == $route.path ? undefined : 'page'"
        >
          <ChevronRightIcon v-if="index != 0" />

          <router-link :to="item.to" v-if="item.to">
            <HomeIcon v-if="index === 0" />
            {{ item.name }}
          </router-link>
          <span v-else>
            {{ item.name }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
