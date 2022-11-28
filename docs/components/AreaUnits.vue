<template>
  <select :value="value" @change="handleChange">
    <option value="meters">平方米</option>
    <option value="millimeters">平方毫米</option>
    <option value="centimetres">平方厘米</option>
    <option value="kilometers">平方千米</option>
    <option value="acres">英亩</option>
    <option value="miles">平方英里</option>
    <option value="inches">平方英寸</option>
    <option value="yards">平方码</option>
    <option value="feet">平方英尺</option>
    <option value="hectares">公顷</option>
  </select>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit("update:value", e.target.value);
    },
  },
};
</script>
