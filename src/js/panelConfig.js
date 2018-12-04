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

async function loadConfig(context) {
  const contextElem = await context.getElement();

  if (typeof contextElem.config === "undefined") {
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  const modelConfig = contextElem.config;
  const convertedConfig = {};

  convertedConfig.useAllDbIds = modelConfig.useAllDbIds.get();
  convertedConfig.referential = lstToArray(modelConfig.referential);
  convertedConfig.levels = lstToArray(modelConfig.levels);

  return convertedConfig;
}

async function saveConfig(context, config) {
  const contextElem = await context.getElement();

  contextElem.mod_attr("config", config);
}

export {
  getDefaultConfig,
  loadConfig,
  saveConfig
};
