// import Vue from "vue"
// import Vue2ol from "@gis-js/vue2ol"
import "ol/ol.css";
import "ant-design-vue/dist/antd.css";
import "highlight.js/styles/lightfair.css";

// import a from "ant-design-vue"
// console.log(a);

/**
 * to主题使用者：你可以去掉本文件的所有代码
 */
export default async ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // 用于监控在路由变化时检查广告拦截器 (to主题使用者：你可以去掉本文件的所有代码)
  if (!isServer) {
    window["global"] = window;

    await import("@gis-js/vue2ol" /* webpackChunkName: "notification" */).then(
      (module) => {
        Vue.use(module.default);
      }
    );
    await import(
      "@gis-js/vue2ol-extend" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.use(module.default);
    });

    await import("ant-design-vue" /* webpackChunkName: "notification" */).then(
      (module) => {
        // console.log(module);
        Vue.use(module.default);
      }
    );
    await import("vue-json-viewer" /* webpackChunkName: "notification" */).then(
      (module) => {
        // console.log(module);
        Vue.component("VueJsonViewer", module.default);
      }
    );
    await import(
      "@highlightjs/vue-plugin" /* webpackChunkName: "notification" */
    ).then((module) => {
      // console.log(module);
      Vue.use(module.default);
    });

    await import(
      "../components/BaseMap.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("BaseMap", module.default);
    });
    await import(
      "../components/LengthUnits.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("LengthUnits", module.default);
    });
    await import(
      "../components/AreaUnits.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("AreaUnits", module.default);
    });

    await import(
      "../components/GeojsonType.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("GeojsonType", module.default);
    });

    await import(
      "../components/Drawer.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("Drawer", module.default);
    });
    await import(
      "../components/Json.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("Json", module.default);
    });
    await import(
      "../components/Bbox.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("Bbox", module.default);
    });
    await import(
      "../components/GridType.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("GridType", module.default);
    });
    await import(
      "../components/GeojsonText.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("GeojsonText", module.default);
    });
    await import(
      "../components/Position.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("Position", module.default);
    });
    await import(
      "../components/GeojsonObj.vue" /* webpackChunkName: "notification" */
    ).then((module) => {
      Vue.component("GeojsonObj", module.default);
    });
  }
};
