<template>
  <vue2ol-map :options="mapOptions" @singleclick="handleSingleClick">
    <vue2ol-view
      :center="center"
      :zoom="zoom"
      :options="viewOptions"
    ></vue2ol-view>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt
        layer="img"
        tk="6703c18da8b111f1ac38fdcfc4a138d8"
      ></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <vue2ol-layer-tile>
      <vue2ol-source-tdt
        layer="cia"
        tk="6703c18da8b111f1ac38fdcfc4a138d8"
      ></vue2ol-source-tdt>
    </vue2ol-layer-tile>
    <slot></slot>
  </vue2ol-map>
</template>
<script>
export default {
  name: "BaseMap",
  props: {
    zoom: {
      type: Number,
      default: 10,
    },
    center: {
      type: Array,
      default: () => [120, 28],
    },
  },
  data() {
    return {
      mapOptions: {
        controls: [],
      },
      viewOptions: {
        projection: "EPSG:4326",
      },
    };
  },
  methods: {
    handleSingleClick(e) {
      let coordinate = e.map.getEventCoordinate(e.originalEvent);
      console.log(coordinate);
    },
  },
};
</script>
<style scoped>
.vue2ol-map {
  height: 400px;
}
</style>
