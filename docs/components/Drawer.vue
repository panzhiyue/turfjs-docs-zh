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
    <slot></slot>
  </a-drawer>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style>
.ant-drawer-body {
  padding: 0px;
}

.ant-row{
  margin-top:4px;

}
</style>
