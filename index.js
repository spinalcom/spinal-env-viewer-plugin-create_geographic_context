import {
  spinalPanelManagerService,
  SpinalMountExtention
} from "spinal-env-viewer-panel-manager-service";

import Vue from "vue";
import dialog from "./src/dialog.vue";
import {
  spinalContextMenuService,
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";

SpinalMountExtention.mount({
  name: "CreateGeographicContextDialog",
  vueMountComponent: Vue.extend(dialog),
  parentContainer: document.body
});

class TestButton extends SpinalContextApp {
  constructor() {
    super("Create Geographic Context", "Creates a geographic context", {
      icon: "account_balance",
      icon_type: "in",
      backgroundColor: "#0000FF",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    return Promise.resolve(true);
  }

  async action(option) {
    spinalPanelManagerService.openPanel("CreateGeographicContextDialog");
  }
}

spinalContextMenuService.registerApp(
  "GraphManagerGlobalBar",
  new TestButton()
);
