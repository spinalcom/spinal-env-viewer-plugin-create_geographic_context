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
  SPINAL_RELATION_TYPE,
  SpinalNode,
  SpinalGraphService
} from "spinal-env-viewer-graph-service";


import createTmpTree from "../js/createTmpTree";

const PROGRESS_BAR_SIZE_GET_PROPS = 10;
const PROGRESS_BAR_SIZE_CREATE_TREE = 10;
const PROGRESS_BAR_SIZE_CREATE_GRAPH = 80;
const MAX_NON_SYNCHRONIZED_NODES = 300;

/**
 * Finds the children in the node with the given names.
 * @param {SpinalNode} parent Parent node from which to get the child
 * @param {Iterator<String>} nodeNames Iterator over the names of the nodes
 * @param {String} relationName Relation in which to search
 * @returns {Array<SpinalNode | null} An array of the children that were found and of undefined
 */
async function getChildrenByNames( parent, nodeNames, relationName ) {
  const children = await SpinalGraphService.getChildren( parent.id, relationName );
  const found = [];
  
  for (let name of nodeNames) {
    found.push(
      children.find(
        child => {
          return child.name.get() === name
        }
      )
    );
  }
  
  return found;
}

/**
 * Recursively builds the geographic context from the given layout and
 * the temporary tree made of maps (nodes) and arrays (leafs), yielding every it adds a node.
 * @param {SpinalContext} context Context to which the nodes must belong
 * @param {SpinalNode} parent Parent to which the children must be added
 * @param {Map<string> | Array<String>} children Children to add to the parent
 * @param {Object} layout Object containing the types of the nodes and names of the relations
 * @param {Number} depth Depth of the recursion; determines what node type and relation name to use
 * @yields {Promise<SpinalNode>} A promise of the last node that was added to the graph
 */
async function* generateGeoContextRec( context, parent, children, layout, depth, ref ) {
  console.log( children );
  if (children instanceof Map) {
    const foundChildren = await getChildrenByNames( parent, children.keys(), layout.relations[depth] );
    const entries = children.entries();
    
    for (let child of foundChildren) {
      let [name, value] = entries.next().value;
      
      if (child === undefined) {
        child = SpinalGraphService.createNode( {
          name,
          type: layout.types[depth]
        } );
        
        yield SpinalGraphService.addChildInContext(
          parent.id.get(),
          child,
          context.id.get(),
          layout.relations[depth],
          SPINAL_RELATION_TYPE
        );
        
        child = SpinalGraphService.getInfo( child );
      }
      
      yield* generateGeoContextRec( context, child, value, layout, depth + 1, ref );
    }
  } else {
    for (let child of children) {
      
      // Will throw error if we try to add the same node twice
      try {
        if (ref) {
          yield window.spinal.BimObjectService.addReferenceObject( parent.id.get(), child.dbId, child.name );
        } else {
          yield window.spinal.BimObjectService.addBIMObject( context.id.get(), parent.id.get(), child.dbId, child.name );
          
        }
      } catch ( e ) {
        console.error( e )
      }
    }
  }
}

/**
 * Waits for the nodes to be in the FileSystem.
 * @param {Array<Promise>} promises Array of promises containing the nodes
 * @returns {Promise<nothing>} An empty promise
 */
async function waitForFileSystem( promises ) {
  let nodes = await Promise.all( promises );
  
  return new Promise( resolve => {
    let inter = setInterval( () => {
      nodes = nodes.filter( node => {
        return FileSystem._objects[node._server_id] === undefined;
      } );
      
      if (nodes.length === 0) {
        clearInterval( inter );
        resolve();
      }
    }, 500 );
  } );
}

/**
 * Generates a geographic context using the autodesk forge object tree.
 * @param {SpinalContext} context Context to fill
 * @param {Object} layout Object containing the types, keys and relation names necessary to generate the context
 * @param {Array<Object>} props Properties to use
 * @param {Object<value: Number>} progression Object containing the progression of the generation
 * @param {Boolean} ref True if the objects must be reference objects
 * @returns {SpinalContext} The geographic context
 */
async function generateGeoContext( context, layout, props, progression, ref ) {
  progression.value = PROGRESS_BAR_SIZE_GET_PROPS;
  
  const tmpTree = layout.types.length > 0 ? createTmpTree( props ) : props;
  const incrProg = PROGRESS_BAR_SIZE_CREATE_GRAPH * MAX_NON_SYNCHRONIZED_NODES / props.length;
  let promises = [];
  
  progression.value += PROGRESS_BAR_SIZE_CREATE_TREE;
  
  for await (let promise of generateGeoContextRec( context, context, tmpTree, layout, 0, ref )) {
    promises.push( promise );
    
    if (promises.length === MAX_NON_SYNCHRONIZED_NODES) {
      progression.value += incrProg;
      // eslint-disable-next-line no-await-in-loop
      await waitForFileSystem( promises );
      promises = [];
    }
  }
  
  if (promises.length !== 0) {
    await waitForFileSystem( promises );
  }
  
  progression.value = 100;
}

export default generateGeoContext;
