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
    <md-checkbox v-model="useAllDbIds"
                 class="md-primary">
      Use whole digitital twin
    </md-checkbox>

    <div v-show="!useAllDbIds">
      <md-button @click="addSelection">
        <md-icon>add</md-icon>
      </md-button>

      <md-button @click="clearReferencial">
        <md-icon>clear</md-icon>
      </md-button>

      <p>{{referencial.length}} objects selected</p>
    </div>
  </div>
</template>

<script>
import getAllDbIds from "../js/getAllDbIds";

export default {
  name: "referentialSelection",
  props: {
    referencial: {
      type: Array,
      required: true
    }
  },
  data() {
    this.viewer;
    this.allDbIds;
    return {
      useAllDbIds: true,
      allDbIds: []
    };
  },
  watch: {
    useAllDbIds() {
      this.referencial.splice(0, this.referencial.length);

      if (this.useAllDbIds) {
        this.referencial.push(...this.allDbIds);
      }
    }
  },
  methods: {
    addSelection() {
      const model = this.viewer.model;
      const tree = model.getData().instanceTree;
      const selection = this.viewer.getSelection();
      let queue = [...selection];

      while (queue.length) {
        let id = queue.shift();

        if (!this.referencial.includes(id)) {
          this.referencial.push(id);
        }
        tree.enumNodeChildren(id, childId => {
          queue.push(childId);
        });
      }
    },
    clearReferencial() {
      this.referencial.splice(0, this.referencial.length);
    }
  },
  created() {
    this.viewer = window.spinal.ForgeViewer.viewer;
    this.allDbIds = getAllDbIds();
    this.referencial.push(...this.allDbIds);
  }
};
</script>
