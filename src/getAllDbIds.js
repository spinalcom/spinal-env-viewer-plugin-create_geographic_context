function getAllDbIds() {
  const model = window.spinal.ForgeViewer.viewer.model;
  const tree = model.getData().instanceTree;
  const rootId = tree.getRootId();
  let queue = [rootId];
  let dbIds = [rootId];

  while (queue.length) {
    let id = queue.shift();

    tree.enumNodeChildren(id, childId => {
      queue.push(childId);
      dbIds.push(childId);
    });
  }
  return dbIds;
}

export default getAllDbIds;
