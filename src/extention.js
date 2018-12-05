import Vue from "vue";

import {
  SpinalForgeExtention
} from "spinal-env-viewer-panel-manager-service_spinalforgeextention";

import panel from "./vue/panel.vue";

const extention = SpinalForgeExtention.createExtention({
  name: "generate_geographic_context",
  vueMountComponent: Vue.extend(panel),
  panel: {
    title: "Generate a Geographic Context",
    classname: "gen-geo-context",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px"
  },
  onLoad() {},
  onUnLoad() {}
});

export default extention;
