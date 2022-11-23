<template>
  <select :value="value" @change="handleChange">
    <option value="square">矩形</option>
    <option value="point">点</option>
    <option value="hex">六边形</option>
    <option value="triangle">三角形</option>
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
