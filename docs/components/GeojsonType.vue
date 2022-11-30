<template>
  <select :value="value" @change="handleChange">
    <option v-for="(item, index) in types" :value="item">{{ item }}</option>
  </select>
</template>
<script>
export default {
  data() {
    return {
      types: [
        "Position",
        "Point",
        "MultiPoint",
        "Feature<Point>",
        "Feature<MultiPoint>",
        "LineString",
        "MultiLineString",
        "Feature<LineString>",
        "Feature<MultiLineString>",
        "Polygon",
        "MultiPolygon",
        "Feature<Polygon>",
        "Feature<MultiPolygon>",
        "GeometryCollection",
        "Feature<GeometryCollection>",
        "FeatureCollection",
      ],
    };
  },
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit("update:value", e.target.value);
      this.$emit("change", e.target.value);
    },
  },
};
</script>
