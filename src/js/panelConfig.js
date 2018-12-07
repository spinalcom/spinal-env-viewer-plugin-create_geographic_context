import {
  SpinalGraphService
} from "spinal-env-viewer-graph-service";

const DEFAULT_CONFIG = Object.freeze({
  useAllDbIds: true,
  referential: Object.freeze([]),
  levels: Object.freeze([])
});

function getDefaultConfig() {
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

function lstToArray(lst) {
  const arr = [];

  for (let i = 0; i < lst.length; i++) {
    arr.push(lst[i].get());
  }

  return arr;
}

async function loadConfig(config, context) {
  let contextElem;
  let modelConfig;

  try {
    contextElem = await SpinalGraphService.getRealNode(context.id.get()).getElement();
    modelConfig = contextElem.config;
  } catch (e) {
    console.error(e);
    return;
  }

  if (typeof modelConfig === "undefined") {
    return;
  }

  config.useAllDbIds = modelConfig.useAllDbIds.get();
  config.referential = lstToArray(modelConfig.referential);
  config.levels = lstToArray(modelConfig.levels);
}

async function saveConfig(context, config) {
  let contextElem;

  try {
    contextElem = await SpinalGraphService.getRealNode(context.id.get()).getElement();
  } catch (e) {
    console.error(e);
  }

  contextElem.mod_attr("config", config);
}

export {
  getDefaultConfig,
  loadConfig,
  saveConfig
};
