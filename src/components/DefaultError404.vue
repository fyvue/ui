<template>
  <div class="fui-404">
    <div class="">
      <div class="fui-404__title">404</div>
      <div class="fui-404__content">
        {{ $t("fv_404_title") }}
      </div>
      <br /><br />
      <button @click="$router.go(-1)" class="btn primary">
        {{ $t("fv_404_back_to_home") }}
      </button>
    </div>
  </div>
</template>
