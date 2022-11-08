<template>
  <select :value="value" @change="handleChange">
    <option value="degrees">度</option>
    <option value="radians">弧度</option>
    <option value="miles">英里</option>
    <option value="kilometers">千米</option>
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
