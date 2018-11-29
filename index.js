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

import Vue from "vue";

import {SpinalContext} from "spinalgraph";

import {
  spinalContextMenuService,
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";
import {spinalPanelManagerService} from "spinal-env-viewer-panel-manager-service";
import {SpinalForgeExtention} from "spinal-env-viewer-panel-manager-service_spinalforgeextention";
import GeographicContextService from "spinal-env-viewer-context-geographic-service";

import panel from "./src/vue/panel.vue";

const extentionCreated = SpinalForgeExtention.createExtention({
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
  onload: () => {},
  onUnLoad: () => {}
});

SpinalForgeExtention.registerExtention("generate_geographic_context",
  extentionCreated);

class GenerateGeoContext extends SpinalContextApp {
  constructor() {
    super("Generate a geographic context", "Generates a geographic context", {
      icon: "build",
      icon_type: "in",
      backgroundColor: "#0000FF",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    const context = option.selectedNode;

    if (context instanceof SpinalContext &&
      context.getType().get() === GeographicContextService.constants.CONTEXT_TYPE
    ) {
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);
  }

  action(option) {
    spinalPanelManagerService.openPanel("generate_geographic_context", option);
  }
}

spinalContextMenuService.registerApp(
  "GraphManagerSideBar",
  new GenerateGeoContext()
);
