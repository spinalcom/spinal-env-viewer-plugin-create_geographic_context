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
 * Gets the values of the properties of the object.
 * @param {Object} prop Simplified infos of an object
 * @param {Array<Object>} prop.properties Array of the objects properties
 * @param {string} prop.properties[].value Value of the property
 * @returns {Array<string>} Array of the values of the properties of the object
 */
function getCoordinates(prop) {
  const coordinates = [];

  for (let property of prop.properties) {
    coordinates.push(property.value);
  }

  return coordinates;
}

/**
 * Sorts the nodes of the tree.
 * @param {Map} tree Temporary tree
 * @returns {Map} The sorted tree
 */
function sortTree(tree) {
  if (tree instanceof Array) {
    return tree.sort();
  }

  for (let [key, value] of tree) {
    tree[key] = sortTree(value);
  }

  return new Map([...tree.entries()].sort());
}

/**
 * Creates a temporary tree from properties.
 * @param {Array<Object>} props Properties to use to create the tree
 * @returns {Map} The root of the temporary tree
 */
function createTmpTree(props) {
  const root = new Map();

  for (let prop of props) {
    let coordinates = getCoordinates(prop);
    let node = root;
    let coord;

    for (let i = 0; i < coordinates.length - 1; i++) {
      coord = coordinates[i];

      if (!node.has(coord)) {
        node.set(coord, new Map());
      }

      node = node.get(coord);
    }

    coord = coordinates[coordinates.length - 1];

    if (!node.has(coord)) {
      node.set(coord, new Array());
    }

    node = node.get(coord);
    node.push(prop);
  }

  return sortTree(root);
}

export default createTmpTree;
