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
           @removeLevel="removeLevel(index)" />

    <md-button @click="addLevel(constants.LEVEL_OPTION_BY_KEY)"
               class="button-add-level">
      NORMAL
    </md-button>

    <md-button @click="addLevel(constants.LEVEL_OPTION_FIXED)"
               class="button-add-level">
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
    this.constants;
    return {};
  },
  methods: {
    addLevel(option) {
      this.levels.push({ type: "", param: "", option: option });
    },
    removeLevel(index) {
      this.levels.splice(index, 1);
    },
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
    getAvailableTypes(index) {
      const minTypeIndex = this.getMinTypeIndex(index);
      const maxTypeIndex = this.getMaxTypeIndex(index);
      const available = [];

      for (let i = minTypeIndex; i < maxTypeIndex; i++) {
        available.push(constants.GEOGRAPHIC_TYPES[i]);
      }
      return available.concat(constants.ZONE_TYPE);
    }
  },
  created() {
    this.constants = constants;
  }
};
</script>

<style scoped>
.button-add-level {
  width: 45%;
}
</style>
