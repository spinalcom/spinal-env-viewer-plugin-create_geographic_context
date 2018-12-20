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

/**
 * Returns the instance tree of the forge viewer model.
 * @returns {Object} The instance tree of the forge viewer model
 */
function getInstanceTree() {
  const model = window.spinal.ForgeViewer.viewer.model;
  const tree = model.getData().instanceTree;

  return tree;
}

/**
 * Takes a dbId and returns its children.
 * @param {number} rootId Parent dbId
 * @returns {Array<number>} Children dbIds
 */
function getDbIds(rootId) {
  const tree = getInstanceTree();
  const dbIds = [];

  tree.enumNodeChildren(rootId, dbId => {
    dbIds.push(dbId);
  });

  return dbIds;
}

/**
 * Recursively gets all children dbIds of the root dbId.
 * @param {number} rootId Root dbId
 * @returns {Array<number>} The children dbIds of the root dbId
 */
function getDbIdsRec(rootId) {
  const tree = getInstanceTree();
  const queue = [rootId];
  const dbIds = [];

  while (queue.length) {
    let id = queue.shift();

    tree.enumNodeChildren(id, childId => {
      queue.push(childId);
      dbIds.push(childId);
    });
  }
  return dbIds;
}

/**
 * Returns all leaf dbIds children of the root dbId.
 * @param {number} rootId Root dbId
 * @returns {Array<number>} The children dbIds of the root dbId that are leafs in the tree
 */
function getLeafDbIds(rootId) {
  const tree = getInstanceTree();
  const queue = [rootId];
  const dbIds = [];
  let hasChildren;

  while (queue.length) {
    let id = queue.shift();

    hasChildren = false;

    tree.enumNodeChildren(id, childId => {
      hasChildren = true;
      queue.push(childId);
    });

    if (!hasChildren) {
      dbIds.push(id);
    }
  }

  return dbIds;
}

/**
 * Gets all the dbIds in the instance tree of the viewer.
 * @returns {Array<number>} All of the dbIds in the tree
 */
function getAllDbIds() {
  const tree = getInstanceTree();
  const rootId = tree.getRootId();

  return getDbIdsRec(rootId);
}

/**
 * Gets all the leaf dbIds in the instance tree of the viewer.
 * @returns {Array<number>} All of the leaf dbIds in the tree
 */
function getAllLeafDbIds() {
  const tree = getInstanceTree();
  const rootId = tree.getRootId();

  return getLeafDbIds(rootId);
}

export {
  getInstanceTree,
  getDbIds,
  getDbIdsRec,
  getLeafDbIds,
  getAllDbIds,
  getAllLeafDbIds
};
