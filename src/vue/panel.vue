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
  <md-steppers id="panel-generate-geographic-context"
               :md-active-step.sync="activeStep"
               @md-changed="(id) => {if (id === 'layout') layoutError = null}">
    <md-step class="step"
             id="ref"
             md-label="Choose referential">
      <referencial-selection :referencial="referencial" />
    </md-step>

    <md-step class="step"
             id="layout"
             md-label="Create layout"
             :md-error="layoutError">
      <level-list :constants="constants"
                  :levels="levels"
                  :show-warnings="layoutError !== null" />
    </md-step>

    <md-step class="step"
             id="launch"
             md-label="Launch the generation">
      <div id="launch-step">
        <md-button v-if="!showLoad"
                   class="md-raised md-primary"
                   @click="generateContext">Start</md-button>

        <md-progress-spinner v-else
                             md-mode="indeterminate" />
      </div>
    </md-step>
  </md-steppers>
</template>

<script>
import { findInContext } from "spinalgraph/build/GraphFunctionsLib/GraphTraversal";

import referencialSelection from "./referencialSelection.vue";
import levelList from "./levelList.vue";
import generateGeoContext from "../js/generateGeographicContext";

export default {
  name: "dialogCreateGeographicContext",
  components: {
    referencialSelection,
    levelList
  },
  data() {
    return {
      showDialog: true,
      context: null,
      activeStep: "",
      referencial: [],
      levels: [],
      layoutError: null,
      showLoad: false
    };
  },
  methods: {
    opened(option) {
      this.context = option.context;

      this.activeStep = "ref";

      this.levels = [];
      for (let defaultLevel of this.constants.DEFAULT_LEVELS) {
        this.levels.push({
          type: defaultLevel.type,
          key: defaultLevel.key
        });
      }

      this.layoutError = null;
      this.showLoad = false;
    },
    removed() {},
    closed() {},
    getLayout() {
      let layout = { types: [], keys: [], relations: [] };

      for (let level of this.levels) {
        if (level.key === "" || level.type === "") {
          this.layoutError = "Incomplete layout";
          return null;
        }
        layout.types.push(this.constants.MAP_TYPES.get(level.type));
        layout.keys.push(level.key);
        layout.relations.push(this.constants.MAP_RELATIONS.get(level.type));
      }
      layout.relations.push(this.constants.EQUIPMENT_RELATION);
      return layout;
    },
    async generateContext() {
      const layout = this.getLayout();

      if (layout === null) {
        return;
      }

      this.showLoad = true;
      await generateGeoContext(this.context, layout, this.referencial);

      let childrenToSynchronize = await findInContext(
        this.context,
        this.context
      );

      let inter = setInterval(() => {
        childrenToSynchronize = childrenToSynchronize.filter(node => {
          return FileSystem._objects[node._server_id] === undefined;
        });
        if (childrenToSynchronize.length === 0) {
          clearInterval(inter);
          this.showLoad = false;
        }
      }, 1000);
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
.step {
  box-sizing: border-box;
}

#panel-generate-geographic-context {
  min-width: 600px;
  width: 60vw;
}

#launch-step {
  text-align: center;
}
</style>
