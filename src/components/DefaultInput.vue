<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";
import { computed, ref, toRef } from "vue";
import type { modelValueType, checkboxValueType } from "../types";
import type { ErrorObject } from "@vuelidate/core";
import { useTranslation } from "@fy-/core";
const props = withDefaults(
  defineProps<{
    id: string;
    showLabel?: boolean;
    label?: string;
    type?: string;
    placeholder?: string;
    autocomplete?: string;
    checkboxTrueValue?: string | boolean;
    checkboxFalseValue?: string | boolean;
    req?: boolean;
    linkIcon?: string;
    modelValue?: modelValueType;
    checkboxValue?: checkboxValueType;
    options?: string[][];
    help?: string;
    error?: string;
    errorVuelidate?: ErrorObject[];
    disabled?: boolean;
  }>(),
  {
    showLabel: true,
    type: "text",
    req: false,
    options: () => [],
    checkboxTrueValue: true,
    checkboxFalseValue: false,
    disabled: false,
  }
);
const translate = useTranslation();
const inputRef = ref<HTMLInputElement>();
const errorProps = toRef(props, "error");
const errorVuelidateProps = toRef(props, "errorVuelidate");

const checkErrors = computed(() => {
  if (errorProps.value) return errorProps.value;
  if (errorVuelidateProps.value && errorVuelidateProps.value.length > 0) {
    const err = `vuelidate_validator_${errorVuelidateProps.value[0].$validator.toString()}`;
    return translate(err);
  }

  return null;
});

const focus = () => {
  if (inputRef.value) inputRef.value.focus();
};
const getInputRef = () => {
  if (inputRef.value) return inputRef.value;
};

const emit = defineEmits(["update:modelValue", "update:checkboxValue"]);
const model = computed({
  get: () => props.modelValue,
  set: (items) => {
    emit("update:modelValue", items);
  },
});
const modelCheckbox = computed({
  get: () => props.checkboxValue,
  set: (items) => {
    emit("update:checkboxValue", items);
  },
});
defineExpose({ focus, getInputRef });
</script>
<template>
  <div class="fui-input">
    <template v-if="showLabel && id && label">
      <label class="fui-input__label" :for="id">
        <input
          :aria-label="label"
          ref="inputRef"
          v-if="type == 'checkbox'"
          type="checkbox"
          class="form-checkbox"
          :id="id"
          :class="{ 'error-form': checkErrors }"
          :true-value="checkboxTrueValue"
          :false-value="checkboxFalseValue"
          v-model="modelCheckbox"
        />

        {{ label }}

        <a
          class="fui-input__link"
          :href="linkIcon"
          target="_blank"
          v-if="linkIcon"
        >
          <LinkIcon />
        </a>
        <sup class="fui-input__req" v-if="req">*</sup>
      </label>
    </template>
    <div
      v-if="!['checkbox', 'radiobox'].includes(type)"
      class="fui-input__box"
      :class="{
        'fui-input__error': checkErrors,
        'fui-input__disabled': disabled,
      }"
    >
      <slot name="before"></slot>
      <input
        ref="inputRef"
        :aria-label="label"
        v-if="
          ['text', 'password', 'email', 'search', 'date', 'datetime'].includes(
            type
          )
        "
        class="fui-input__input"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :id="id"
        v-model="model"
        :type="type"
        :disabled="disabled"
      />
      <textarea
        :aria-label="label"
        ref="inputRef"
        v-if="type == 'textarea'"
        class="fui-input__input"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :id="id"
        v-model="model"
        :disabled="disabled"
      />

      <select
        :aria-label="label"
        ref="inputRef"
        v-if="type == 'select'"
        :id="id"
        class="fui-input__input"
        v-model="model"
      >
        <option v-for="opt in options" :value="opt[0]" :key="opt[0].toString()">
          {{ opt[1] }}
        </option>
      </select>
      <slot name="after"></slot>
    </div>

    <div v-if="checkErrors" class="fui-input__error-label">
      {{ checkErrors }}
    </div>
    <div class="fui-input__help" v-if="help">
      {{ help }}
    </div>
  </div>
</template>
