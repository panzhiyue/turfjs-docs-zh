# 计算中心点(center)

```
> npm install @turf/center
```

> Takes a Feature or FeatureCollection and returns the absolute center point of all features.
>
> 接收任意GeoJSON对象，计算并返回它们的绝对中心点。

**参数**

| 参数    | 类型                                     | 描述              |
| :------ | :--------------------------------------- | :---------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 任意 geojson 对象 |
| options | Object                                   | 可配置项          |

**options 选项**

| 属性       | 类型   | 默认值 | 描述                            |
| :--------- | :----- | :----- | :------------------------------ |
| properties | Object | {}     | 输出 geojson 的 properties 属性 |

**返回**

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - a Point feature at the absolute center point of all input features

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - 所有输入要素的绝对中心点

**示例**

```js
var features = turf.featureCollection([
  turf.point([-97.522259, 35.4691]),
  turf.point([-97.502754, 35.463455]),
  turf.point([-97.508269, 35.463245]),
]);

var center = turf.center(features);
/*
{
  type: "Feature",
  geometry: {
    coordinates: [-97.5125065, 35.4661725],
    type: "point"
  },
  properties: {}
}
*/

// 单一要素
var center = turf.center(
  turf.polygon([
    [
      [-97.522259, 35.4691],
      [-97.502754, 35.463455],
      [-97.508269, 35.463245],
      [-97.522259, 35.4691],
    ],
  ]),
  {
    properties: {
      desc: "center point",
    },
  }
);
/*
{
  type: "Feature",
  geometry: {
    coordinates: [-97.5125065, 35.4661725],
    type: "point"
  },
  properties: {
    desc: "center point"
  }
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/center.57e658f3.webp)

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
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke, Text, Circle, Fill } from "ol/style";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      result: null,
      visible: true,
      type1: "MultiPoint",
      turfObj1: null,
      features:[],
      features1: [],
      styleRed
    };
  },
  computed: {
    code() {
      return `let result = turf.center(${JSON.stringify(this.turfObj1)});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
  },
  mounted() {
  },
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.center(this.turfObj1);
        this.features = getFeaturesFromTurf(this.result);
        // this.center = this.result.geometry.coordinates;
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
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          type="Point"
          :active="true"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="center" :style-obj="centerStyle">
          <vue2ol-geom-point :coordinates="center"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke, Text, Circle, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates: [],
      center: null,
      centerStyle: null,
      visible: true,
      result: null,
    };
  },
  computed: {
    code() {
      let ps = this.coordinates.map((item) => {
        return turf.point(item);
      });
      let features = turf.featureCollection(ps);
      return `let points = ${JSON.stringify(features)};
let result = turf.center(points);`;
    },
  },
  mounted() {
    this.centerStyle = new Style({
      image: new Circle({
        radius: 8,
        stroke: new Stroke({
          color: "#ff0000",
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.5)",
        }),
      }),
    });
  },
  methods: {
    handleDrawEnd(e) {
      this.coordinates.push(e.feature.getGeometry().getCoordinates());
      this.init();
    },
    init() {
      let ps = this.coordinates.map((item) => {
        return turf.point(item);
      });
      let features = turf.featureCollection(ps);
      this.result = turf.center(features);
      this.center = this.result.geometry.coordinates;
    },
  },
};
</script>
```

:::
