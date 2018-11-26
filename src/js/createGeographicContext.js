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
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_LST_PTR_TYPE
} from "spinalgraph";
import bimObjectService from "spinal-env-viewer-plugin-bimobjectservice";

import getAllDbIds from "./getAllDbIds";
import hasProperties from "./hasProperties";
import createTmpTree from "./createTmpTree";

async function createContext(name) {
  const forgefile = await window.spinal.spinalSystem.getModel();
  let graph;
  let context;

  if (typeof forgefile.graph === "undefined") {
    forgefile.graph = new SpinalGraph();
  }
  graph = forgefile.graph;
  context = await graph.getContext(name);

  if (typeof context !== "undefined") {
    await graph.removeChild(context, "hasContext", SPINAL_RELATION_TYPE);
  }
  context = new SpinalContext(name);
  await graph.addContext(context);
  return context;
}

async function createGeoContextRec(context, parent, children, relationNames, depth) {
  let promises = [];

  if (children instanceof Map) {
    for (let [name, value] of children) {
      promises.push(
        parent.addChildInContext(
          new SpinalNode(name),
          relationNames[depth],
          SPINAL_RELATION_LST_PTR_TYPE,
          context
        ).then(node =>
          createGeoContextRec(context, node, value, relationNames, depth + 1)
        ));
    }
  } else {
    for (let child of children) {
      promises.push(bimObjectService.createBIMObject(child.dbId, child.name).then(node =>
        parent.addChildInContext(node, relationNames[depth], SPINAL_RELATION_LST_PTR_TYPE, context)
      ));
    }
  }
  await Promise.all(promises);
}

/**
 * Creates a geographic context using the autodesk forge object tree.
 * @param {String} contextName Name of the context
 * @param {Array<String>} layout Keys of the properties to use to locate the equipment
 * @param {Array<String>} relationNames Relation names of the context
 * @return {SpinalContext} The geographic context
 */
async function createGeoContext(contextName, layout, relationNames) {
  const promiseResults = await Promise.all([
    hasProperties(getAllDbIds(), layout),// Get all useful properties
    createContext(contextName),// Create the geographic context
    bimObjectService.getContext()// Create BIMObjectContext if it isn't already done
  ]);

  const props = promiseResults[0].valid;
  const context = promiseResults[1];

  const tmpTree = createTmpTree(props);

  await createGeoContextRec(context, context, tmpTree, relationNames, 0);

  return context;
}

export default createGeoContext;
