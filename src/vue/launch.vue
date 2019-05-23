<template>
  <div id="launch-step">
    <div v-if="!showLoad">
      <md-button class="md-raised md-primary"
                 @click="loadProps">
        VERIFY OBJECTS
      </md-button>

      <div v-if="propsLoaded">
        <md-button @click="selectValid">
          {{valid.length}} VALID OBJECTS
        </md-button><br />

        <md-button @click="selectInvalid">
          {{invalid.length}} INVALID OBJECTS
        </md-button><br />

        <md-checkbox v-model="defineRef">
          Define reference objects
        </md-checkbox>

        <md-button v-if="valid.length !== 0"
                   class="md-raised md-primary"
                   @click="generateContext">
          LAUNCH CONTEXT GENERATION
        </md-button>
      </div>
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
import ModelsManagerService from "spinal-service-models-manager"


export default {
  name: "launch",
  props: {
    update: {
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
      layout: null,
      valid: [],
      invalid: [],
      propsLoaded: false,
      defineRef: false,
      showLoad: false,
      progression: { value: 0 }
    };
  },
  watch: {
    update() {
      if (this.update == "opened") {
        this.propsLoaded = false;
        this.defineRef = false;
        this.showLoad = false;
        this.progression = { value: 0 };
      } else if (this.update == "configChanged") {
        this.propsLoaded = false;
      }
    }
  },
  methods: {
    /**
     * @typedef {Object} Layout An object containing all the informations of the layout
     * @property {Array<string>} types The types of the levels
     * @property {Array<string>} keys The keys of the levels
     * @property {Array<string>} relations The relation names associated to the types
     *
     * Creates the layout from raw input of the user in the layout step.
     * @returns {Layout} The loaded layout
     */
    getLayout() {
      let layout = { types: [], keys: [], relations: [] };

      for (let level of this.config.levels) {
        if (level.type === "" || level.param === "") {
          this.$emit("layoutError", "Incomplete layout");
          return null;
        }

        layout.types.push(constants.MAP_TYPES.get(level.type));
        layout.keys.push(level.param);
        layout.relations.push(constants.MAP_RELATIONS.get(level.type));
      }

      layout.relations.push(constants.EQUIPMENT_RELATION);
      return layout;
    },
    /**
     * Loads the valid and invalid props from the referential and the layout.
     */
    async loadProps() {
      this.propsLoaded = false;
      this.layout = this.getLayout();

      if (this.layout === null) {
        this.propsLoaded = false;
        return;
      }

      const keys = [];

      for (let level of this.config.levels) {
        if (level.option !== constants.LEVEL_OPTION_FIXED) {
          keys.push(level.param);
        }
      }

      const res = await hasProperties(this.config.referential, keys);

      this.valid = res.valid;
      this.invalid = res.invalid;
      this.propsLoaded = true;
    },
    /**
     * Selects the valid objects.
     */
    selectValid() {
      const model = ModelsManagerService._getCurrentModel();
      const dbIds = [];

      for (let prop of this.valid) {
        dbIds.push(prop.dbId);
      }

      this.viewer.select(dbIds, model);
    },
    /**
     * Selects the invalid objects.
     */
    selectInvalid() {
      const model = ModelsManagerService._getCurrentModel();

      this.viewer.select(this.invalid, model);
    },
    /**
     * Generates the geographic context from the loaded layout and objects.
     */
    async generateContext() {
      this.showLoad = true;

      try {
        for (let [index, level] of this.config.levels.entries()) {
          if (level.option !== constants.LEVEL_OPTION_FIXED) {
            continue;
          }

          for (let prop of this.valid) {
            prop.properties.splice(index, 0, { value: level.param });
          }
        }

        await generateGeoContext(
          this.context,
          this.layout,
          this.valid,
          this.progression,
          this.defineRef
        );
      } catch (e) {
        console.error(e);
      } finally {
        this.showLoad = false;
        this.progression.value = 0;
      }
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
