<template>
  <div>
    <a-space
      ><geojson-type :value="type" @change="handleChangeType"></geojson-type
    ></a-space>
    <a-textarea v-model="text" @change="handleChangeText" :autosize="{
      minRows:4,
      maxRows:10
    }" ></a-textarea>
  </div>
</template>
<script>
import { getTestTurf } from "../utils/index.js";
export default {
  data() {
    return {
      text: "",
    };
  },
  props: {
    type: String,
  },
  mounted() {
    this.init();
  },
  watch: {
    text() {
      this.$emit("change", JSON.parse(this.text));
    },
  },
  methods: {
    handleChangeText(e) {
      this.text = e.target.value;
    },
    handleChangeType(val) {
      this.$emit("update:type", val);
      this.text = JSON.stringify(getTestTurf(val));
    },
    init() {
      this.text = JSON.stringify(getTestTurf(this.type));
    },
  },
};
</script>
