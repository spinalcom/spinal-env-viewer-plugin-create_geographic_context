const DEFAULT_CONTEXT_NAME = "geography";

const BUILDING_TYPE = "Building";
const FLOOR_TYPE = "Floor";
const ROOM_TYPE = "Room";
const ZONE_TYPE = "Zone";
const GEOGRAPHIC_TYPES = Object.freeze([BUILDING_TYPE, FLOOR_TYPE, ROOM_TYPE]);

const EQUIPMENT_RELATION = "hasEquipment";

const DEFAULT_LEVELS = Object.freeze([
  Object.freeze({ type: BUILDING_TYPE, key: BUILDING_TYPE }),
  Object.freeze({ type: FLOOR_TYPE, key: FLOOR_TYPE }),
  Object.freeze({ type: ZONE_TYPE, key: ZONE_TYPE }),
  Object.freeze({ type: ROOM_TYPE, key: ROOM_TYPE }),
]);

export {
  DEFAULT_CONTEXT_NAME,
  BUILDING_TYPE,
  FLOOR_TYPE,
  ROOM_TYPE,
  ZONE_TYPE,
  GEOGRAPHIC_TYPES,
  EQUIPMENT_RELATION,
  DEFAULT_LEVELS
};
