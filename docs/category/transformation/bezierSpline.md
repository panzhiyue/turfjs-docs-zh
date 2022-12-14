# 多线段平滑(bezierSpline)

```
> npm install @turf/bezier-spline
```

> Takes a line and returns a curved version by applying a Bezier spline algorithm.
>
> 接收一条线段，通过 [贝塞尔算法 (opens new window)](https://baike.baidu.com/item/贝塞尔曲线算法/4095155?fromtitle=贝塞尔算法&fromid=18248630&fr=aladdin)返回一个贝塞尔曲线。

**参数**

| 参数    | 类型                                                                                 | 描述                         |
| :------ | :----------------------------------------------------------------------------------- | :--------------------------- |
| line    | [Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\> | 类型为 LineString 的 GeoJSON |
| options | Object                                                                               | 可配置项                     |

**options 选项**

| 属性       | 类型   | 默认值 | 描述                                             |
| :--------- | :----- | :----- | :----------------------------------------------- |
| resolution | number | 10000  | 点与点之间的时间(单位为毫秒)                     |
| sharpness  | number | 0.85   | 线段的弯曲程度，介于 0 和 1 之间，数值越大越平滑 |

**返回**

[Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\> - curved line

[Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\> - 贝塞尔曲线

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
      <a-row
        ><a-space
          >几何：<geojson-text
            :type.sync="type1"
            @change="handleChange"
          ></geojson-text></a-space
      ></a-row>
      <a-row><json :data="result"></json> </a-row>
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
    };
  },
  computed: {
    code() {
      return `let line = ${JSON.stringify(this.turfObj1)};
let result = turf.bezierSpline(line);`;
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

        this.result = turf.bezierSpline(this.turfObj1);
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
  mounted() {},
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
