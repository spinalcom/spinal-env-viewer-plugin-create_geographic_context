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

import ContextGeographicService from "spinal-env-viewer-context-geographic-service";

const geoConstants = ContextGeographicService.constants;

const {
  EQUIPMENT_RELATION
} = geoConstants;

const BUILDING_TYPE = "Building";
const FLOOR_TYPE = "Floor";
const ZONE_TYPE = "Zone";
const ROOM_TYPE = "Room";

const GEOGRAPHIC_TYPES = Object.freeze([
  BUILDING_TYPE,
  FLOOR_TYPE,
  ROOM_TYPE
]);

const MAP_TYPES = Object.freeze(new Map([
  [BUILDING_TYPE, geoConstants.BUILDING_TYPE],
  [FLOOR_TYPE, geoConstants.FLOOR_TYPE],
  [ZONE_TYPE, geoConstants.ZONE_TYPE],
  [ROOM_TYPE, geoConstants.ROOM_TYPE],
]));

const MAP_RELATIONS = Object.freeze(new Map([
  [BUILDING_TYPE, geoConstants.BUILDING_RELATION],
  [FLOOR_TYPE, geoConstants.FLOOR_RELATION],
  [ZONE_TYPE, geoConstants.ZONE_RELATION],
  [ROOM_TYPE, geoConstants.ROOM_RELATION],
]));

const DEFAULT_LEVELS = Object.freeze([
  Object.freeze({
    type: BUILDING_TYPE,
    key: BUILDING_TYPE
  }),
  Object.freeze({
    type: FLOOR_TYPE,
    key: FLOOR_TYPE
  }),
  Object.freeze({
    type: ZONE_TYPE,
    key: ZONE_TYPE
  }),
  Object.freeze({
    type: ROOM_TYPE,
    key: ROOM_TYPE
  })
]);

export {
  EQUIPMENT_RELATION,
  BUILDING_TYPE,
  FLOOR_TYPE,
  ZONE_TYPE,
  ROOM_TYPE,
  GEOGRAPHIC_TYPES,
  MAP_TYPES,
  MAP_RELATIONS,
  DEFAULT_LEVELS
};
