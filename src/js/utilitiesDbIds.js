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

function getInstanceTree() {
  const model = window.spinal.ForgeViewer.viewer.model;
  const tree = model.getData().instanceTree;

  return tree;
}

function getDbIds(rootId) {
  const tree = getInstanceTree();
  const dbIds = [];

  tree.enumNodeChildren(rootId, dbId => {
    dbIds.push(dbId);
  });

  return dbIds;
}

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

function getAllDbIds() {
  const tree = getInstanceTree();
  const rootId = tree.getRootId();

  return getDbIdsRec(rootId);
}

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
