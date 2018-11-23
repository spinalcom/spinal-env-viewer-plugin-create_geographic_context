function getCoordinates(prop) {
  const coordinates = [];

  for (let property of prop.properties) {
    coordinates.push(property.value);
  }
  return coordinates;
}

function sortTree(tree) {
  if (tree instanceof Array)
    return tree.sort();
  for (let [key, value] of tree) {
    tree[key] = sortTree(value);
  }
  return new Map([...tree.entries()].sort());
}

function createTmpTree(props) {
  const root = new Map();

  for (let prop of props) {
    let coordinates = getCoordinates(prop);
    let node = root;
    let coord;

    for (let i = 0; i < coordinates.length - 1; i++) {
      coord = coordinates[i];

      if (!node.has(coord))
        node.set(coord, new Map());
      node = node.get(coord);
    }
    coord = coordinates[coordinates.length - 1];

    if (!node.has(coord))
      node.set(coord, new Array());
    node = node.get(coord);
    node.push(prop);
  }
  return sortTree(root);
}

export default createTmpTree;
