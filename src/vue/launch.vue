<template>
  <div id="launch-step">
    <div v-if="!showLoad">
      <md-button class="md-raised md-primary"
                 @click="loadProps">
        VERIFY OBJECTS
      </md-button>

      <div v-if="showProps">
        <md-button @click="selectValid">
          {{valid.length}} VALID OBJECTS
        </md-button><br />

        <md-button @click="selectInvalid">
          {{invalid.length}} INVALID OBJECTS
        </md-button><br />
      </div>

      <md-button v-if="layout !== null && layout.types.length !== 0 && valid.length !== 0"
                 class="md-raised md-primary"
                 @click="generateContext">
        LAUNCH CONTEXT GENERATION
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
      showProps: false,
      showLoad: false,
      progression: { value: 0 }
    };
  },
  watch: {
    update() {
      if (this.update === "changeContext") {
        this.showProps = false;
        this.showLoad = false;
        this.progression = { value: 0 };
      }
    }
  },
  methods: {
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
    async getProps() {
      this.layout = this.getLayout();

      if (this.layout === null) {
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
    },
    async loadProps() {
      await this.getProps();
      this.showProps = true;
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
          this.progression
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
