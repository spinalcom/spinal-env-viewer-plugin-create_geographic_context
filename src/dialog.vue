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
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)"
               id="dialog-create-geographic-context">
      <md-dialog-title>Create keys</md-dialog-title>

      <md-dialog-content>
        <div id="div-v-for-levels"
             v-for="(level, index) in levels"
             :key="index">
          <md-icon v-show="showWarnings && level.type === ''"
                   class="md-accent">warning</md-icon>

          <md-field>
            <label>Level</label>
            <md-select v-model="level.type">
              <md-option v-for="(type, indexType) in getAvailableTypes(index)"
                         :key="indexType"
                         :value="type">
                {{type}}
              </md-option>
            </md-select>
          </md-field>

          <md-icon v-show="showWarnings && level.key === ''"
                   class="md-accent">warning</md-icon>

          <md-field>
            <label>Key</label>
            <md-input v-model="level.key" />
          </md-field>

          <md-button @click="removeLevel(index)">
            <md-icon>remove</md-icon>
          </md-button>
        </div>
        <md-button @click="addLevel">
          <md-icon>add</md-icon>
        </md-button>

        <div v-if="showLoad"
             id="md-progress-spinner-div">
          <md-progress-spinner md-mode="indeterminate" />
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog(false)">Cancel</md-button>
        <md-button class="md-primary"
                   @click="closeDialog(true)">Start</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog-alert :md-active.sync="alertInvalidKeys"
                     md-content="Some fields are not filled"
                     md-confirm-text="OK" />
  </div>
</template>

<script>
import createGeoContext from "./createGeographicContext";

export default {
  name: "dialogCreateGeographicContext",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      showLoad: false,
      showWarnings: false,
      levels: [],
      alertInvalidKeys: false
    };
  },
  methods: {
    opened(option) {
      this.showLoad = false;
      this.showWarnings = false;
      this.levels = [];
      this.alertInvalidKeys = false;
    },
    removed(option) {
      this.showDialog = false;
    },
    addLevel() {
      this.levels.push({ type: "", key: "" });
    },
    removeLevel(index) {
      this.levels.splice(index, 1);
    },
    getMinTypeIndex(indexLevel) {
      let i = indexLevel;

      do {
        i--;
      } while (i >= 0 && this.levels[i].type === this.ZONE_TYPE);

      if (i < 0) {
        return 0;
      } else {
        const minType = this.levels[i].type;
        const minTypeIndex = this.GEOGRAPHIC_TYPES.indexOf(minType) + 1;

        return minTypeIndex;
      }
    },
    getMaxTypeIndex(indexLevel) {
      let i = indexLevel;

      do {
        i++;
      } while (
        i < this.levels.length &&
        this.levels[i].type === this.ZONE_TYPE
      );

      if (i === this.levels.length) {
        return this.GEOGRAPHIC_TYPES.length;
      } else {
        const maxType = this.levels[i].type;
        const maxTypeIndex = this.GEOGRAPHIC_TYPES.indexOf(maxType);

        return maxTypeIndex;
      }
    },
    getAvailableTypes(index) {
      const minTypeIndex = this.getMinTypeIndex(index);
      const maxTypeIndex = this.getMaxTypeIndex(index);
      const available = [];

      for (let i = minTypeIndex; i < maxTypeIndex; i++)
        available.push(this.GEOGRAPHIC_TYPES[i]);
      return available.concat(this.ZONE_TYPE);
    },
    async closeDialog(closeResult) {
      if (closeResult) {
        let layout = [];
        let relations = [];

        this.highlightKeys = false;
        for (let level of this.levels) {
          if (level.key === "" || level.type === "") {
            this.alertInvalidKeys = true;
            this.showWarnings = true;
            return;
          }
          layout.push(level.key);
          relations.push("has" + level.type);
        }
        relations.push(this.EQUIPMENT_RELATION);

        this.showLoad = true;
        await createGeoContext(layout, relations);
        this.showLoad = false;
      }
      if (typeof this.onFinised === "function") this.onFinised("hello");
    }
  },
  created() {
    this.GEOGRAPHIC_TYPES = ["Building", "Floor", "Room"];
    this.ZONE_TYPE = "Zone";
    this.EQUIPMENT_RELATION = "hasEquipment";

    Object.freeze(this.GEOGRAPHIC_TYPES);
    Object.freeze(this.ZONE_TYPE);
    Object.freeze(this.EQUIPMENT_RELATION);
  }
};
</script>

<style>
.md-menu-content {
  z-index: 110;
}
</style>


<style lang="scss" scoped>
#dialog-create-geographic-context {
  min-width: 600px;
  width: 60vw;
}

#div-v-for-levels {
  display: flex;
}

#div-v-for-levels * {
  margin-right: 20px;
}

#md-progress-spinner-div {
  width: 100%;
  text-align: center;
}
</style>
