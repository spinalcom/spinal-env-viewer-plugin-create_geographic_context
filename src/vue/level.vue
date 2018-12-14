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
  <div id="div-level">
    <md-icon v-show="showWarning && level.type === ''"
             class="md-accent">warning</md-icon>

    <md-field id="level-field">
      <label>Level</label>

      <md-select v-model="level.type">
        <md-option v-for="(type, indexType) in availableTypes"
                   :key="indexType"
                   :value="type">
          {{type}}
        </md-option>
      </md-select>
    </md-field>

    <md-icon v-show="showWarning && level.param === ''"
             class="md-accent">warning</md-icon>

    <md-field id="param-field">
      <label v-if="level.option === constants.LEVEL_OPTION_BY_KEY">Key</label>

      <label v-else-if="level.option === constants.LEVEL_OPTION_FIXED">Fixed Value</label>

      <md-input v-model="level.param" />
    </md-field>

    <md-button class="md-icon-button"
               @click="$emit('removeLevel')">
      <md-icon>remove</md-icon>
    </md-button>
  </div>
</template>

<script>
import * as constants from "../js/constants";

export default {
  name: "level",
  props: {
    level: {
      type: Object,
      required: true
    },
    availableTypes: {
      type: Array,
      required: true
    },
    showWarning: {
      type: Boolean,
      required: true
    }
  },
  data() {
    this.constants = constants;
    return {};
  },
  watch: {
    level: {
      deep: true,
      handler() {
        this.$emit("levelChanged");
      }
    }
  }
};
</script>

<style scoped>
#div-level {
  display: flex;
}

#level-field,
#param-field {
  margin-right: 20px;
}
</style>
