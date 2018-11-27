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

import {spinalPanelManagerService} from "spinal-env-viewer-panel-manager-service";
import {SpinalForgeExtention} from "spinal-env-viewer-panel-manager-service_spinalforgeextention";

import Vue from "vue";
import dialog from "./src/vue/dialog.vue";
import {
  spinalContextMenuService,
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";

const extentionCreated = SpinalForgeExtention.createExtention({
  name: "generate_geographic_context",
  vueMountComponent: Vue.extend(dialog),
  panel: {
    title: "Generate a Geographic Context",
    classname: "gen-geo-context",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px"
  },
  onload: () => {},
  onUnLoad: () => {}
});

SpinalForgeExtention.registerExtention("generate_geographic_context",
  extentionCreated);

class TestButton extends SpinalContextApp {
  constructor() {
    super("Create a geographic context", "Creates a geographic context", {
      icon: "account_balance",
      icon_type: "in",
      backgroundColor: "#0000FF",
      fontColor: "#FFFFFF"
    });
  }

  isShown() {
    return Promise.resolve(true);
  }

  action() {
    spinalPanelManagerService.openPanel("generate_geographic_context");
  }
}

spinalContextMenuService.registerApp(
  "GraphManagerGlobalBar",
  new TestButton()
);
