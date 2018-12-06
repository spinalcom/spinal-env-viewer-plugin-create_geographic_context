<template>
  <div id="launch-step">
    <div v-if="!showLoad">
      <md-button @click="selectValid">
        {{valid.length}} VALID OBJECTS
      </md-button><br />

      <md-button @click="selectInvalid">
        {{invalid.length}} INVALID OBJECTS
      </md-button><br />

      <md-button v-if="layout !== null && layout.types.length !== 0 && valid.length !== 0"
                 class="md-raised md-primary"
                 @click="generateContext">
        Start
      </md-button>
    </div>

    <md-progress-bar v-else
                     id="progress-bar"
                     :md-value="progression.value" />
  </div>
</template>

<script>
import * as constants from "../js/constants";
import hasProperties from "../js/hasProperties";
import generateGeoContext from "../js_build/generateGeographicContext";

export default {
  name: "launch",
  props: {
    update: {
      type: String,
      required: true
    },
    activeStep: {
      type: String,
      required: true
    },
    context: {
      // Allows for null value
      validator: value => typeof value === "object"
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    this.viewer = window.spinal.ForgeViewer.viewer;
    return {
      valid: [],
      invalid: [],
      layout: null,
      showLoad: false,
      progression: { value: 0 }
    };
  },
  watch: {
    update() {
      if (this.update === "changeContext") {
        this.showLoad = false;
        this.progression = { value: 0 };
      }
    },
    async activeStep() {
      if (this.activeStep !== "launch") {
        return;
      }

      this.layout = this.getLayout();

      if (this.layout === null) {
        return;
      }

      const res = await hasProperties(
        this.config.referential,
        this.layout.keys
      );

      this.valid = res.valid;
      this.invalid = res.invalid;
    }
  },
  methods: {
    getLayout() {
      let layout = { types: [], keys: [], relations: [] };

      for (let level of this.config.levels) {
        if (level.key === "" || level.type === "") {
          this.$emit("layoutError", "Incomplete layout");
          return null;
        }

        layout.types.push(constants.MAP_TYPES.get(level.type));
        layout.keys.push(level.key);
        layout.relations.push(constants.MAP_RELATIONS.get(level.type));
      }

      layout.relations.push(constants.EQUIPMENT_RELATION);
      return layout;
    },
    selectValid() {
      const dbIds = [];

      for (let prop of this.valid) {
        dbIds.push(prop.dbId);
      }

      this.viewer.select(dbIds);
    },
    selectInvalid() {
      this.viewer.select(this.invalid);
    },
    async generateContext() {
      this.showLoad = true;
      await generateGeoContext(
        this.context,
        this.layout,
        this.valid,
        this.progression
      );
      this.showLoad = false;
      this.progression.value = 0;
    }
  }
};
</script>

<style scoped>
#launch-step {
  text-align: center;
}

#progress-bar {
  height: 20px;
}
</style>

