# 旋转(transformRotate)

> Rotates any geojson Feature or Geometry of a specified angle, around its centroid or a given pivot point; all rotations follow the right-hand rule: https://en.wikipedia.org/wiki/Right-hand_rule
>
> 旋转任何 geojson`Feature`或几何学的一个指定的角度，围绕其质心或一个给定的枢轴点;所有的旋转都遵循右手规则:https://en.wikipedia.org/wiki/righthand_rule

**参数**

| 参数    | 类型    | 描述                                                                                     |
| :------ | :------ | :--------------------------------------------------------------------------------------- |
| geojson | GeoJSON | object to be rotated                                                                     |
| angle   | number  | of rotation (along the vertical axis), from North in decimal degrees, negative clockwise |
| options | Object  | Optional parameters: see below                                                           |

**options 选项**

| 属性   | 类型    | 默认值   | 描述                                                                          |
| :----- | :------ | :------- | :---------------------------------------------------------------------------- |
| pivot  | Coord   | centroid | point around which the rotation will be performed                             |
| mutate | boolean | false    | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - the rotated GeoJSON feature

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
var options = { pivot: [0, 25] };
var rotatedPoly = turf.transformRotate(poly, 10, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformRotate.a9355690.webp)

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
            :coordinates="rotateCoordinates"
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
      rotateCoordinates: null,
      style: null,
    };
  },
  mounted() {
    this.rotateCoordinates = turf.transformRotate(
      turf.lineString(this.coordinates),
      60,
      { pivot: this.coordinates[0] }
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

    <input type="button" value="pivot" @click="handleClickPrvote" />
    angle：<input type="number" v-model="angle" />
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
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="isDrawPivot"
          type="Point"
          @drawend="handleDrawEnd2"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector v-if="rotateGeometry">
        <vue2ol-feature :style-obj="style" :geometry="rotateGeometry">
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
      feature2: null,
      type: "LineString",
      isDrawPivot: false,
      rotateGeometry: null,
      style: null,
      angle: 60,
    };
  },
  watch: {
    feature1() {
      this.init();
    },
    feature2() {
      this.init();
    },
    type() {
      if (this.type) {
        this.isDrawPivot = false;
      }
    },
    isDrawPivot() {
      if (this.isDrawPivot) {
        this.type = "";
      }
    },
    angle() {
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
    handleClickPrvote() {
      this.isDrawPivot = true;
    },
    handleDrawEnd1(e) {
      this.feature1 = e.feature;
    },
    handleDrawEnd2(e) {
      this.feature2 = e.feature;
    },
    init() {
      if (!this.feature1 || !this.feature2) {
        return;
      }
      console.log(this.angle);
      let f = turf.transformRotate(
        JSON.parse(new GeoJSON().writeFeature(this.feature1)),
        parseFloat(this.angle),
        { pivot: this.feature2.getGeometry().getCoordinates() }
      );
      this.rotateGeometry = new GeoJSON().readGeometry(
        JSON.stringify(f.geometry)
      );
    },
  },
};
</script>
```

:::
