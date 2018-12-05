<template>
  <div id="launch-step">
    <md-button v-if="!showLoad"
               class="md-raised md-primary"
               @click="generateContext">Start</md-button>

    <md-progress-bar v-else
                     id="progress-bar"
                     :md-value="progression.value" />
  </div>
</template>

<script>
import * as constants from "../js/constants";
import { getAllLeafDbIds } from "../js/utilitiesDbIds";
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
    return {
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

