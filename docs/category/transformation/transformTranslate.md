# 平移(transformTranslate)

> Moves any geojson Feature or Geometry of a specified distance along a Rhumb Line on the provided direction angle.
>
> 在给定的方向角上沿沿恒向线移动指定距离的任何 geojson`Feature`或几何图形。

**参数**

| 参数      | 类型    | 描述                                                                         |
| :-------- | :------ | :--------------------------------------------------------------------------- |
| geojson   | GeoJSON | object to be translated                                                      |
| distance  | number  | length of the motion; negative values determine motion in opposite direction |
| direction | number  | of the motion; angle from North in decimal degrees, positive clockwise       |
| options   | Object  | Optional parameters: see below                                               |

**options 选项**

| 属性         | 类型    | 默认值     | 描述                                                                          |
| :----------- | :------ | :--------- | :---------------------------------------------------------------------------- |
| units        | string  | kilometers | in which                                                                      |
| zTranslation | number  | 0          | length of the vertical motion, same unit of distance                          |
| mutate       | boolean | false      | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - the translated GeoJSON object

**示例**

```js
var poly = turf.polygon([
  [
    [0, 29],
    [3.5, 29],
    [2.5, 32],
    [0, 29],
  ],
]);
var translatedPoly = turf.transformTranslate(poly, 100, 35);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformTranslate.8a54e043.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>

        <vue2ol-feature :style-obj="style">
          <vue2ol-geom-linestring
            :coordinates="translateCoordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      translateCoordinates: null,
      style: null,
    };
  },
  mounted() {
    this.translateCoordinates = turf.transformTranslate(
      turf.lineString(this.coordinates),
      10,
      35
    ).geometry.coordinates;

    this.style = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
      }),
    });
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
    <select v-model="type">
      <option value=""></option>
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
    distance：<input type="number" v-model="distance" /> direction<input
      type="number"
      v-model="direction"
    />
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          v-if="type != ''"
          :active="true"
          :type="type"
          @drawend="handleDrawEnd1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector v-if="translateGeometry">
        <vue2ol-feature :style-obj="style" :geometry="translateGeometry">
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      feature1: null,
      type: "LineString",
      translateGeometry: null,
      style: null,
      distance: 10,
      direction: 35,
    };
  },
  watch: {
    feature1() {
      this.init();
    },
    distance() {
      this.init();
    },
    direction() {
      this.init();
    },
  },
  mounted() {
    this.style = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
      }),
    });
  },
  methods: {
    handleDrawEnd1(e) {
      this.feature1 = e.feature;
    },
    init() {
      if (!this.feature1) {
        return;
      }
      let f = turf.transformTranslate(
        JSON.parse(new GeoJSON().writeFeature(this.feature1)),
        parseFloat(this.distance),
        parseFloat(this.direction)
      );
      this.translateGeometry = new GeoJSON().readGeometry(
        JSON.stringify(f.geometry)
      );
    },
  },
};
</script>
```

:::
