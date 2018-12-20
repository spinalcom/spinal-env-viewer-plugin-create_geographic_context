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
  SpinalGraphService
} from "spinal-env-viewer-graph-service";

const DEFAULT_CONFIG = Object.freeze({
  useAllDbIds: true,
  referential: Object.freeze([]),
  levels: Object.freeze([])
});

/**
 * Returns a clone of DEFAULT_CONFIG.
 * @returns {Object} The DEFAULT_CONFIG clone
 */
function getDefaultConfig() {
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

/**
 * Converts a list into an array.
 * @param {Lst} lst The list to convert
 * @returns {Array} The converted array
 */
function lstToArray(lst) {
  const arr = [];

  for (let i = 0; i < lst.length; i++) {
    arr.push(lst[i].get());
  }

  return arr;
}

/**
 * Loads the config from the context. If there is none, returns the default config.
 * @param {SpinalContext} context Context from which to load the config
 * @returns {Object} The config
 */
async function loadConfig(context) {
  const config = {};
  let contextElem;
  let modelConfig;

  try {
    contextElem = await SpinalGraphService.getRealNode(context.id.get()).getElement();
    modelConfig = contextElem.config;
  } catch (e) {
    console.error(e);
    return getDefaultConfig();
  }

  if (typeof modelConfig === "undefined") {
    return getDefaultConfig();
  }

  config.useAllDbIds = modelConfig.useAllDbIds.get();
  config.referential = lstToArray(modelConfig.referential);
  config.levels = lstToArray(modelConfig.levels);

  return config;
}

/**
 * Saves the config into the context.
 * @param {SpinalContext} context Context in which to save the config
 * @param {Object} config Config to save
 */
async function saveConfig(context, config) {
  let contextElem;

  try {
    contextElem = await SpinalGraphService.getRealNode(context.id.get()).getElement();
  } catch (e) {
    console.error(e);
    return;
  }

  contextElem.mod_attr("config", config);
}

export {
  getDefaultConfig,
  loadConfig,
  saveConfig
};
