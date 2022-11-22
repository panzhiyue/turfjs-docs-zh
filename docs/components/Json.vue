<template>
  <vue-json-viewer
    v-if="data"
    :value="data"
    :expand-depth="2"
    :copyable="{ copyText: '复制', copiedText: '复制成功', timeout: 2000 }"
    :boxed="true"
    :expanded="true"
    :show-array-index="false"
  />
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {},
  },
};
</script>
