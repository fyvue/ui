<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  Dialog,
  TransitionRoot,
  DialogTitle,
  DialogPanel,
} from "@headlessui/vue";
import type { ConfirmModalData } from "../types";
import { useEventBus } from "@fy-/core";

const eventBus = useEventBus();
const confirm = ref<boolean>(false);
const title = ref<string | null>(null);
const desc = ref<string | null>(null);
const onConfirm = ref<Function | null>(null);

const _onConfirm = async () => {
  if (onConfirm.value) {
    await onConfirm.value();
  }
  resetConfirm();
};
const resetConfirm = () => {
  title.value = null;
  desc.value = null;
  onConfirm.value = null;
  confirm.value = false;
};
const showConfirm = (data: ConfirmModalData) => {
  title.value = data.title;
  desc.value = data.desc;
  onConfirm.value = data.onConfirm;
  confirm.value = true;
};

onMounted(() => {
  eventBus.on("resetConfirm", resetConfirm);
  eventBus.on("showConfirm", showConfirm);
});
onUnmounted(() => {
  eventBus.off("resetConfirm", resetConfirm);
  eventBus.off("showConfirm", showConfirm);
});
</script>
<template>
  <TransitionRoot
    :show="confirm"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog
      :open="confirm"
      @close="confirm = false"
      class="fui-modal-confirm | fui-modal"
    >
      <div class="fui-modal__container">
        <DialogPanel class="fui-modal__parent">
          <slot name="before" />
          <div class="fui-modal__inner">
            <DialogTitle class="fui-modal__title" v-if="title">
              {{ title }}
            </DialogTitle>

            <div
              :class="
                !title
                  ? 'fui-modal__is-alone fui-modal__content'
                  : 'fui-modal__content'
              "
            >
              <div class="fui-modal__desc default-p" v-if="desc">
                {{ desc }}
              </div>

              <div class="btn-box">
                <button
                  @click="confirm = false"
                  class="btn neutral btn-defaults"
                >
                  {{ $t("confirm_modal_cta_cancel") }}
                </button>
                <button @click="_onConfirm()" class="btn primary btn-defaults">
                  {{ $t("confirm_modal_cta_confirm") }}
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
