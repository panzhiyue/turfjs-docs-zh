<template>
  <a-space
    >x:<a-input-number
      style="width: 120px"
      :value="value[0]"
      @change="handleChangeX"
      :disabled="disabled"
    ></a-input-number
    >y:<a-input-number
      style="width: 120px"
      :value="value[1]"
      @change="handleChangeY"
      :disabled="disabled"
    ></a-input-number
  ></a-space>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return [0, 0];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChangeX(e) {
      this.$emit("update:value", [e, this.value[1]]);
    },

    handleChangeY(e) {
      this.$emit("update:value", [this.value[0], e]);
    },
  },
};
</script>
