<script lang="ts" setup>
import { NavLink } from "../types";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { useStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
const props = withDefaults(
  defineProps<{
    links: NavLink[];
    id?: string;
  }>(),
  {
    id: "main",
  }
);
const route = useRoute();
const isLinkActive = (link: NavLink) => {
  if (link.to != "/") {
    if (route.path == link.to || route.path.includes(link.to))
      return "router-link-active";
  } else {
    if (route.path == link.to) {
      return "router-link-exact-active";
    }
  }
  return "";
};
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
        <RouterLink
          :to="link.to"
          class="fui-sidebar__link"
          :class="isLinkActive(link)"
        >
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
