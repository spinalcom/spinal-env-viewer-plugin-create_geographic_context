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
  <div v-if="context !== null && config !== null">
    <h3 id="context-name">
      {{this.context.name.get()}}
    </h3>

    <md-steppers id="steppers"
                 md-vertical
                 :md-active-step.sync="activeStep">
      <md-step id="ref"
               md-label="Choose referential">
        <referential-selection :update="update"
                               :config="config"
                               @configChanged="configChanged" />
      </md-step>

      <md-step id="layout"
               md-label="Create layout"
               :md-error="layoutError">
        <layout :levels="config.levels"
                :show-warnings="layoutError !== null"
                @levelChanged="configChanged" />
      </md-step>

      <md-step id="launch"
               md-label="Launch the generation">
        <launch :update="update"
                :context="context"
                :config="config"
                @layoutError="e => layoutError = e" />
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
import referentialSelection from "./referentialSelection.vue";
import layout from "./layout.vue";
import launch from "./launch.vue";

import { loadConfig, saveConfig } from "../js/panelConfig";

export default {
  name: "dialogCreateGeographicContext",
  components: {
    referentialSelection,
    layout,
    launch
  },
  data() {
    return {
      showDialog: true,
      update: "",
      context: null,
      config: null,
      activeStep: "",
      layoutError: null
    };
  },
  watch: {
    layoutError(newValue, oldValue) {
      if (oldValue === "layout") {
        this.layoutError = null;
      }
    }
  },
  methods: {
    async opened(option) {
      // Using Strings (object, wrapper for strings) because otherwise the
      // watchers won't trigger if the update is the same twice in a row
      this.update = new String("opened");
      this.context = option.context;
      this.config = await loadConfig(this.context);
      this.activeStep = "ref";
      this.layoutError = null;
    },
    removed() {},
    closed() {
      this.update = new String("closed");
    },
    async configChanged() {
      this.update = new String("configChanged");
      await saveConfig(this.context, this.config);
    }
  }
};
</script>

<style>
div#steppers {
  background-color: unset;
}

#steppers * {
  box-sizing: border-box;
}
</style>

<style scoped>
#context-name {
  text-align: center;
}
</style>
