<template>
  <select :value="value" @change="handleChange">
    <option value="meters">米</option>
    <option value="millimeters">毫米</option>
    <option value="centimetres">厘米</option>
    <option value="kilometers">千米</option>
    <option value="miles">英里</option>
    <option value="nauticalmiles">海里</option>
    <option value="inches">英寸</option>
    <option value="yards">码</option>
    <option value="feet">英尺</option>
    <option value="radians">弧度</option>
    <option value="degrees">度</option>
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
