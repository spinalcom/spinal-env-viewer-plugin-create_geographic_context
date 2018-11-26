/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 * 
 * This file is part of SpinalCore.
 * 
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 * 
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 * 
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import {
  spinalPanelManagerService,
  SpinalMountExtention
} from "spinal-env-viewer-panel-manager-service";

import Vue from "vue";
import dialog from "./src/vue/dialog.vue";
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
    super("Create a geographic context", "Creates a geographic context", {
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
