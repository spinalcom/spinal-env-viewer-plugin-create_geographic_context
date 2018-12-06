import {
  SpinalContext
} from "spinal-model-graph";

import {
  SpinalContextApp
} from "spinal-env-viewer-context-menu-service";
import {
  spinalPanelManagerService
} from "spinal-env-viewer-panel-manager-service";
import GeographicContextService from "spinal-env-viewer-context-geographic-service";

class GenerateGeoContextApp extends SpinalContextApp {
  constructor() {
    super("Generate a geographic context", "Generates a geographic context", {
      icon: "build",
      icon_type: "in",
      backgroundColor: "rgba(0, 0, 0, 0)",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    const context = option.selectedNode;
    console.log('alexis', option)
    if (context.type.get() === GeographicContextService.constants.CONTEXT_TYPE) {
      return Promise.resolve(true);
    }

    return Promise.resolve(-1);
  }

  action(option) {
    spinalPanelManagerService.openPanel("generate_geographic_context", option);
  }
}

export default GenerateGeoContextApp;
