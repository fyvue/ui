<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from "@headlessui/vue";
import { ref, onMounted, onUnmounted, h } from "vue";
import { useEventBus } from "@fy-/core";
import { XCircleIcon } from "@heroicons/vue/24/solid";

const props = withDefaults(
  defineProps<{
    id: string;
    title?: string;
    onOpen?: Function;
    onClose?: Function;
    closeIcon?: Object;
  }>(),
  {
    closeIcon: () => h(XCircleIcon),
  }
);

const eventBus = useEventBus();

const isOpen = ref<boolean>(false);
const setModal = (value: boolean) => {
  if (value === true) {
    if (props.onOpen) props.onOpen();
  } else {
    if (props.onClose) props.onClose();
  }
  isOpen.value = value;
};
onMounted(() => {
  eventBus.on(`${props.id}Modal`, setModal);
});
onUnmounted(() => {
  eventBus.off(`${props.id}Modal`, setModal);
});
</script>
<template>
  <TransitionRoot
    :show="isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog :open="isOpen" @close="setModal" class="fui-modal">
      <div class="fui-modal__container">
        <DialogPanel class="fui-modal__parent">
          <slot name="before" />
          <div class="fui-modal__inner">
            <DialogTitle class="fui-modal__title" v-if="title">
              {{ title }}
              <a href="javascript:void(0)" @click="setModal(false)">
                <component :is="closeIcon" class="fui-modal__close-icon" />
              </a>
            </DialogTitle>
            <a href="javascript:void(0)" @click="setModal(false)" v-else>
              <component
                :is="closeIcon"
                class="fui-modal__close-icon | fui-modal__is-alone"
              />
            </a>
            <div
              :class="
                !title
                  ? 'fui-modal__is-alone fui-modal__content'
                  : 'fui-modal__content'
              "
            >
              <slot />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
