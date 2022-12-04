import type { UserConfig } from "vite";
import copy from "rollup-plugin-copy";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

const path = require("path");

const config: UserConfig = {
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.d.ts",
    }),
    Components({ dts: "src/components.d.ts" }),
    copy({
      targets: [
        {
          src: "package.json",
          dest: "dist/",
          rename: "package.json",
          transform: (contents) => {
            // @ts-ignore
            let _contents = contents.toString().replaceAll("./dist/", "./");
            _contents = _contents.replaceAll("dist/", "");
            _contents = _contents
              .toString()
              .replaceAll(
                /"devDependencies": {([\S\s]+)}/gm,
                '"devDependencies": {}\n}'
              );
            _contents = _contents
              .toString()
              .replaceAll(/"scripts": {([\S\s]+)}/gm, '"scripts": {}\n}');
            return _contents;
          },
        },
        { src: "README.md", dest: "dist/", rename: "README.md" },
        /*{
          src: "./components.d.ts",
          dest: "dist/dist/",
          transform: (contents, filename) => {
            let _contents = contents.toString().replaceAll("./src/", "./");
            _contents = _contents.replace("import '@vue/runtime-core'", "");
            _contents = _contents.replace("@vue/runtime-core", "vue");
            _contents = _contents.replace("export {}", "");
            _contents = _contents.replaceAll(".vue", ".vue.d.ts");
            return _contents;
          },
        },*/
      ],
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@fy-/ui",
      formats: ["es", "cjs"],
      fileName: (format) => `fyui.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "@vue/compiler-dom"],
      output: {
        exports: "named",
        sourcemap: true,
        dir: "./dist/",
        globals: {
          vue: "Vue",
          "@vue/compiler-dom": "VueCompilerDOM",
        },
      },
    },
    emptyOutDir: false,
  },
};

export default config;
