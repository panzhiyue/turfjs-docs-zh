# 根据点、距离和角度计算目标点(rhumbDestination)

```
> npm install @turf/rhumb-destination
```



> Returns the destination Point having travelled the given distance along a Rhumb line from the origin Point with the (varant) given bearing.
>
> 获取以入参的点为参照物，通过指定单位的距离计算出沿[恒向线 (opens new window)](https://baike.baidu.com/item/恒向线/61737?fr=aladdin) 的目标点的位置

**参数**

| 参数     | 类型           | 描述                            |
| :------- | :------------- | :------------------------------ |
| origin   | Coord\|GeoJSON | 参与计算的点                    |
| distance | number         | 参与计算的线段                  |
| bearing  | number         | 与正北的角度，范围从-180到180度 |
| options  | Object         | 可配置项                        |

**options 选项**

| 属性       | 类型   | 默认值     | 描述                                               |
| :--------- | :----- | :--------- | :------------------------------------------------- |
| units      | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| properties | Object | {}         | 输出GeoJSON的properties 属性                       |

**返回**

`Feature <Point>` - Destination point。

`Feature <Point>` - 目标点

**示例**

```js
var pt = turf.point([-75.343, 39.984], { "marker-color": "F00" });
var distance = 50;
var bearing = 90;
var options = { units: "miles" };

var destination = turf.rhumbDestination(pt, distance, bearing, options);
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-74.3985529486182, 39.984]
  },
  properties: {}
}
*/
```

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :style-obj="startStyle">
          <vue2ol-geom-point :coordinates="startPoint"></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature v-if="endPoint" :style-obj="endStyle">
          <vue2ol-geom-point :coordinates="endPoint"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Circle, Stroke, Fill, Text } from "ol/style";
export default {
  data() {
    return {
      startPoint: [119.80829715728761, 28.102567672729492],
      endPoint: null,
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

    var point = turf.point(this.startPoint);
    var distance = 10;
    var bearing = 90;
    var options = { units: "miles" };

    var value = turf.rhumbDestination(point, distance, bearing, options);

    this.endPoint = value.geometry.coordinates;
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
    距离：<input type="number" v-model="length" />经度：<input
      type="number"
      v-model="angle"
    />
    单位：<length-units :value.sync="units"></length-units>
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadDrawSource">
        <vue2ol-interaction-draw
          :active="true"
          type="Point"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
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
export default {
  data() {
    return {
      geometry: null,
      endPoint: null,
      length: 10,
      angle: 90,
      units: "kilometers",
      source: null,
    };
  },
  mounted() {},
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
  methods: {
    handleDrawEnd(e) {
      this.source.clear();
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      let options = { units: this.units };
      let point = turf.point(this.geometry.getCoordinates());
      var value = turf.rhumbDestination(
        point,
        this.length,
        this.angle,
        options
      );

      this.endPoint = value.geometry.coordinates;
    },
    handleReadDrawSource(mapObject) {
      this.source = mapObject;
    },
  },
};
</script>
```

:::
