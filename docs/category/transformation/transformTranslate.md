# 平移(transformTranslate)

```
> npm install @turf/transform-translate
```

> Moves any geojson Feature or Geometry of a specified distance along a Rhumb Line on the provided direction angle.
>
> 接收一个 GeoJSON，返回沿指定角度与距离移动后的 GeoJSON。
>
> 在给定的方向角上沿沿恒向线移动指定距离。

**参数**

| 参数      | 类型    | 描述                                           |
| :-------- | :------ | :--------------------------------------------- |
| geojson   | GeoJSON | 需要移动的要素                                 |
| distance  | number  | 距离，负值为反向移动                           |
| direction | number  | 移动角度，与正北方向所形成的角度，正数为顺时针 |
| options   | Object  | 可配置项                                       |

**options 选项**

| 属性         | 类型    | 默认值     | 描述                                                  |
| :----------- | :------ | :--------- | :---------------------------------------------------- |
| units        | string  | kilometers | 单位，可选的有 degrees、radians、miles、kilometers    |
| zTranslation | number  | 0          | 垂直移动的距离                                        |
| mutate       | boolean | false      | 是否返回入参的 GeoJSON。如果为 true，则可显着提高性能 |

**返回**

GeoJSON - the translated GeoJSON object

GeoJSON - 移动后的 GeoJSON 对象

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
/*
{
  type: "Feature",
  geometry: {
    type: "polygon",
    coordinates: [
      [
        [0.591903257444983, 29.73668011441568],
        [4.091903257444983, 29.73668011441568],
        [3.1107279117935605, 32.73668011441568],
        [0.591903257444983, 29.73668011441568]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformTranslate.8a54e043.webp)

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
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let line = turf.lineString(${JSON.stringify(this.coordinates)});
let result = turf.transformTranslate(
  line,
  10,
  35
);`;
    },
  },
  mounted() {
    this.result = turf.transformTranslate(
      turf.lineString(this.coordinates),
      10,
      35
    );
    this.translateCoordinates = this.result.geometry.coordinates;

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
      <a-row>distance：<a-input-number v-model="distance" /></a-row>
      <a-row>direction<a-input-number v-model="direction" /></a-row>
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
      result: null,
      visible: true,
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
  computed: {
    code() {
      if (!this.feature1) {
        return;
      }
      return `let f = ${new GeoJSON().writeFeature(this.feature1)};
let result = turf.transformTranslate(
  f,
  ${this.distance},
  ${this.direction}
);`;
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

      this.result = turf.transformTranslate(
        JSON.parse(new GeoJSON().writeFeature(this.feature1)),
        parseFloat(this.distance),
        parseFloat(this.direction)
      );
      this.translateGeometry = new GeoJSON().readGeometry(
        JSON.stringify(this.result.geometry)
      );
    },
  },
};
</script>
```

:::
