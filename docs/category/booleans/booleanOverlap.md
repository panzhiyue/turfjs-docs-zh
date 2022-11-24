# 判断是否重叠(booleanOverlap)

```
> npm install @turf/boolean-overlap
```

> Compares two geometries of the same dimension and returns true if their intersection set results in a geometry different from both but of the same dimension. It applies to Polygon/Polygon, LineString/LineString, Multipoint/Multipoint, MultiLineString/MultiLineString and MultiPolygon/MultiPolygon.
>
> 接收两个任意类型的要素，判断它们是否有交集重叠。
>
> 值得注意的是，判断的要素必须是同类型的：面要素和面要素、线和线、MultiPoint 和 MultiPoint、MultiLineString 和 MultiLineString、MultiPolygon 和 MultiPolygon
>
> 经过测试，面与面计算结果正确，其他计算结果错误

**参数**

| 参数     | 类型      | 描述                |
| :------- | :-------- | :------------------ | --------------- | ------- | ------------- | ------- |
| feature1 | `Geometry | Feature<LineString> | MultiLineString | Polygon | MultiPolygon` | GeoJSON |
| feature2 | `Geometry | Feature<LineString> | MultiLineString | Polygon | MultiPolygon` | GeoJSON |

**返回**

boolean - true/false

**示例**

```js
var poly1 = turf.polygon([
  [
    [0, 0],
    [0, 5],
    [5, 5],
    [5, 0],
    [0, 0],
  ],
]);
var poly2 = turf.polygon([
  [
    [1, 1],
    [1, 6],
    [6, 6],
    [6, 1],
    [1, 1],
  ],
]);
var poly3 = turf.polygon([
  [
    [10, 10],
    [10, 15],
    [15, 15],
    [15, 10],
    [10, 10],
  ],
]);

turf.booleanOverlap(poly1, poly2);
//=true
turf.booleanOverlap(poly2, poly3);
//=false
```

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
      <a-row> {{ result }} </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates1"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates2"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates1: [
        [
          [119.72452640533449, 27.981138706207275],
          [119.79044437408449, 28.0978684425354],
          [119.89481449127199, 28.1857590675354],
          [120.06235599517824, 28.06765604019165],
          [120.16397953033449, 27.871275424957275],
          [119.94287967681886, 27.9715256690979],
          [119.72452640533449, 27.981138706207275],
        ],
      ],
      coordinates2: [
        [
          [119.88546661729767, 28.041131343106997],
          [119.81625708696897, 27.880219185092777],
          [120.01177401014755, 27.86983775554347],
          [120.05849044311941, 27.961540383228996],
          [119.88546661729767, 28.041131343106997],
        ],
      ],

      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.booleanOverlap(
      turf.polygon(${JSON.stringify(this.coordinates1)}),
      turf.polygon(${JSON.stringify(this.coordinates2)})
    );`;
    },
  },
  mounted() {
    this.result = turf.booleanOverlap(
      turf.polygon(this.coordinates1),
      turf.polygon(this.coordinates2)
    );
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
        <select v-model="type1">
          <option value=""></option>
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select>
      </a-row>
      <a-row>
        <select v-model="type2">
          <option value=""></option>
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select>
      </a-row>
      <a-row> {{ result }}</a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource1">
        <vue2ol-interaction-draw
          v-if="type1"
          :active="true"
          :type="type1"
          @drawend="handleDrawEnd1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource2">
        <vue2ol-interaction-draw
          v-if="type2"
          :active="true"
          :type="type2"
          @drawend="handleDrawEnd2"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke, Text, Circle, Fill } from "ol/style";
export default {
  data() {
    return {
      geometry1: null,
      geometry2: null,
      source1: null,
      source2: null,
      result: null,
      visible: true,
      type1: "",
      type2: "",
    };
  },
  watch: {
    geometry1() {
      this.init();
    },
    geometry2() {
      this.init();
    },
    type1() {
      if (this.type1) {
        this.type2 = "";
      }
    },
    type2() {
      if (this.type2) {
        this.type1 = "";
      }
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.geometry1 || !this.geometry2) {
        return;
      }
      return `let result = turf.booleanOverlap(
  ${new GeoJSON().writeGeometry(this.geometry1)},
  ${new GeoJSON().writeGeometry(this.geometry2)}
);`;
    },
  },
  methods: {
    init() {
      if (!this.geometry1 || !this.geometry2) {
        return;
      }
      this.result = turf.booleanOverlap(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry1)),
        JSON.parse(new GeoJSON().writeGeometry(this.geometry2))
      );
    },
    handleDrawEnd1(e) {
      this.source1.clear();
      this.geometry1 = e.feature.getGeometry();
    },
    handleDrawEnd2(e) {
      this.source2.clear();
      this.geometry2 = e.feature.getGeometry();
    },
    handleReadySource1(mapObject) {
      this.source1 = mapObject;
    },
    handleReadySource2(mapObject) {
      this.source2 = mapObject;
    },
  },
};
</script>
```

:::
