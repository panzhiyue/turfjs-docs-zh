# 生成多边形圆(circle)

> Takes a Point and calculates the circle polygon given a radius in degrees, radians, miles, or kilometers; and steps for precision.
>
> 取一个点并计算给定的以度、弧度、英里或公里为半径的圆多边形

**参数**

| 参数    | 类型                       | 描述                           |
| :------ | :------------------------- | :----------------------------- |
| center  | (`Feature <Point>`\|Array) | center point                   |
| radius  | number                     | radius of the circle           |
| options | Object                     | Optional parameters: see below |

**options 选项**

| 属性       | 类型   | 默认值     | 描述                                       |
| :--------- | :----- | :--------- | :----------------------------------------- |
| units      | string | kilometers | any of the options supported by turf units |
| steps      | number | 64         | number of steps                            |
| properties | Object | {}         | properties                                 |

**返回**

`Feature <Polygon>` - circle polygon

**示例**

```js
var center = [-75.343, 39.984];
var radius = 5;
var options = { steps: 10, units: "kilometers", properties: { foo: "bar" } };
var circle = turf.circle(center, radius, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/circle.ee8f3c90.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="coordinates"></vue2ol-geom-point>
        </vue2ol-feature>

        <vue2ol-feature>
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
export default {
  data() {
    return {
      coordinates: [119.74649906158449, 28.134775638580322],

      circleCoordinates: null,
    };
  },
  mounted() {
    this.circleCoordinates = turf.circle(this.coordinates, 5, {
      steps: 10,
      units: "kilometers",
      properties: { foo: "bar" },
    }).geometry.coordinates;
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
    半径<input type="number" v-model="radius" />点数<input
      type="number"
      v-model="steps"
    />
    单位：<length-units :value.sync="units"></length-units>
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
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      this.circleCoordinates = turf.circle(
        this.geometry.getCoordinates(),
        this.radius,
        {
          steps: this.steps,
          units: this.units,
          properties: { foo: "bar" },
        }
      ).geometry.coordinates;
    },
  },
};
</script>
```

:::
