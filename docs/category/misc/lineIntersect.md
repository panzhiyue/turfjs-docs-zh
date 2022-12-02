# 计算两线段相交点(lineIntersect)

```
> npm install @turf/line-intersect
```

> Takes any LineString or Polygon GeoJSON and returns the intersecting point(s).
> 接收两个任何`LineString`或`Polygon`GeoJSON，并返回所有的相交点。

**参数**

| 参数  | 类型                                                                                                | 描述               |
| :---- | :-------------------------------------------------------------------------------------------------- | :----------------- |
| line1 | (`Geometry`\|`FeatureCollection`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | 任意线要素或面要素 |
| line2 | (`Geometry`\|`FeatureCollection`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | 任意线要素或面要素 |

**返回**

`FeatureCollection <Point>` - point(s) that intersect both

`FeatureCollection <Point>` - 两者相交的点集合

**示例**

```js
var line1 = turf.lineString([
  [126, -11],
  [129, -21],
]);
var line2 = turf.lineString([
  [123, -18],
  [131, -14],
]);
var intersects = turf.lineIntersect(line1, line2);
/*
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [127.43478260869566, -15.782608695652174]
      },
      properties: {}
    }
  ]
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineIntersect.aeff2c84.webp)

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
      <a-row>线1：<geojson-obj :value.sync="turfObj1"></geojson-obj></a-row>
      <a-row>线2：<geojson-obj :value.sync="turfObj2"></geojson-obj></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      turfObj1: turf.lineString([
        [119.72452640533449, 27.981138706207275],
        [119.79044437408449, 28.0978684425354],
        [119.89481449127199, 28.1857590675354],
        [120.06235599517824, 28.06765604019165],
        [120.16397953033449, 27.871275424957275],
        [119.94287967681886, 27.9715256690979],
        [119.72452640533449, 27.981138706207275],
      ]),
      turfObj2: turf.lineString([
        [120.03901004791261, 28.166897773742676],
        [119.93189334869386, 27.99523639678955],
        [119.92502689361574, 27.826321601867676],
        [120.18183231353761, 27.807095527648926],
        [120.19968509674074, 27.95678424835205],
        [120.13651371002199, 28.07214069366455],
        [120.03901004791261, 28.166897773742676],
      ]),

      result: null,
      visible: true,
      styleRed,
      features: [],
    };
  },
  computed: {
    code() {
      return `let result = turf.lineIntersect(
  ${JSON.stringify(this.turfObj1)},
  ${JSON.stringify(this.turfObj2)}
);`;
    },
    features1() {
      return getFeaturesFromTurf(this.turfObj1).concat(
        getFeaturesFromTurf(this.turfObj2)
      );
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    turfObj2() {
      this.init();
    },
  },
  methods: {
    init() {
      try {
        this.result = turf.lineIntersect(this.turfObj1, this.turfObj2);
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
  mounted() {
    this.init();
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
        <a-button type="primary" @click="handleDraw1">线1</a-button>
        <a-button type="primary" @click="handleDraw2">线2</a-button>
      </a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource1">
        <vue2ol-interaction-draw
          type="LineString"
          :active="isDraw1"
          @drawend="handleDrawEnd1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource2">
        <vue2ol-interaction-draw
          type="LineString"
          :active="isDraw2"
          @drawend="handleDrawEnd2"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      isDraw2: false,
      isDraw1: false,
      feature1: null,
      feature2: null,
      source1: null,
      source2: null,
      result: null,
      visible: true,
      styleRed,
      features: [],
    };
  },
  watch: {
    feature1() {
      this.init();
    },
    feature2() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    turfObj1() {
      return JSON.parse(new GeoJSON().writeFeature(this.feature1));
    },
    turfObj2() {
      return JSON.parse(new GeoJSON().writeFeature(this.feature2));
    },
    code() {
      if (!this.feature1 || !this.feature2) {
        return;
      }
      return `let result = turf.lineIntersect(
  ${JSON.stringify(this.turfObj1)},
  ${JSON.stringify(this.turfObj2)}
);`;
    },
  },
  methods: {
    init() {
      console.log(this.feature1, this.feature2);
      if (!this.feature1 || !this.feature2) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.lineIntersect(this.turfObj1, this.turfObj2);
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
    handleDraw1() {
      this.isDraw1 = !this.isDraw1;
      this.isDraw2 = false;
    },
    handleDraw2() {
      this.isDraw2 = !this.isDraw2;
      this.isDraw1 = false;
    },
    handleDrawEnd1(e) {
      this.source1.clear();
      this.feature1 = e.feature;
    },
    handleDrawEnd2(e) {
      this.source2.clear();
      this.feature2 = e.feature;
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
