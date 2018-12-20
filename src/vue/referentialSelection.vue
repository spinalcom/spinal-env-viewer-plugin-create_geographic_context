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
    <md-checkbox v-model="config.useAllDbIds"
                 @change="changeMode"
                 class="md-primary">
      Use whole digital twin
    </md-checkbox>

    <div v-show="!config.useAllDbIds">
      <md-button @click="addSelection">
        <md-icon>add</md-icon>
        <md-tooltip md-delay="300">Add selection to referential</md-tooltip>
      </md-button>

      <md-button @click="clearReferential">
        <md-icon>clear</md-icon>
        <md-tooltip md-delay="300">Clear referential</md-tooltip>
      </md-button>

      <md-button @click="showReferential">
        <md-icon>visibility</md-icon>
        <md-tooltip md-delay="300">Show referential</md-tooltip>
      </md-button>

      <p>{{config.referential.length}} objects selected</p>
    </div>
  </div>
</template>

<script>
import { getAllLeafDbIds, getLeafDbIds } from "../js/utilitiesDbIds";

export default {
  name: "referentialSelection",
  props: {
    update: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    this.viewer = window.spinal.ForgeViewer.viewer;
    this.allDbIds = getAllLeafDbIds();
    return {};
  },
  watch: {
    update: {
      immediate: true,
      handler() {
        if (this.update != "opened") {
          return;
        }

        if (this.config.useAllDbIds) {
          this.config.referential = this.allDbIds.slice();
        }
      }
    }
  },
  methods: {
    /**
     * Updates the referential when the mode changes.
     */
    changeMode(newValue) {
      if (!newValue) {
        this.clearReferential();
      } else {
        this.config.referential = this.allDbIds.slice();
      }

      this.$emit("configChanged");
    },
    /**
     * Adds the current selection to the referential. Discards all non-leaf dbIds.
     */
    addSelection() {
      const selection = this.viewer.getSelection();

      for (let select of selection) {
        let leafs = getLeafDbIds(select);

        this.config.referential.push(...leafs);
      }

      this.config.referential = [...new Set(this.config.referential)];
      this.$emit("configChanged");
    },
    /**
     * Empties the referential.
     */
    clearReferential() {
      this.config.referential = [];
      this.$emit("configChanged");
    },
    /**
     * Selects all the dbIds in the referential.
     */
    showReferential() {
      this.viewer.select(this.config.referential);
    }
  }
};
</script>
