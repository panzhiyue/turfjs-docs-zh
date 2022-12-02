<template>
  <div>
    <select :value="type" @change="handleChange">
      <option value=""></option>
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
    <vue2ol-layer-vector @ready="handleReadyLayer">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          v-if="type"
          @drawend="handleDrawEnd"
          :active="true"
          :type="type"
        >
        </vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layer: null,
    };
  },
  props: {
    clear: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleReadyLayer(mapObject) {
      this.layer = mapObject;
    },
    handleDrawEnd(e) {
      if (this.clear) {
        this.layer.getSource().clear();
      }
      this.$emit("draw-end", e.feature);
    },
    handleChange(e) {
      this.$emit("update:type", e.target.value);
    },
  },
};
</script>
