<!--
Copyright 2018 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <div>
    <level v-for="(level, index) in levels"
           :key="index"
           :level="level"
           :available-types="getAvailableTypes(index)"
           :show-warning="showWarnings"
           @levelChanged="() => $emit('levelChanged')"
           @removeLevel="removeLevel(index)" />

    <md-button @click="addLevel(constants.LEVEL_OPTION_BY_KEY)"
               class="md-raised button-add-level">
      NORMAL
    </md-button>

    <md-button @click="addLevel(constants.LEVEL_OPTION_FIXED)"
               class="md-raised button-add-level">
      FIXED
    </md-button>
  </div>
</template>

<script>
import * as constants from "../js/constants";

import level from "./level.vue";

export default {
  name: "layout",
  props: {
    levels: {
      type: Array,
      required: true
    },
    showWarnings: {
      type: Boolean,
      required: true
    }
  },
  components: {
    level
  },
  data() {
    this.constants = constants;
    return {};
  },
  methods: {
    /**
     * Adds an empty level with the given option to the layout.
     * @param {string} option Option of the level
     */
    addLevel(option) {
      this.levels.push({ type: "", param: "", option: option });
      this.$emit("levelChanged");
    },
    /**
     * Removes a level from the layout.
     * @param {number} index Index of the level in the layout
     */
    removeLevel(index) {
      this.levels.splice(index, 1);
      this.$emit("levelChanged");
    },
    /**
     * Determines the index of the lowest type a level can be.
     * @param {number} index The index of the level
     * @returns {number} The index of the minimum type
     */
    getMinTypeIndex(indexLevel) {
      let i = indexLevel;

      do {
        i--;
      } while (
        i >= 0 &&
        !constants.GEOGRAPHIC_TYPES.includes(this.levels[i].type)
      );

      if (i < 0) {
        return 0;
      } else {
        const minType = this.levels[i].type;
        const minTypeIndex = constants.GEOGRAPHIC_TYPES.indexOf(minType) + 1;

        return minTypeIndex;
      }
    },
    /**
     * Determines the index of the highest type a level can be.
     * @param {number} index The index of the level
     * @returns {number} The index of the maximum type
     */
    getMaxTypeIndex(indexLevel) {
      let i = indexLevel;

      do {
        i++;
      } while (
        i < this.levels.length &&
        !constants.GEOGRAPHIC_TYPES.includes(this.levels[i].type)
      );

      if (i === this.levels.length) {
        return constants.GEOGRAPHIC_TYPES.length;
      } else {
        const maxType = this.levels[i].type;
        const maxTypeIndex = constants.GEOGRAPHIC_TYPES.indexOf(maxType);

        return maxTypeIndex;
      }
    },
    /**
     * Determines all the types a level can be given its position in the layout.
     * @param {number} index The index of the level
     * @returns {Array<string>} An array of the available types for the level
     */
    getAvailableTypes(index) {
      const minTypeIndex = this.getMinTypeIndex(index);
      const maxTypeIndex = this.getMaxTypeIndex(index);
      const available = [];

      for (let i = minTypeIndex; i < maxTypeIndex; i++) {
        available.push(constants.GEOGRAPHIC_TYPES[i]);
      }

      return available.concat(constants.ZONE_TYPE);
    }
  }
};
</script>

<style scoped>
.button-add-level {
  width: 45%;
}
</style>
