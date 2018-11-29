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
  SPINAL_RELATION_TYPE
} from "spinalgraph";
import bimObjectService from "spinal-env-viewer-plugin-bimobjectservice";

import getAllDbIds from "./getAllDbIds";
import hasProperties from "./hasProperties";
import createTmpTree from "./createTmpTree";

async function createGeoContextRec(context, parent, children, types,
  relationNames,
  depth) {
  let promises = [];

  if (children instanceof Map) {
    for (let [name, value] of children) {
      promises.push(
        parent.addChildInContext(
          new SpinalNode(name, types[depth]),
          relationNames[depth],
          SPINAL_RELATION_TYPE,
          context
        ).then(node =>
          createGeoContextRec(context, node, value, types, relationNames,
            depth +
            1)
        ));
    }
  } else {
    for (let child of children) {
      promises.push(bimObjectService.addBIMObject(context, parent, child.dbId,
        child.name));
    }
  }
  await Promise.all(promises);
}

/**
 * Creates a geographic context using the autodesk forge object tree.
 * @param {SpinalContext} context Context to fill
 * @param {Array<String>} types Types of the nodes
 * @param {Array<String>} layout Keys of the properties to use to locate the equipment
 * @param {Array<String>} relationNames Relation names of the context
 * @param {Array<Number>} referencial DbIds to use
 * @return {SpinalContext} The geographic context
 */
async function createGeoContext(context, types, layout, relationNames,
  referencial) {
  referencial = getAllDbIds();
  const promiseResults = await Promise.all([
    hasProperties(referencial, layout), // Get all useful properties
    bimObjectService.getContext() // Create BIMObjectContext if it isn't already done
  ]);

  const props = promiseResults[0].valid;

  if (props.length === 0) {
    return;
  }

  const tmpTree = createTmpTree(props);

  await createGeoContextRec(context, context, tmpTree, types, relationNames,
    0);
}

export default createGeoContext;
