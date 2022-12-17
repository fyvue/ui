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
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <template v-for="(item, index) in nav" :key="`bc_${index.toString()}`">
        <li
          :class="
            item.to
              ? index == 0
                ? 'fui-breadcrumb__home'
                : 'fui-breadcrumb__normal'
              : 'fui-breadcrumb__current'
          "
          itemprop="itemListElement"
          itemtype="https://schema.org/ListItem"
          itemscope
        >
          <ChevronRightIcon v-if="index != 0" />

          <router-link :to="item.to" v-if="item.to" itemprop="item">
            <HomeIcon v-if="index === 0" />
            <span itemprop="name">{{ item.name }}</span>
            <meta itemprop="position" :content="(index + 1).toString()" />
          </router-link>
          <span v-else>
            <span itemprop="name">{{ item.name }}</span>
            <meta itemprop="position" :content="(index + 1).toString()" />
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
