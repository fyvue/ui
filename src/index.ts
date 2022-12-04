import type { App, Plugin } from "vue";
import "./styles/style.scss";
import FyTest from "./components/FyTest.vue";

function createFyUI() {
  return {
    install(app: App) {
      if (app) {
        app.component("FyTest", FyTest);
      }
    },
  } as Plugin;
}

export { createFyUI, FyTest };
