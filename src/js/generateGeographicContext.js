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

import hasProperties from "../js/hasProperties";
import createTmpTree from "../js/createTmpTree";

const PROGRESS_BAR_SIZE_GET_PROPS = 10;
const PROGRESS_BAR_SIZE_CREATE_TREE = 10;
const PROGRESS_BAR_SIZE_CREATE_GRAPH = 80;
const MAX_NON_SYNCHRONIZED_NODES = 300;

/**
 * Finds and returns the child of the parent with nodeName, or null if it doesn't find it.
 * @param {SpinalNode} parent Parent node from which to get the child
 * @param {String} nodeName Name of the node to search for
 * @param {String} relationName Relation in which to search
 * @return {SpinalNode | null} The first child with nodeName or null if it wasn't found
 */
async function getChild(parent, nodeName, relationName) {
  const children = await parent.getChildren(relationName);

  for (let child of children) {
    if (child.getName().get() === nodeName) {
      return child;
    }
  }

  return null;
}

/**
 * Recursively builds the geographic context from the given layout and
 * the temporary tree made of maps (nodes) and arrays (leafs), yielding every it adds a node.
 * @param {SpinalContext} context Context to which the nodes must belong
 * @param {SpinalNode} parent Parent to which the children must be added
 * @param {*} children Children to add to the parent
 * @param {*} layout Object containing the types of the nodes and names of the relations
 * @param {*} depth Depth of the recursion; determines what node type and relation name to use
 */
async function* generateGeoContextRec(context, parent, children, layout, depth) {
  if (children instanceof Map) {
    const promises = [];

    for (let [name, ] of children) {
      promises.push(getChild(parent, name, layout.relations[depth]));
    }

    const parentChildren = await Promise.all(promises);
    const entries = children.entries();

    for (let child of parentChildren) {
      let [name, value] = entries.next().value;

      if (child === null) {
        child = new SpinalNode(name, layout.types[depth]);

        yield parent.addChildInContext(
          child,
          layout.relations[depth],
          SPINAL_RELATION_TYPE,
          context
        );
      }

      yield* generateGeoContextRec(context, child, value, layout, depth + 1);
    }
  } else {
    for (let child of children) {
      yield bimObjectService.addBIMObject(context, parent, child.dbId, child.name);
    }
  }
}

/**
 * Waits for the nodes to be in the FileSystem.
 * @param {Array<Promise>} promises Array of promises containing the nodes
 */
async function waitForFileSystem(promises) {
  let nodes = await Promise.all(promises);

  return new Promise(resolve => {
    let inter = setInterval(() => {
      nodes = nodes.filter(node => {
        return FileSystem._objects[node._server_id] === undefined;
      });

      if (nodes.length === 0) {
        clearInterval(inter);
        resolve();
      }
    }, 500);
  });
}

/**
 * Generates a geographic context using the autodesk forge object tree.
 * @param {SpinalContext} context Context to fill
 * @param {Object} layout Object containing the types, keys and relation names necessary to generate the context
 * @param {Array<Number>} referential DbIds to use
 * @param {Object<value: Number>} progression Object containing the progression of the generation
 * @return {SpinalContext} The geographic context
 */
async function generateGeoContext(context, layout, referential, progression) {
  const promiseResults = await Promise.all([
    hasProperties(referential, layout.keys), // Get all useful properties
    bimObjectService.getContext() // Create BIMObjectContext if it isn't already done
  ]);
  const props = promiseResults[0].valid;

  if (props.length === 0) {
    return;
  }

  progression.value = PROGRESS_BAR_SIZE_GET_PROPS;

  const tmpTree = createTmpTree(props);
  const incrProg = PROGRESS_BAR_SIZE_CREATE_GRAPH * MAX_NON_SYNCHRONIZED_NODES / props.length;
  let promises = [];

  progression.value += PROGRESS_BAR_SIZE_CREATE_TREE;

  for await (let promise of generateGeoContextRec(context, context, tmpTree, layout, 0)) {
    promises.push(promise);

    if (promises.length === MAX_NON_SYNCHRONIZED_NODES) {
      progression.value += incrProg;
      // eslint-disable-next-line no-await-in-loop
      await waitForFileSystem(promises);
      promises = [];
    }
  }

  if (promises.length !== 0) {
    await waitForFileSystem(promises);
  }
  progression.value = 100;
}

export default generateGeoContext;
