# 计算点到多线段最短间距的点(nearestPointOnLine)

```
> npm install @turf/nearest-point-on-line
```

> Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
> 获取一个点(Point)和一个线(LineString)，计算并返回该点在改线上最近的点要素。

**参数**

| 参数    | 类型      | 描述               |
| :------ | :-------- | :----------------- | ----------------- | -------------- |
| lines   | `Geometry | Feature<LineString | MultiLineString>` | 参照物的线要素 |
| pt      | `Geometry | Feature<Point>`    | 需计算的点要素    |
| options | Object    | 可配置项           |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |

**返回**

`Feature <Point>` - closest point on the line to point. The properties object will contain three values: index : closest point was found on nth line part, dist : distance between pt and the closest point, location : distance along the line between start and the closest point.

`Feature <Point>` - 距离线段最近的点. properties 对象将包含三个值：index：在第 n 行部分找到最近的点，dist：pt 和最近点之间的距离，location：起点和最近点沿着直线的距离

**示例**

```js
var line = turf.lineString([
  [-77.031669, 38.878605],
  [-77.029609, 38.881946],
  [-77.020339, 38.884084],
  [-77.025661, 38.885821],
  [-77.021884, 38.889563],
  [-77.019824, 38.892368],
]);
var pt = turf.point([-77.037076, 38.884017]);

var snapped = turf.nearestPointOnLine(line, pt, { units: "miles" }); // [-77.02996941477018, 38.881361463229524]的点要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/nearestPointOnLine.cc4cb621.webp)

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
      <a-row
        ><a-space
          >线几何：<geojson-obj :value.sync="turfObj1"></geojson-obj
        ></a-space>
      </a-row>
      <a-row
        ><a-space
          >点几何：<geojson-obj :value.sync="turfObj2"></geojson-obj
        ></a-space>
      </a-row>
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
      turfObj1: turf.lineString([
        [119.7307062149048, 28.1473069190979],
        [119.68401432037355, 27.9880051612854],
        [119.94219303131105, 27.934446811676025],
        [120.1646661758423, 27.948179721832275],
        [120.13033390045167, 28.10610818862915],
      ]),
      turfObj2: turf.point([119.98401432037355, 27.9880051612854]),
      units: "kilometers",
    };
  },
  computed: {
    code() {
      return `let result = turf.nearestPointOnLine(${JSON.stringify(
        this.turfObj1
      )},${JSON.stringify(this.turfObj2)},
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
        this.result = turf.nearestPointOnLine(this.turfObj1, this.turfObj2, {
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
        线几何:<draw :type.sync="type1" @draw-end="handleDrawEnd1"></draw>
      </a-row>
      <a-row>
        点几何:<draw :type.sync="type2" @draw-end="handleDrawEnd2"></draw>
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
      feature2: null,

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
    feature2() {
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
      return `let result = turf.nearestPointOnLine(${JSON.stringify(
        this.turfObj1
      )},${JSON.stringify(this.turfObj2)},
{
  units:'${this.units}'
});`;
    },
    turfObj1() {
      if (this.feature1) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature1));
      }
    },
    turfObj2() {
      if (this.feature2) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature2));
      }
    },
  },
  methods: {
    handleDrawEnd1(feature) {
      this.feature1 = feature;
    },
    handleDrawEnd2(feature) {
      this.feature2 = feature;
    },
    init() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }

      try {
        this.features = [];
        this.result = null;
        this.result = turf.nearestPointOnLine(this.turfObj1, this.turfObj2, {
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
