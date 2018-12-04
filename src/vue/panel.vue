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
    <h3 v-if="context !== null"
        id="context-name">
      {{this.context.getName().get()}}
    </h3>

    <md-steppers id="panel-generate-geographic-context"
                 :md-active-step.sync="activeStep"
                 @md-changed="(id) => {if (id === 'layout') layoutError = null}">
      <md-step v-if="configGen !== null"
               class="step"
               id="ref"
               md-label="Choose referential">
        <referential-selection :config="config" />
      </md-step>

      <md-step class="step"
               id="layout"
               md-label="Create layout"
               :md-error="layoutError">
        <level-list :constants="constants"
                    :levels="config.levels"
                    :show-warnings="layoutError !== null" />
      </md-step>

      <md-step class="step"
               id="launch"
               md-label="Launch the generation">
        <div id="launch-step">
          <md-button v-if="!showLoad"
                     class="md-raised md-primary"
                     @click="generateContext">Start</md-button>

          <md-progress-bar v-else
                           id="progress-bar"
                           :md-value="progression.value" />
        </div>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
import referentialSelection from "./referentialSelection.vue";
import levelList from "./levelList.vue";

import * as constants from "../js_build/constants";
import { getDefaultConfig, loadConfig, saveConfig } from "../js/panelConfig";
import { getAllLeafDbIds } from "../js/utilitiesDbIds";
import generateGeoContext from "../js_build/generateGeographicContext";

export default {
  name: "dialogCreateGeographicContext",
  components: {
    referentialSelection,
    levelList
  },
  data() {
    return {
      showDialog: true,
      context: null,
      config: getDefaultConfig(),
      activeStep: "",
      layoutError: null,
      showLoad: false,
      progression: null
    };
  },
  watch: {
    async context(newValue, oldValue) {
      if (oldValue) {
        await saveConfig(oldValue, this.config);
      }

      this.config = await loadConfig(this.context);
    }
  },
  methods: {
    opened(option) {
      this.context = option.context;

      this.activeStep = "ref";
      this.levels = [];
      this.layoutError = null;
      this.showLoad = false;
      this.progression = { value: 0 };
    },
    removed() {},
    closed() {
      saveConfig(this.context, this.config);
    },
    getLayout() {
      let layout = { types: [], keys: [], relations: [] };

      for (let level of this.config.levels) {
        if (level.key === "" || level.type === "") {
          this.layoutError = "Incomplete layout";
          return null;
        }

        layout.types.push(constants.MAP_TYPES.get(level.type));
        layout.keys.push(level.key);
        layout.relations.push(constants.MAP_RELATIONS.get(level.type));
      }

      layout.relations.push(constants.EQUIPMENT_RELATION);
      return layout;
    },
    async generateContext() {
      const layout = this.getLayout();

      if (layout === null) {
        return;
      }

      if (this.config.useAllDbIds) {
        this.config.referential = getAllLeafDbIds();
      }

      this.showLoad = true;
      await generateGeoContext(
        this.context,
        layout,
        this.config.referential,
        this.progression
      );
      this.showLoad = false;
      this.progression.value = 0;
    }
  },
  created() {
    this.constants = constants;
  }
};
</script>

<style>
.md-menu-content {
  z-index: 110;
}
</style>

<style scoped>
#context-name {
  text-align: center;
}

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

#progress-bar {
  height: 20px;
}
</style>
