# 计算两点中心点(midpoint)

```
> npm install @turf/midpoint
```

> Takes two points and returns a point midway between them. The midpoint is calculated geodesically, meaning the curvature of the earth is taken into account.
>
> 接收两个点，通过地球的[曲率 (opens new window)](https://baike.baidu.com/item/曲率/9985286?fr=aladdin)计算并返回中点。

**参数**

| 参数   | 类型                            | 描述     |
| :----- | :------------------------------ | :------- |
| point1 | [Coor](../other/type.html#coor) | 第一个点 |
| point2 | [Coor](../other/type.html#coor) | 第二个点 |

**返回**

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - a point midway between pt1 and pt2

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - 中点

**示例**

```js
var point1 = turf.point([144.834823, -37.771257]);
var point2 = turf.point([145.14244, -37.830937]);

var midpoint = turf.midpoint(point1, point2);
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [144.98856936202512, -37.801196981553204]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/midpoint.c2f5c5cb.webp)

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
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature :style-obj="startStyle">
          <vue2ol-geom-point
            :coordinates="startCoordinates"
          ></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature :style-obj="endStyle">
          <vue2ol-geom-point :coordinates="endCoordinates"></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="midPoint"></vue2ol-geom-point>
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
      startCoordinates: [119.76160526275636, 27.91434097290039],
      endCoordinates: [120.11316776275636, 28.11209487915039],
      startStyle: null,
      endStyle: null,
      midPoint: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.midpoint(
  turf.point(${JSON.stringify(this.startCoordinates)}),
  turf.point(${JSON.stringify(this.endCoordinates)})
);`;
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
    this.result = turf.midpoint(
      turf.point(this.startCoordinates),
      turf.point(this.endCoordinates)
    );

    this.midPoint = this.result.geometry.coordinates;
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
        ><a-button type="primary" @click="handleStart">绘制起点</a-button>
        <a-button type="primary" @click="handleEnd">绘制终点</a-button></a-row
      >
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="startStyle">
      <vue2ol-source-vector @ready="handleReadyStartSource">
        <vue2ol-interaction-draw
          type="Point"
          :active="isDrawStart"
          @drawend="handleDrawEndStart"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector :style-obj="endStyle">
      <vue2ol-source-vector @ready="handleReadyEndSource">
        <vue2ol-interaction-draw
          type="Point"
          :active="isDrawEnd"
          @drawend="handleDrawEndEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="midPoint">
          <vue2ol-geom-point :coordinates="midPoint"></vue2ol-geom-point>
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
      isDrawEnd: false,
      isDrawStart: false,
      startStyle: null,
      endStyle: null,
      startGeometry: null,
      endGeometry: null,
      startSource: null,
      endSource: null,
      midPoint: null,
      result: null,
      visible: true,
    };
  },
  watch: {
    startGeometry() {
      this.init();
    },
    endGeometry() {
      this.init();
    },
    units() {
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
  computed: {
    code() {
      if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      return `let result = turf.midpoint(
  turf.point(${JSON.stringify(this.startGeometry.getCoordinates())}),
  turf.point(${JSON.stringify(this.endGeometry.getCoordinates())})
);`;
    },
  },
  methods: {
    init() {
      if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      this.result = turf.midpoint(
        turf.point(this.startGeometry.getCoordinates()),
        turf.point(this.endGeometry.getCoordinates())
      );
      this.midPoint = this.result.geometry.coordinates;
    },
    handleStart() {
      this.isDrawStart = !this.isDrawStart;
      this.isDrawEnd = false;
    },
    handleEnd() {
      this.isDrawEnd = !this.isDrawEnd;
      this.isDrawStart = false;
    },
    handleDrawEndStart(e) {
      this.startSource.clear();
      this.startGeometry = e.feature.getGeometry();
    },
    handleDrawEndEnd(e) {
      this.endSource.clear();
      this.endGeometry = e.feature.getGeometry();
    },
    handleReadyStartSource(mapObject) {
      this.startSource = mapObject;
    },
    handleReadyEndSource(mapObject) {
      this.endSource = mapObject;
    },
  },
};
</script>
```

:::
