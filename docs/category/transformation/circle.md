# 生成多边形圆(circle)

```
> npm install @turf/circle
```

> Takes a Point and calculates the circle polygon given a radius in degrees, radians, miles, or kilometers; and steps for precision.
>
> 取一个点并计算给定的以度、弧度、英里或公里为半径的圆多边形

**参数**

| 参数    | 类型                                                                              | 描述     |
| :------ | :-------------------------------------------------------------------------------- | :------- |
| center  | [Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\>\|Array | 圆心     |
| radius  | number                                                                            | 半径     |
| options | Object                                                                            | 可配置项 |

**options 选项**

| 属性       | 类型   | 默认值     | 描述                                               |
| :--------- | :----- | :--------- | :------------------------------------------------- |
| units      | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| steps      | number | 64         | 圆弧的平滑度，数值越高越平滑                       |
| properties | Object | {}         | 返回 GeoJSON 的圆弧的平滑度，数值越高越平滑        |

**返回**

[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\> - circle polygon

[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\> - 圆几何面

```js
var center = [-75.343, 39.984];
var radius = 5;
var options = { steps: 10, units: "kilometers", properties: { foo: "bar" } };
var circle = turf.circle(center, radius, options);
/* steps 为 10，所以更像是一个十边形
{
  type: "Feature",
  geometry: {
    coordinates: [
      [
        [-75.343, 40.02896601818623],
        [-75.37751268579942, 40.020373156514275],
        [-75.39882430740063, 39.99788187546377],
        [-75.39880160476812, 39.97009135591055],
        [-75.37747595213794, 39.94761661877482],
        [-75.343, 39.93903398181377],
        [-75.30852404786205, 39.94761661877482],
        [-75.28719839523187, 39.97009135591055],
        [-75.28717569259938, 39.99788187546377],
        [-75.30848731420058, 40.020373156514275],
        [-75.343, 40.02896601818623]
      ]
    ],
    type: "Polygon"
  },
  properties: { foo: "bar" }
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/circle.ee8f3c90.webp)

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
    };
  },
  computed: {
    code() {
      return `let result = turf.circle(${JSON.stringify(this.turfObj1)}, 5, {
  steps: 10,
  units: "kilometers",
  properties: { foo: "bar" },
});`;
    },
  },
  watch: {
    turfObj1() {
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

        this.result = turf.circle(this.turfObj1, 5, {
          steps: 10,
          units: "kilometers",
          properties: { foo: "bar" },
        });
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
      <a-row>半径<input type="number" v-model="radius" /></a-row>
      <a-row>点数<input type="number" v-model="steps" /></a-row>
      <a-row>单位：<length-units :value.sync="units"></length-units></a-row>
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
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="circleCoordinates">
          <vue2ol-geom-polygon
            :coordinates="circleCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      geometry: null,
      circleCoordinates: null,
      radius: 2,
      units: "kilometers",
      steps: 10,
      result: null,
      visible: true,
    };
  },
  watch: {
    geometry() {
      this.init();
    },
    radius() {
      this.init();
    },
    units() {
      this.init();
    },
    steps() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let result = turf.circle(${JSON.stringify(
        this.geometry.getCoordinates()
      )}, ${this.radius}, {
  steps: ${this.steps},
  units: '${this.units}',
  properties: { foo: "bar" },
});`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      this.result = turf.circle(this.geometry.getCoordinates(), this.radius, {
        steps: this.steps,
        units: this.units,
        properties: { foo: "bar" },
      });
      this.circleCoordinates = this.result.geometry.coordinates;
    },
  },
};
</script>
```

:::
