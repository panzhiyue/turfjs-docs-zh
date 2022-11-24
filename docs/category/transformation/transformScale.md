# 缩放(transformScale)

```
> npm install @turf/transform-scale
```

> Scale a GeoJSON from a given point by a factor of scaling (ex: factor=2 would make the GeoJSON 200% larger). If a FeatureCollection is provided, the origin point will be calculated based on each individual Feature.
>
> 接收一个要素或要素集，进行缩放并返回
>
> 根据一个给定的点缩放 GeoJSON(例如:factor=2 将使 GeoJSON 增大 200%)。如果提供了`FeatureCollection`，则将根据每个单独的`Feature`计算原点。

**参数**

| 参数    | 类型    | 描述                   |
| :------ | :------ | :--------------------- |
| geojson | GeoJSON | 需要缩放的要素         |
| factor  | number  | 缩放比例，只能为是正值 |
| options | Object  | 可配置项               |

**options 选项**

| 属性   | 类型         | 默认值     | 描述                                                                 |
| :----- | :----------- | :--------- | :------------------------------------------------------------------- |
| origin | string\|Coor | "centroid" | 缩放的中心点，如果是 String 的话，选项有 sw/se/nw/ne/center/centroid |
| mutate | boolean      | false      | 是否返回入参的 GeoJSON。如果为 true，则可显着提高性能                |

**返回**

GeoJSON - scaled GeoJSON

GeoJSON - 缩放后的 GeoJSON

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
var scaledPoly = turf.transformScale(poly, 3);
/*
{
  type: "Feature",
  geometry: {
    type: "polygon",
    coordinates: [
      [
        [-3.943186502488288, 27.000000000000014],
        [6.457389876866159, 27.000000000000007],
        [3.5342414612586026, 36.00000000000001],
        [-3.943186502488288, 27.000000000000014]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformScale.3ae75920.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <a-button
      type="primary"
      @click="
        () => {
          visible = true;
        }
      "
      >打开</a-button
    >
    <drawer :visible.sync="visible" :code="code">
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>

        <vue2ol-feature :style-obj="style">
          <vue2ol-geom-linestring
            :coordinates="scaleCoordinates"
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
      scaleCoordinates: null,
      style: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let line = turf.lineString(${JSON.stringify(this.coordinates)});
let result = turf.transformScale(line, 2);`;
    },
  },
  mounted() {
    this.result = turf.transformScale(turf.lineString(this.coordinates), 2);
    this.scaleCoordinates = this.result.geometry.coordinates;

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
    <a-button
      type="primary"
      @click="
        () => {
          visible = true;
        }
      "
      >打开</a-button
    >
    <drawer :visible.sync="visible" :code="code">
      <a-row>
        <select v-model="type">
          <option value=""></option>
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row>factor：<a-input-number v-model="factor" /></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>

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
      <vue2ol-source-vector v-if="scaleGeometry">
        <vue2ol-feature :style-obj="style" :geometry="scaleGeometry">
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
      scaleGeometry: null,
      style: null,
      factor: 2,
      result: null,
      visible: true,
    };
  },
  watch: {
    feature1() {
      this.init();
    },
    type() {
      if (this.type) {
        this.isDrawPivot = false;
      }
    },
    factor() {
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
  computed: {
    code() {
      if (!this.feature1) {
        return;
      }
      return `let f = new GeoJSON().writeFeature(this.feature1);
let result = turf.transformScale(f,${this.factor});`;
    },
  },
  methods: {
    handleDrawEnd1(e) {
      this.feature1 = e.feature;
    },
    init() {
      if (!this.feature1) {
        return;
      }

      this.result = turf.transformScale(
        JSON.parse(new GeoJSON().writeFeature(this.feature1)),
        parseFloat(this.factor)
      );
      this.scaleGeometry = new GeoJSON().readGeometry(
        JSON.stringify(this.result.geometry)
      );
    },
  },
};
</script>
```

:::
