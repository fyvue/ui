<script lang="ts" setup>
import { NavLink } from "../types";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router";
import { useStorage } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    links: NavLink[];
    id?: string;
  }>(),
  {
    id: "main",
  }
);
const isOpen = useStorage(`isOpenSidebar-${props.id}`, true);
</script>
<template>
  <aside class="fui-sidebar" :class="isOpen ? '' : 'fui-sidebar__md'">
    <div class="fui-sidebar__controller">
      <button class="btn neutral" @click="isOpen = !isOpen">
        <ArrowLeftIcon v-if="isOpen" />
        <ArrowRightIcon v-else />
      </button>
    </div>
    <ul role="list">
      <li v-for="(link, index) of links" :key="`aside_link_${index}`">
        <RouterLink :to="link.to" class="fui-sidebar__link">
          <component :is="link.icon" v-if="link.icon" />
          <span>{{ link.name }}</span>
          <div role="tooltip" class="fui-tooltip">
            {{ link.name }}
          </div>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
