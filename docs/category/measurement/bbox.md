# 计算边界(bbox)

> Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
>
> 获取一组`feature`，计算所有`feature`的`bbox`，并返回一个边界框。

**参数**

| 参数    | 类型    | 描述               |
| :------ | :------ | :----------------- |
| geojson | GeoJSON | any GeoJSON object |

**返回**

BBox - bbox extent in minX, minY, maxX, maxY order

**示例**

```js
var line = turf.lineString([
  [104.99467, 30.071677],
  [107.13797, 36.550462],
  [112.607082, 34.991467],
]);
var bbox = turf.bbox(line);
var bboxPolygon = turf.bboxPolygon(bbox);
```

```
npm install @turf/bbox
```

**基础用法**
::: demo

```vue
<template>
  <base-map>
    {{ extent }}
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="coordinates2"></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature v-if="extent">
          <vue2ol-geom-polygon
            :coordinates="[
              [
                [extent[0], extent[3]],
                [extent[2], extent[3]],
                [extent[2], extent[1]],
                [extent[0], extent[1]],
              ],
            ]"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      coordinates2: [120.32465457916261, 28.229897499084473],
      extent: null,
    };
  },
  mounted() {
    let value = turf.bbox(
      turf.lineString(this.coordinates),
      turf.point(this.coordinates2)
    );
    this.extent = value;
  },
};
</script>
```

:::

**动态绘制**
::: demo

```vue
<template>
  <base-map>
    {{ extent
    }}<select v-model="type">
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="extent">
          <vue2ol-geom-polygon
            :coordinates="[
              [
                [extent[0], extent[3]],
                [extent[2], extent[3]],
                [extent[2], extent[1]],
                [extent[0], extent[1]],
              ],
            ]"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      extent: null,
      geometry: null,
      type: "LineString",
    };
  },
  watch: {
    geometry() {
      this.init();
    },
  },
  mounted() {},
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      let value = turf.bbox(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry))
      );
      this.extent = value;
    },
  },
};
</script>
```

:::
