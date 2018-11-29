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
