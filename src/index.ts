import type { App, Plugin } from "vue";
import "./styles/style.scss";
import NavMain from "./components/NavMain.vue";
import CirclePercent from "./components/CirclePercent.vue";
import NavBreadcrumb from "./components/NavBreadcrumb.vue";
import DefaultModal from "./components/DefaultModal.vue";
import ConfirmModal from "./components/ConfirmModal.vue";
import DefaultInput from "./components/DefaultInput.vue";
import DefaultLoader from "./components/DefaultLoader.vue";
import DefaultPaging from "./components/DefaultPaging.vue";
import DefaultSteps from "./components/DefaultSteps.vue";
import DefaultTable from "./components/DefaultTable.vue";
import DefaultError404 from "./components/DefaultError404.vue";

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
        app.component("DefaultLoader", DefaultLoader);
        app.component("DefaultPaging", DefaultPaging);
        app.component("DefaultSteps", DefaultSteps);
        app.component("DefaultTable", DefaultTable);
        app.component("DefaultError404", DefaultError404);
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
  "DefaultLoader",
  "DefaultPaging",
  "DefaultSteps",
  "DefaultTable",
  "DefaultError404",
];

const fyuiResolver = (componentName: string) => {
  if (componentsList.includes(componentName))
    return { name: componentName, from: "@fy-/ui" };
};

export {
  createFyUI,
  fyuiResolver,
  NavMain,
  CirclePercent,
  NavBreadcrumb,
  DefaultModal,
  ConfirmModal,
  DefaultInput,
  DefaultLoader,
  DefaultPaging,
  DefaultSteps,
  DefaultTable,
  DefaultError404,
};

export * from "./types";

declare module "vue" {
  export interface GlobalComponents {
    CirclePercent: typeof import("./components/CirclePercent.vue")["default"];
    ConfirmModal: typeof import("./components/ConfirmModal.vue")["default"];
    DefaultError404: typeof import("./components/DefaultError404.vue")["default"];
    DefaultInput: typeof import("./components/DefaultInput.vue")["default"];
    DefaultLoader: typeof import("./components/DefaultLoader.vue")["default"];
    DefaultModal: typeof import("./components/DefaultModal.vue")["default"];
    DefaultPaging: typeof import("./components/DefaultPaging.vue")["default"];
    DefaultSteps: typeof import("./components/DefaultSteps.vue")["default"];
    DefaultTable: typeof import("./components/DefaultTable.vue")["default"];
    InnerLoader: typeof import("./components/inc/InnerLoader.vue")["default"];
    NavBreadcrumb: typeof import("./components/NavBreadcrumb.vue")["default"];
    NavMain: typeof import("./components/NavMain.vue")["default"];
  }
}
