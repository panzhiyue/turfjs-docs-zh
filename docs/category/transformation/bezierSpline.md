# 多线段平滑(bezierSpline)

```
> npm install @turf/bezier-spline
```

> Takes a line and returns a curved version by applying a Bezier spline algorithm.
>
> 接收一条线段，通过 [贝塞尔算法 (opens new window)](https://baike.baidu.com/item/贝塞尔曲线算法/4095155?fromtitle=贝塞尔算法&fromid=18248630&fr=aladdin)返回一个贝塞尔曲线。

**参数**

| 参数    | 类型                   | 描述                         |
| :------ | :--------------------- | :--------------------------- |
| line    | `Feature <LineString>` | 类型为 LineString 的 GeoJSON |
| options | Object                 | 可配置项                     |

**options 选项**

| 属性       | 类型   | 默认值 | 描述                                             |
| :--------- | :----- | :----- | :----------------------------------------------- |
| resolution | number | 10000  | 点与点之间的时间(单位为毫秒)                     |
| sharpness  | number | 0.85   | 线段的弯曲程度，介于 0 和 1 之间，数值越大越平滑 |

**返回**

`Feature <LineString>` - curved line

`Feature <LineString>` - 贝塞尔曲线

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
      <a-row><json :data="result"></json> </a-row>
    </drawer>
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
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let line = turf.lineString(${JSON.stringify(this.coordinates)});
let result = turf.bezierSpline(line);`;
    },
  },
  mounted() {
    this.result = turf.bezierSpline(turf.lineString(this.coordinates));
    this.bezierSpline = this.result.geometry.coordinates;

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
      <a-row> <json :data="result"></json> </a-row>
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
      result: null,
      visible: true,
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
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let line = turf.lineString(${JSON.stringify(
        this.geometry.getCoordinates()
      )});
let result = turf.bezierSpline(line);`;
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
      this.result = turf.bezierSpline(
        turf.lineString(this.geometry.getCoordinates())
      );
      this.bezierSpline = this.result.geometry.coordinates;
    },
  },
};
</script>
```

:::
