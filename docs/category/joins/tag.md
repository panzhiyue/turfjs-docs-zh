# 空间连接(tag)

```
> npm install @turf/tag
```

> Takes a set of points and a set of polygons and performs a spatial join.
>
> 接收一组点要素集合和一组面要素集合，面要素内的点要素进行空间连接和属性继承

**参数**

| 参数     | 类型                          | 描述                   |
| :------- | :---------------------------- | :--------------------- |
| points   | `FeatureCollection <Point>`   | 点要素集合             |
| polygons | `FeatureCollection <Polygon>` | 面要素集合             |
| field    | string                        | 面要素的要被继承的属性 |
| outField | string                        | 点要素继承属性的重命名 |

**返回**

`FeatureCollection <Point>` - points with containingPolyId property containing values from polyId

**示例**

```js
var pt1 = turf.point([-77, 44]);
var pt2 = turf.point([-77, 38]);
var poly1 = turf.polygon(
  [
    [
      [-81, 41],
      [-81, 47],
      [-72, 47],
      [-72, 41],
      [-81, 41],
    ],
  ],
  { pop: 3000 }
);
var poly2 = turf.polygon(
  [
    [
      [-81, 35],
      [-81, 41],
      [-72, 41],
      [-72, 35],
      [-81, 35],
    ],
  ],
  { pop: 1000 }
);

var points = turf.featureCollection([pt1, pt2]);
var polygons = turf.featureCollection([poly1, poly2]);

var tagged = turf.tag(points, polygons, "pop", "population");
/*
{
  type: "FeatureCollection",
  faetures: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77, 44]
      },
      properties: {
        population: 3000 // pop属性重命名为population
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77, 38]
      },
      properties: {
        population: 1000
      }
    }
  ]
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tag.adc60a50.webp)

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
      turfObj1: turf.polygon(
        [
          [
            [119.7307062149048, 28.1473069190979],
            [119.68401432037355, 27.9880051612854],
            [119.94219303131105, 27.934446811676025],
            [120.1646661758423, 27.948179721832275],
            [120.13033390045167, 28.10610818862915],
            [119.7307062149048, 28.1473069190979],
          ],
        ],
      ),
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
      return `let result = turf.pointsWithinPolygon(${JSON.stringify(
        this.turfObj2
      )},${JSON.stringify(this.turfObj1)});`;
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
        this.result = turf.pointsWithinPolygon(this.turfObj2, this.turfObj1);

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
