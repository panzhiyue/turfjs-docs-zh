# 计算扇形多边形(sector)

```
> npm install @turf/sector
```

> Creates a circular sector of a circle of given radius and center Point , between (clockwise) bearing1 and bearing2; 0 bearing is North of center point, positive clockwise.
> 在角度bearing1和角度bearing2之间创建给定半径和圆心点的扇形。

> 值得注意的是，角度是与正北方向所形成的角度，顺时针为正值，且两个角度有先后顺序

**参数**

| 参数     | 类型                    | 描述                  |
| :------- | :---------------------- | :-------------------- |
| center   | Coord\|`Feature<Point>` | 中心点                |
| radius   | number                  | 圆的半径              |
| bearing1 | number                  | 介于 -180 至 180 之间 |
| bearing2 | number                  | 介于 -180 至 180 之间 |
| options  | Object                  | 可配置项              |

**options选项**

| 属性       | 类型       | 默认值     | 描述                                               |
| :--------- | :--------- | :--------- | :------------------------------------------------- |
| units      | string     | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| steps      | number     | 64         | 圆弧的平滑度，数值越高越平滑                       |
| properties | Properties | {}         | 输出GeoJSON的properties 属性                       |

**返回**

`Feature <Polygon>` - sector polygon

`Feature <Polygon>` - 扇形面

**示例**

```js
var center = turf.point([-75, 40]);
var radius = 5;
var bearing1 = 25;
var bearing2 = 45;

var sector = turf.sector(center, radius, bearing1, bearing2); // type 为 Polygon 的扇形面要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/sector.b64e9689.webp)

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
        >半径(radius)：<a-input-number v-model="radius"></a-input-number
      ></a-row>
      <a-row
        >bearing1：<a-input-number v-model="bearing1"></a-input-number
      ></a-row>
      <a-row
        >bearing2：<a-input-number v-model="bearing2"></a-input-number
      ></a-row>
      <a-row
        >平滑度(steps)：<a-input-number v-model="steps"></a-input-number
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
      type1: "Point",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
      radius: 5,
      bearing1: 25,
      bearing2: 80,
      steps: 64,
      units: "kilometers",
    };
  },
  computed: {
    code() {
      return `let result = turf.sector(${JSON.stringify(this.turfObj1)}, ${
        this.radius
      },${this.bearing1},${this.bearing2}, 
{
  steps: ${this.steps},
  units: '${this.units}'
});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    radius() {
      this.init();
    },
    bearing1() {
      this.init();
    },
    bearing2() {
      this.init();
    },
    steps() {
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
        this.result = turf.sector(
          this.turfObj1,
          this.radius,
          this.bearing1,
          this.bearing2,
          {
            steps: this.steps,
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
        >半径(radius)：<a-input-number v-model="radius"></a-input-number
      ></a-row>
      <a-row
        >bearing1：<a-input-number v-model="bearing1"></a-input-number
      ></a-row>
      <a-row
        >bearing2：<a-input-number v-model="bearing2"></a-input-number
      ></a-row>
      <a-row
        >平滑度(steps)：<a-input-number v-model="steps"></a-input-number
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
          type="Point"
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
      feature: null,
      circleCoordinates: null,
      radius: 2,
      units: "kilometers",
      steps: 10,
      result: null,
      visible: true,
      features1: [],
      radius: 5,
      bearing1: 25,
      bearing2: 80,
      steps: 64,
      units: "kilometers",
      styleRed,
      features: [],
    };
  },
  watch: {
    feature() {
      this.init();
    },
    radius() {
      this.init();
    },
    bearing1() {
      this.init();
    },
    bearing2() {
      this.init();
    },
    steps() {
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
      return `let result = turf.sector(${new GeoJSON().writeFeature(
        this.feature
      )}, ${this.radius},${this.bearing1},${this.bearing2}, 
{
  steps: ${this.steps},
  units: '${this.units}'
});`;
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

        this.result = turf.sector(
          JSON.parse(new GeoJSON().writeFeature(this.feature)),
          this.radius,
          this.bearing1,
          this.bearing2,
          {
            steps: this.steps,
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