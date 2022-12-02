# 根据距离截取多线段(lineSliceAlong)

```
> npm install @turf/line-slice-along
```

> Takes a line , a specified distance along the line to a start Point , and a specified distance along the line to a stop point and returns a subsection of the line in-between those points.
> 接收一条线段，起点距离，终点距离，计算并返回 2 点之间的线段。

> 值得注意的是，起点距离的点超过终点距离的点也没关系，只是坐标顺序相反而已

**参数**

| 参数      | 类型                   | 描述                   |
| :-------- | :--------------------- | :--------------------- |
| line      | `Feature <LineString>` | 要裁切的线段           |
| startDist | number                 | 沿起点在线上的指定距离 |
| stopDist  | number                 | 沿终点在线上的指定距离 |
| options   | Object                 | 可配置项               |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                                         |
| :---- | :----- | :--------- | :----------------------------------------------------------- |
| units | string | kilometers | 沿线距离的单位，可选的有 degrees、radians、miles、kilometers |

**返回**

`Feature <LineString>` - sliced line

`Feature <LineString>` - 裁切后的线段

**示例**

```js
var line = turf.lineString([
  [7, 45],
  [9, 45],
  [14, 40],
  [14, 41],
]);
var start = 12.5;
var stop = 25;
var sliced = turf.lineSliceAlong(line, start, stop, { units: "miles" });
/*
{
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [7.25584134370955, 45.00194719009643],
      [7.511697527558178, 45.003323144337116]
    ]
  }
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSliceAlong.e16ac166.webp)

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
          >几何：<geojson-text
            :type.sync="type1"
            @change="handleChange"
          ></geojson-text></a-space
      ></a-row>
      <a-row
        >起点距离(startDist)：<a-input-number
          v-model="startDist"
        ></a-input-number
      ></a-row>
      <a-row
        >终点距离(stopDist)：<a-input-number v-model="stopDist"></a-input-number
      ></a-row>
      <a-row
        >单位(units)：<length-units :value.sync="units"></length-units
      ></a-row>
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
      result: null,
      visible: true,
      type1: "LineString",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
      startDist: 10,
      stopDist: 25,
      units: "kilometers",
    };
  },
  computed: {
    code() {
      return `let result = turf.lineSliceAlong(${JSON.stringify(
        this.turfObj1
      )}, ${this.startDist}, ${this.stopDist},
{
  units:${this.units}
});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    startDist() {
      this.init();
    },
    stopDist() {
      this.init();
    },
    units() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.lineSliceAlong(
          this.turfObj1,
          this.startDist,
          this.stopDist,
          {
            units: this.units,
          }
        );
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
    handleChange(obj) {
      this.turfObj1 = obj;
      this.features1 = getFeaturesFromTurf(this.turfObj1);
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
      <a-row
        >起点距离(startDist)：<a-input-number
          v-model="startDist"
        ></a-input-number
      ></a-row>
      <a-row
        >终点距离(stopDist)：<a-input-number v-model="stopDist"></a-input-number
      ></a-row>
      <a-row
        >单位(units)：<length-units :value.sync="units"></length-units
      ></a-row>
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="LineString"
          @drawend="handleDrawEnd"
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
      result: null,
      visible: true,
      styleRed,
      feature: null,
      features: [],
      startDist: 10,
      stopDist: 25,
      units: "kilometers",
    };
  },
  watch: {
    feature() {
      this.init();
    },
    startDist() {
      this.init();
    },
    stopDist() {
      this.init();
    },
    units() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.feature) {
        return;
      }
      return `let result = turf.lineSliceAlong(${JSON.stringify(
        this.turfObj1
      )}, ${this.startDist}, ${this.stopDist},
{
  units:${this.units}
});`;
    },
    turfObj1() {
      return JSON.parse(new GeoJSON().writeFeature(this.feature));
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.feature = e.feature;
    },
    init() {
      if (!this.feature) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.lineSliceAlong(
          this.turfObj1,
          this.startDist,
          this.stopDist,
          {
            units: this.units,
          }
        );
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
