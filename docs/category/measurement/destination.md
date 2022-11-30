# 根据点、距离和角度计算目标点(destination)

```
> npm install @turf/destination
```

> Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the Haversine formula to account for global curvature.
>
> 接收入参的点作为参照物，通过指定距离(以度、弧度、英里或公里为单位)计算出目标点的位置。

**参数**

| 参数     | 类型                            | 描述                                  |
| :------- | :------------------------------ | :------------------------------------ |
| origin   | [Coor](../other/type.html#coor) | 起始点，即参照物                      |
| distance | number                          | 和起始点的距离                        |
| bearing  | number                          | 和起始点的角度，介于 -180 至 180 之间 |
| options  | Object                          | 可配置项                              |

**options 选项**

| 属性       | 类型   | 默认值     | 描述                                               |
| :--------- | :----- | :--------- | :------------------------------------------------- |
| units      | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| properties | Object | {}         | 输出 geojson 对象的 properties 属性                |

**返回**

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - destination point

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - 目标点

**示例**

```js
var point = turf.point([-75.343, 39.984]);
var distance = 50;
var bearing = 90;
var options = { units: "miles" };

var destination = turf.destination(point, distance, bearing, options);
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-74.39858826442095, 39.98016766669771]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/destination.7512f72b.webp)

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
    <vue2ol-layer-vector :style-obj="startStyle">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="endStyle">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Circle, Stroke, Fill, Text } from "ol/style";
import { getTestOL } from "../../utils/index.js";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      startStyle: null,
      endStyle: null,
      visible: true,
      result: null,
      type1: "Point",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      return `var point = turf.point(${JSON.stringify(this.turfObj1)});
var distance = 10;
var bearing = 90;
var options = { units: "miles" };
this.result = turf.destination(point, distance, bearing, options);`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
  },
  mounted() {
    this.startStyle = new Style({
      image: new Circle({
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        radius: 4,
      }),
      text: new Text({
        text: "起点",
        overflow: true,
        fill: new Fill({
          color: "#ffffff",
        }),
        font: "20px sans-serif",
      }),
    });
    this.endStyle = new Style({
      image: new Circle({
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        radius: 4,
      }),
      text: new Text({
        text: "终点",
        overflow: true,
        fill: new Fill({
          color: "#ffffff",
        }),
        font: "20px sans-serif",
      }),
    });
  },
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        var distance = 10;
        var bearing = 90;
        var options = { units: "miles" };

        this.result = turf.destination(
          this.turfObj1,
          distance,
          bearing,
          options
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
      <a-row>
        距离：<a-input-number type="number" v-model="length" />经度：<input
          type="number"
          v-model="angle"
      /></a-row>
      <a-row> 单位：<length-units :value.sync="units"></length-units></a-row>
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="startStyle" @ready="handleReadyDrawLayer">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="Point"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector :style-obj="endStyle">
      <vue2ol-source-vector>
        <vue2ol-feature v-if="endPoint">
          <vue2ol-geom-point :coordinates="endPoint"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
import * as turf from "@turf/turf";
import { Style, Circle, Stroke, Fill, Text } from "ol/style";
export default {
  data() {
    return {
      geometry: null,
      endPoint: null,
      length: 10,
      angle: 90,
      units: "kilometers",
      result: null,
      visible: true,
      drawLayer: null,
      startStyle: null,
      endStyle: null,
    };
  },
  mounted() {
    this.startStyle = new Style({
      image: new Circle({
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        radius: 4,
      }),
      text: new Text({
        text: "起点",
        overflow: true,
        fill: new Fill({
          color: "#ffffff",
        }),
        font: "20px sans-serif",
      }),
    });
    this.endStyle = new Style({
      image: new Circle({
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        radius: 4,
      }),
      text: new Text({
        text: "终点",
        overflow: true,
        fill: new Fill({
          color: "#ffffff",
        }),
        font: "20px sans-serif",
      }),
    });
  },
  watch: {
    geometry() {
      this.init();
    },
    length() {
      this.init();
    },
    units() {
      this.init();
    },
    angle() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let options = { units: '${this.units}' };
let point = turf.point(${JSON.stringify(this.geometry.getCoordinates())});
let result = turf.destination(point, ${this.length}, ${this.angle},options);`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.drawLayer.getSource().clear();
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      let options = { units: this.units };
      let point = turf.point(this.geometry.getCoordinates());
      this.result = turf.destination(point, this.length, this.angle, options);

      this.endPoint = this.result.geometry.coordinates;
    },
    handleReadyDrawLayer(mapObject) {
      this.drawLayer = mapObject;
    },
  },
};
</script>
```

:::
