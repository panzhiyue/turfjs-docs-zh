<template>
  <a-textarea
    v-model="text"
    style="minHeight:100px;maHeight:200px;overflow:auto"
  ></a-textarea>
</template>
<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  props: {
    value: {},
  },
  watch: {
    text() {
      this.$emit("update:value", JSON.parse(this.text));
    },
    value() {
      this.text = JSON.stringify(this.value);
    },
  },
  mounted() {
    console.log(this.value);
    this.text = JSON.stringify(this.value);
  },
};
</script>
