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
      <md-dialog-title>Configuration</md-dialog-title>

      <md-dialog-content>
        <md-field>
          <label>Name of the context</label>
          <md-input v-model="contextName" />
        </md-field>

        <level-list :constants="constants"
                    :levels="levels"
                    :show-warnings="showWarnings" />

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
import levelList from "./levelList.vue";
import createGeoContext from "../js/createGeographicContext";

export default {
  name: "dialogCreateGeographicContext",
  props: ["onFinised"],
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
    opened(option) {
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
    removed(option) {
      this.showDialog = false;
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
        relations.push(this.constants.EQUIPMENT_RELATION);

        this.showLoad = true;
        await createGeoContext(this.contextName, layout, relations);
        this.showLoad = false;
      }
      if (typeof this.onFinised === "function") this.onFinised("hello");
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
.md-dialog-title {
  text-align: center;
}

#dialog-create-geographic-context {
  min-width: 600px;
  width: 60vw;
}

#md-progress-spinner-div {
  width: 100%;
  text-align: center;
}
</style>
