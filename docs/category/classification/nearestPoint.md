# 计算最近的点(nearestPoint)

```
> npm install @turf/nearest-point
```

> Takes a reference point and a FeatureCollection of Features with Point geometries and returns the point from the FeatureCollection closest to the reference. This calculation is geodesic.
>
> 接收一组点要素集合(`FeatureCollection<Point>`)和一个参照物点要素()，返回该点要素集合里最接近参照物点的点要素，包含两个属性：在要素集里的index,和参照物的距离(英里)
>
> 

**参数**

| 参数        | 类型                        | 描述         |
| :---------- | :-------------------------- | :----------- |
| targetPoint | Coord\|`Feature<Point>`     | 参照物点要素 |
| points      | `FeatureCollection <Point>` | 点要素集     |

**返回**

`Feature <Point>` - the closest point in the set to the reference point

`Feature <Point>` - 集合中距离参考点最近的点

**示例**

```js
var targetPoint = turf.point([28.965797, 41.010086], { "marker-color": "#0F0" });
var points = turf.featureCollection([
  turf.point([28.973865, 41.011122]),
  turf.point([28.948459, 41.024204]),
  turf.point([28.938674, 41.013324])
]);

var nearest = turf.nearestPoint(targetPoint, points);
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [28.973865, 41.011122]
  },
  properties: {
    featureIndex: 0,
    distanceToPoint: 0.6866892586431127
  }
}
*/
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
      <a-row>点几何：<geojson-obj :value.sync="turfObj1"></geojson-obj> </a-row>
      <a-row>多点：<geojson-obj :value.sync="turfObj2"></geojson-obj> </a-row>

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
      turfObj1: turf.point([119.7307062149048, 28.1473069190979]),
      turfObj2:turf.featureCollection([
        turf.point([119.98401432037355, 27.9880051612854]),
        turf.point([119.78975772857667, 27.91159439086914]),
        turf.point([120.14406681060792, 27.893741607666016]),
        turf.point([120.21685123443605, 28.07364273071289]),
        turf.point([119.61260318756105, 28.15054702758789]),
        turf.point([119.86666202545167, 28.06540298461914]),
      ])
    };
  },
  computed: {
    code() {
      return `let result = turf.nearestPoint(${JSON.stringify(
        this.turfObj1
      )},${JSON.stringify(this.turfObj2)});`;
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
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.nearestPoint(this.turfObj1, this.turfObj2);

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
