<template>
  <a-space
    >xmin:<a-input-number :value="value[0]" @change="changeXmin"></a-input-number
    >ymin:<a-input-number :value="value[1]" @change="changeYmin"></a-input-number
    >xmax:<a-input-number :value="value[2]" @change="changeXmax"></a-input-number
    >ymax:<a-input-number :value="value[3]" @change="changeYmax"></a-input-number
  ></a-space>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
    },
  },
  methods: {
    changeXmin(xmin) {
      let bbox = [].concat(this.value);
      bbox[0] = xmin;
      this.$emit("update:value", bbox);
    },
    changeYmin(ymin) {
      let bbox = [].concat(this.value);
      bbox[1] = ymin;
      this.$emit("update:value", bbox);
    },
    changeXmax(xmax) {
      let bbox = [].concat(this.value);
      bbox[2] = xmax;
      this.$emit("update:value", bbox);
    },
    changeYmax(ymax) {
      let bbox = [].concat(this.value);
      bbox[3] = ymax;
      this.$emit("update:value", bbox);
    },
  },
};
</script>
<style scoped>
.ant-input-number {
  width: 60px;
}
</style>
