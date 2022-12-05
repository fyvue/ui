import type { App, Plugin } from "vue";
import "./styles/style.scss";
import HeaderNavbar from "./components/HeaderNavbar.vue";

function createFyUI() {
  return {
    install(app: App) {
      if (app) {
        app.component("HeaderNavbar", HeaderNavbar);
      }
    },
  } as Plugin;
}

export { createFyUI, HeaderNavbar };
