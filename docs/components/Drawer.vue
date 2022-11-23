<template>
  <a-drawer
    placement="left"
    :closable="true"
    :visible="visible"
    :get-container="false"
    :wrap-style="{ position: 'absolute' }"
    :width="500"
    @close="onClose"
  >
    <!-- <slot></slot> -->
    <a-tabs type="card">
      <a-tab-pane key="1" tab="参数设置"> <slot></slot></a-tab-pane>
      <a-tab-pane key="2" tab="代码">
        <pre>
        <code v-html="hljs.highlightAuto(code).value"></code>
      </pre>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>
<script>
import hljs from "highlight.js";
export default {
  data() {
    return {
      codeOptions: {
        mode: "text/javascript",
      },
      hljs,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
    },
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
  },
  mounted() {
    console.log(hljs.highlightAuto(this.code).value);
  },
};
</script>
<style>
.ant-drawer-body {
  padding: 0px;
}

.ant-row {
  margin-top: 4px;
}
</style>
