<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import {
  watch,
  onUnmounted,
  ref,
  WatchStopHandle,
  onMounted,
  computed,
} from "vue";
import type { Paging } from "../types";
import { useEventBus, useServerRouter } from "@fy-/core";
import { useRoute } from "vue-router";
import { useFyHead } from "@fy-/head";
const props = defineProps<{
  items: Paging;
  id: string;
}>();
const route = useRoute();
const eventBus = useEventBus();
const history = useServerRouter();
const prevNextSeo = ref<any>({});
const isNewPage = (page: number) => {
  return (
    page >= 1 && page <= props.items.page_max && page != props.items.page_no
  );
};
const pageWatcher = ref<WatchStopHandle>();

const next = () => {
  const page = props.items.page_no + 1;

  if (!isNewPage(page)) return;

  history.push({
    path: history.currentRoute.path,
    query: { page: page.toString() },
  });
};
const prev = () => {
  const page = props.items.page_no - 1;
  if (!isNewPage(page)) return;

  history.push({
    path: history.currentRoute.path,
    query: { page: page.toString() },
  });
};
const page = (page: number) => {
  if (!isNewPage(page)) return;

  history.push({
    path: history.currentRoute.path,
    query: { page: page.toString() },
  });
};

const checkPageNumber = (page: number = 1) => {
  prevNextSeo.value.next = undefined;
  prevNextSeo.value.prev = undefined;
  /* @ts-ignore */
  if (typeof FW !== "undefined") {
    /* @ts-ignore */
    if (page + 1 <= props.items.page_max && FW.URL) {
      /* @ts-ignore */
      // eslint-disable-next-line
      prevNextSeo.value.next = `${FW.URL.scheme}://${FW.URL.host}${FW.URL.path}?page=${page + 1}`;
    }
    /* @ts-ignore */
    if (page - 1 >= 1 && FW.URL) {
      /* @ts-ignore */
      // eslint-disable-next-line
      prevNextSeo.value.prev = `${FW.URL.scheme}://${FW.URL.host}${FW.URL.path}?page=${page - 1}`;
    }
  }
};

eventBus.on(`${props.id}GoToPage`, checkPageNumber);
onMounted(() => {
  pageWatcher.value = watch(
    () => route.query.page,
    (v) => {
      eventBus.emit(`${props.id}GoToPage`, v ? v : 1);
    }
  );
});
onUnmounted(() => {
  eventBus.off(`${props.id}GoToPage`, checkPageNumber);
  if (pageWatcher.value) pageWatcher.value();
});

checkPageNumber(props.items.page_no);
useFyHead({
  links: computed(() => {
    const result: any = [];
    if (prevNextSeo.value.next)
      result.push({
        href: prevNextSeo.value.next,
        rel: "next",
        key: "next",
      });
    if (prevNextSeo.value.prev)
      result.push({
        href: prevNextSeo.value.prev,
        rel: "prev",
        key: "prev",
      });
    return result;
  }),
});
</script>
<template>
  <div class="fui-paging" v-if="items && items.page_max > 1 && items.page_no">
    <div class="paging-container">
      <nav aria-label="Pagination">
        <a
          href="javascript:void(0);"
          @click="prev()"
          v-if="items.page_no >= 2"
          class="fui-paging__prev-next"
        >
          <span class="fui-sr-only">{{ $t("previous_paging") }}</span>
          <ChevronLeftIcon />
        </a>
        <a
          v-if="items.page_no - 2 > 1"
          class="fui-paging__innactive"
          href="javascript:void(0);"
          @click="page(1)"
        >
          1
        </a>
        <span v-if="items.page_no - 2 > 2" class="fui-paging__dots"> ... </span>
        <template v-for="i in 2">
          <a
            v-if="items.page_no - (3 - i) >= 1"
            class="fui-paging__innactive"
            href="javascript:void(0);"
            :key="`${i}-sm`"
            @click="page(items.page_no - (3 - i))"
          >
            {{ items.page_no - (3 - i) }}
          </a>
        </template>
        <a href="#" aria-current="page" class="fui-paging__active">
          {{ items.page_no }}
        </a>
        <template v-for="i in 2">
          <a
            v-if="items.page_no + i <= items.page_max"
            class="fui-paging__innactive"
            href="javascript:void(0);"
            :key="`${i}-md`"
            @click="page(items.page_no + i)"
          >
            {{ items.page_no + i }}
          </a>
        </template>
        <span
          v-if="items.page_no + 2 < items.page_max - 1"
          class="fui-paging__dots"
        >
          ...
        </span>
        <a
          v-if="items.page_no + 2 < items.page_max"
          class="fui-paging__innactive"
          href="javascript:void(0);"
          @click="page(items.page_max)"
        >
          {{ items.page_max }}
        </a>
        <a
          href="javascript:void(0);"
          @click="next()"
          v-if="items.page_no < items.page_max - 1"
          class="fui-paging__prev-next"
        >
          <span class="fui-sr-only">{{ $t("next_paging") }}</span>
          <ChevronRightIcon />
        </a>
      </nav>
      <p class="fui-paging__paging-text">
        {{
          $t("global_paging", {
            start: items.results_per_page * (items.page_no - 1),
            end: items.results_per_page * items.page_no,
            total: items.count >= 10000 ? $t("paging_a_lot_of") : items.count,
          })
        }}
      </p>
    </div>
  </div>
</template>
