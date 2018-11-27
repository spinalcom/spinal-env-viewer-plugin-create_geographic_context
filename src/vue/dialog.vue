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
  <div id="panel-generate-geographic-context">
    <md-field>
      <label>Name of the context</label>
      <md-input v-model="contextName" />
    </md-field>

    <level-list :constants="constants"
                :levels="levels"
                :show-warnings="showWarnings" />

    <md-button class="md-primary"
               @click="generateContext">Start</md-button>

    <div v-if="showLoad"
         id="md-progress-spinner-div">
      <md-progress-spinner md-mode="indeterminate" />
    </div>

    <md-dialog-alert :md-active.sync="alertInvalidKeys"
                     md-content="Some fields are not filled"
                     md-confirm-text="OK" />
  </div>
</template>

<script>
import levelList from "./levelList.vue";
import createGeoContext from "../js/createGeographicContext";

export default {
  name: "dialogCreateGeographicContext",
  components: {
    levelList
  },
  data() {
    return {
      showDialog: true,
      contextName: "",
      levels: [],
      showWarnings: false,
      showLoad: false,
      alertInvalidKeys: false
    };
  },
  methods: {
    opened() {
      this.contextName = this.constants.DEFAULT_CONTEXT_NAME;

      this.levels = [];
      for (let defaultLevel of this.constants.DEFAULT_LEVELS) {
        this.levels.push({
          type: defaultLevel.type,
          key: defaultLevel.key
        });
      }

      this.showWarnings = false;
      this.showLoad = false;
      this.alertInvalidKeys = false;
    },
    removed() {},
    closed() {},
    async generateContext() {
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
      relations.push(this.constants.EQUIPMENT_RELATION);

      this.showLoad = true;
      await createGeoContext(this.contextName, layout, relations);
      this.showLoad = false;
    }
  },
  created() {
    this.constants = require("../js/constants");
  }
};
</script>

<style>
.md-menu-content {
  z-index: 110;
}
</style>

<style scoped>
#panel-generate-geographic-context {
  margin-left: 20px;
  margin-top: 20px;
  min-width: 600px;
  width: 60vw;
}

#md-progress-spinner-div {
  width: 100%;
  text-align: center;
}
</style>
