# 多线段平滑(bezierSpline)

> Takes a line and returns a curved version by applying a Bezier spline algorithm.
>
> 获取一条直线应用 [贝塞尔算法 (opens new window)](https://baike.baidu.com/item/贝塞尔曲线算法/4095155?fromtitle=贝塞尔算法&fromid=18248630&fr=aladdin)返回一个贝塞尔曲线。

**参数**

| 参数    | 类型                   | 描述                           |
| :------ | :--------------------- | :----------------------------- |
| line    | `Feature <LineString>` | input LineString               |
| options | Object                 | Optional parameters: see below |

**options 选项**

| 属性       | 类型   | 默认值 | 描述                                                      |
| :--------- | :----- | :----- | :-------------------------------------------------------- |
| resolution | number | 10000  | time in milliseconds between points                       |
| sharpness  | number | 0.85   | a measure of how curvy the path should be between splines |

**返回**

`Feature <LineString>` - curved line

**示例**

```js
var line = turf.lineString([
  [-76.091308, 18.427501],
  [-76.695556, 18.729501],
  [-76.552734, 19.40443],
  [-74.61914, 19.134789],
  [-73.652343, 20.07657],
  [-73.157958, 20.210656],
]);

var curved = turf.bezierSpline(line);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bezierSpline.881bcfab.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
        <vue2ol-feature v-if="bezierSpline" :style-obj="highlightStyle">
          <vue2ol-geom-linestring
            :coordinates="bezierSpline"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
import * as turf from "@turf/turf";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      bezierSpline: null,
    };
  },
  mounted() {
    this.bezierSpline = turf.bezierSpline(
      turf.lineString(this.coordinates)
    ).geometry.coordinates;

    this.highlightStyle = new Style({
      stroke: new Stroke({
        color: "#f00",
        width: 2,
      }),
    });
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
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="LineString"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="bezierSpline" :style-obj="highlightStyle">
          <vue2ol-geom-linestring
            :coordinates="bezierSpline"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
import * as turf from "@turf/turf";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      geometry: null,
      bezierSpline: null,
    };
  },
  mounted() {
    this.highlightStyle = new Style({
      stroke: new Stroke({
        color: "#f00",
        width: 2,
      }),
    });
  },
  watch: {
    geometry() {
      this.init();
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
      this.bezierSpline = turf.bezierSpline(
        turf.lineString(this.geometry.getCoordinates())
      ).geometry.coordinates;
    },
  },
};
</script>
```

:::
