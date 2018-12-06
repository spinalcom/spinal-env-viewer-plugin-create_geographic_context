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

import bimObjectService from "spinal-env-viewer-plugin-bimobjectservice";
import {
  serviceDocumentation
} from "spinal-env-viewer-plugin-documentation-service";

function promiseGetPorperties(model, dbId) {
  return new Promise(resolve => {
    model.getProperties(dbId, resolve);
  });
}

function getProperties(dbIds) {
  const model = window.spinal.ForgeViewer.viewer.model;
  const props = [];

  for (let dbId of dbIds) {
    props.push(promiseGetPorperties(model, dbId));
  }
  return Promise.all(props);
}

function createSimplifiedProperty(prop, keys) {
  const simpleProp = {};

  simpleProp.properties = [];
  for (let [index, key] of keys.entries()) {
    for (let property of prop.properties) {
      if (property.displayName === key) {
        simpleProp.properties.push({
          key: key,
          value: property.displayValue.toString()
        });
        break;
      }
    }

    if (typeof simpleProp.properties[index] === "undefined" ||
      simpleProp.properties[index].value === "") {
      return null;
    }
  }
  simpleProp.dbId = prop.dbId;
  simpleProp.name = prop.name;
  return simpleProp;
}

async function addBIMObjectProps(props) {
  let BIMObjects = [];
  const validProps = props.slice();

  for (let prop of props) {
    BIMObjects.push(
      bimObjectService.getBIMObject(prop.dbId)
    );
  }

  BIMObjects = await Promise.all(BIMObjects);

  let i = 0;
  while (i < BIMObjects.length) {
    if (typeof BIMObjects[i] === "undefined") {
      BIMObjects.splice(i, 1);
      validProps.splice(i, 1);
    } else {
      i++;
    }
  }

  let attributes = [];

  for (let i = 0; i < BIMObjects.length; i++) {
    attributes.push(serviceDocumentation.getAttributes(BIMObjects[i]));
  }

  attributes = await Promise.all(attributes);

  for (let i = 0; i < attributes.length; i++) {
    let prop = validProps[i];

    for (let attr of attributes[i]) {
      let convert = {
        displayName: attr.label.get(),
        displayValue: attr.value.get()
      };

      prop.properties.push(convert);
    }
  }
}

async function hasProperties(dbIds, keys) {
  const props = await getProperties(dbIds);
  const valid = [];
  const invalid = [];

  await addBIMObjectProps(props);

  for (let i = 0; i < props.length; i++) {
    let simplified = createSimplifiedProperty(props[i], keys);

    if (simplified === null) {
      invalid.push(dbIds[i]);
    } else {
      valid.push(simplified);
    }
  }

  return {
    valid,
    invalid
  };
}

export default hasProperties;
