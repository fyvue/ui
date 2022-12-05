<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ref } from "vue";
import type { NavLink } from "../types";
const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});
const isOpen = ref<boolean>(false);
const toggleDark = useToggle(isDark);
const toggleNavbarOpen = useToggle(isOpen);

withDefaults(
  defineProps<{
    title?: string;
    showTitle?: boolean;
    darkLight?: boolean;
    links: NavLink[];
    skipNavAnchor?: string;
  }>(),
  {
    skipNavAnchor: "#skip-nav",
    showTitle: true,
    darkLight: true,
    showDashboardLink: true,
  }
);
</script>
<template>
  <header class="fyui-nav">
    <div class="fyui-nav__wrapper">
      <a :href="skipNavAnchor" class="fyui-nav__skip-nav">Skip nav</a>
      <nav class="fyui-nav__main">
        <RouterLink to="/" class="fyui-nav__logo" :title="title">
          <slot name="logo">
            <span v-if="title && showTitle">{{ title }}</span>
          </slot>
        </RouterLink>
        <div class="fyui-nav__actions">
          <slot name="actions"> </slot>
          <button
            @click="toggleDark()"
            class="fyui-nav__rounded-action | btn neutral"
            v-if="darkLight"
          >
            <span class="fui-sr-only">Toggle dark/light</span>
            <MoonIcon v-if="!isDark" />
            <SunIcon v-else />
          </button>
          <button
            type="button"
            class="fyui-nav_toggle-open | fyui-nav__rounded-action btn neutral"
            @click="toggleNavbarOpen()"
          >
            <span class="fui-sr-only">Open main menu</span>
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          role="list"
          class="fyui-nav__ul"
          :class="isOpen ? 'fyui-nav__nav-open' : ''"
        >
          <li
            v-for="(link, index) in links"
            :key="`link_${index.toString()}`"
            :class="
              link.childrens && link.childrens.length > 0
                ? 'fyui-nav__li fyui-nav__has-childs'
                : 'fyui-nav__li'
            "
          >
            <template v-if="link.childrens && link.childrens.length > 0">
              <Menu>
                <MenuButton class="fyui-nav__is-link">
                  {{ link.name }}
                  <svg
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </MenuButton>
                <transition name="fade">
                  <MenuItems class="fyui-nav__sub">
                    <ul>
                      <MenuItem
                        v-for="(children, index) in link.childrens"
                        :key="`link_children_${index.toString()}`"
                      >
                        <li>
                          <router-link
                            v-if="!children.isExternal"
                            :to="children.to"
                            :title="children.name"
                            :alt="children.name"
                            class="fyui-nav__is-link"
                          >
                            {{ children.name }}
                          </router-link>
                          <a
                            v-else
                            :href="children.to"
                            :title="children.name"
                            :alt="children.name"
                            class="fyui-nav__is-link"
                          >
                            {{ children.name }}
                          </a>
                        </li>
                      </MenuItem>
                    </ul>
                  </MenuItems>
                </transition>
              </Menu>
            </template>
            <template v-else>
              <router-link
                v-if="!link.isExternal"
                :to="link.to"
                :title="link.name"
                :alt="link.name"
                class="fyui-nav__is-link"
                :class="false ? 'is-active' : ''"
              >
                {{ link.name }}
              </router-link>
              <a
                v-else
                :href="link.to"
                :title="link.name"
                :alt="link.name"
                class="fyui-nav__is-link"
                :class="false ? 'is-active' : ''"
              >
                {{ link.name }}
              </a>
            </template>
          </li>
          <li class="fyui-nav__custom"><slot name="custom"></slot></li>
          <li class="fyui-nav__btns"><slot name="buttons"></slot></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
