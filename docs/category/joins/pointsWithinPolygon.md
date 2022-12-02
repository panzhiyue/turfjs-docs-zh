# 返回在多边形内的点(pointsWithinPolygon)

```
> npm install @turf/points-within-polygon
```

> Finds Points that fall within (Multi)Polygon(s).
>
> 接收一个面要素或面要素集合和点要素或点要素集合，计算并返回在改面要素内部的点

**参数**

| 参数     | 类型               | 描述                       |
| :------- | :----------------- | :------------------------- | --------------- | -------------- | ------ |
| points   | `Feauture          | FeatureCollection <Point>` | 要计算的点要素  |
| polygons | `FeatureCollection | Geometry                   | Feature<Polygon | MultiPolygon>` | 面要素 |

**返回**

`FeatureCollection <Point>` - points that land within at least one polygon

`FeatureCollection <Point>` - 至少位于一个面内的点集合

**示例**

```js
var points = turf.points([
  [-46.6318, -23.5523],
  [-46.6246, -23.5325],
  [-46.6062, -23.5513],
  [-46.663, -23.554],
  [-46.643, -23.557],
]);

var searchWithin = turf.polygon([
  [
    [-46.653, -23.543],
    [-46.634, -23.5346],
    [-46.613, -23.543],
    [-46.614, -23.559],
    [-46.631, -23.567],
    [-46.653, -23.56],
    [-46.653, -23.543],
  ],
]);

var ptsWithin = turf.pointsWithinPolygon(points, searchWithin); // [-46.6318, -23.5523]、[-46.643, -23.557]
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/pointsWithinPolygon.3a2bad82.webp)

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
      <a-row>面几何：<geojson-obj :value.sync="turfObj1"></geojson-obj> </a-row>
      <a-row>点几何：<geojson-obj :value.sync="turfObj2"></geojson-obj> </a-row>
      <a-row
        >单位(units)：<length-units :value.sync="units"></length-units
      ></a-row>

      <a-row> <json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector key="1">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed" key="2">
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
      features: [],
      result: null,
      visible: true,
      styleRed,
      turfObj1: turf.polygon([
        [
          [119.7307062149048, 28.1473069190979],
          [119.68401432037355, 27.9880051612854],
          [119.94219303131105, 27.934446811676025],
          [120.1646661758423, 27.948179721832275],
          [120.13033390045167, 28.10610818862915],
          [119.7307062149048, 28.1473069190979],
        ],
      ]),
      turfObj2: turf.multiPoint([
        [119.98401432037355, 27.9880051612854],
        [119.78975772857667, 27.91159439086914],
        [120.14406681060792, 27.893741607666016],
        [120.21685123443605, 28.07364273071289],
        [119.61260318756105, 28.15054702758789],
        [119.86666202545167, 28.06540298461914],
      ]),
      units: "kilometers",
    };
  },
  computed: {
    code() {
      return `let result = turf.pointsWithinPolygon(${JSON.stringify(
        this.turfObj2
      )},${JSON.stringify(this.turfObj1)},
{
  units:'${this.units}'
});`;
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
    units() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.pointsWithinPolygon(this.turfObj2, this.turfObj1, {
          units: this.units,
        });

        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
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
        面几何:<draw :type.sync="type1" @draw-end="handleDrawEnd1"></draw>
      </a-row>
      <a-row>
        点几何:<draw
          :type.sync="type2"
          @draw-end="handleDrawEnd2"
          :clear="false"
        ></draw>
      </a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="styleRed" key="2">
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
      type1: "",
      type2: "",
      features: [],
      feature1: null,
      features2: [],

      result: null,
      visible: true,
      styleRed,
    };
  },
  mounted() {},
  watch: {
    feature1() {
      this.init();
    },
    features2() {
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
  computed: {
    code() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }
      return `let result = turf.pointsWithinPolygon(${JSON.stringify(this.turfObj2)},${JSON.stringify(
        this.turfObj1
      )});`;
    },
    turfObj1() {
      if (this.feature1) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature1));
      }
    },
    turfObj2() {
      if (this.features2) {
        return JSON.parse(new GeoJSON().writeFeatures(this.features2));
      }
    },
  },
  methods: {
    handleDrawEnd1(feature) {
      this.feature1 = feature;
    },
    handleDrawEnd2(feature) {
      this.features2.push(feature);
    },
    init() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }

      try {
        this.features = [];
        this.result = null;
        this.result = turf.pointsWithinPolygon(this.turfObj2,this.turfObj1);

        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
};
</script>
```

:::
