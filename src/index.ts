import type { App, Plugin } from "vue";
import "./styles/style.scss";
import NavMain from "./components/NavMain.vue";
import CirclePercent from "./components/CirclePercent.vue";
import NavBreadcrumb from "./components/NavBreadcrumb.vue";
import DefaultModal from "./components/DefaultModal.vue";
import ConfirmModal from "./components/ConfirmModal.vue";
import DefaultInput from "./components/DefaultInput.vue";

function createFyUI() {
  return {
    install(app: App) {
      if (app) {
        app.component("NavMain", NavMain);
        app.component("CirclePercent", CirclePercent);
        app.component("NavBreadcrumb", NavBreadcrumb);
        app.component("DefaultModal", DefaultModal);
        app.component("ConfirmModal", ConfirmModal);
        app.component("DefaultInput", DefaultInput);
      }
    },
  } as Plugin;
}

const componentsList = [
  "NavMain",
  "CirclePercent",
  "NavBreadcrumb",
  "DefaultModal",
  "ConfirmModal",
  "DefaultInput",
];

export {
  createFyUI,
  componentsList,
  NavMain,
  CirclePercent,
  NavBreadcrumb,
  DefaultModal,
  ConfirmModal,
  DefaultInput,
};

declare module "vue" {
  export interface GlobalComponents {
    CirclePercent: typeof import("./components/CirclePercent.vue")["default"];
    ConfirmModal: typeof import("./components/ConfirmModal.vue")["default"];
    DefaultModal: typeof import("./components/DefaultModal.vue")["default"];
    NavBreadcrumb: typeof import("./components/NavBreadcrumb.vue")["default"];
    NavMain: typeof import("./components/NavMain.vue")["default"];
    DefaultInput: typeof import("./components/DefaultInput.vue")["default"];
  }
}
