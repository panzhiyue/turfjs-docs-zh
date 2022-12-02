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
      <a-tab-pane key="2" tab="代码" v-if="code">
        <prism language="javascript" :code="code"></prism>
      </a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>
<script>
import Prism from "vue-prismjs";
export default {
  components: {
    Prism,
  },
  data() {
    return {};
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
  mounted() {},
};
</script>
<style>
.ant-drawer{
  z-index:10;
}
.ant-drawer-body {
  padding: 5px;

}

.ant-row {
  margin-top: 4px;
}
</style>
