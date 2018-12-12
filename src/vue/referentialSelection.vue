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
      Use whole digitital twin
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
import { getAllLeafDbIds } from "../js/utilitiesDbIds";

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
    update() {
      if (this.update !== "changeContext") {
        return;
      }

      if (this.config.useAllDbIds) {
        this.config.referential = this.allDbIds.slice();
      }
    }
  },
  methods: {
    changeMode(newValue) {
      if (!newValue) {
        this.clearReferential();
      } else {
        this.config.referential = this.allDbIds.slice();
      }
    },
    addSelection() {
      const model = this.viewer.model;
      const tree = model.getData().instanceTree;
      const selection = this.viewer.getSelection();
      const queue = [...selection];

      while (queue.length) {
        let id = queue.shift();

        if (!this.config.referential.includes(id)) {
          this.config.referential.push(id);
        }

        tree.enumNodeChildren(id, childId => {
          queue.push(childId);
        });
      }
    },
    clearReferential() {
      this.config.referential = [];
    },
    showReferential() {
      this.viewer.select(this.config.referential);
    }
  }
};
</script>
