# 计算点到多段线的最短距离(pointToLineDistance)

> Returns the minimum distance between a Point and a LineString , being the distance from a line the minimum distance between the point and any segment of the LineString.
>
> 返回点与`LineString`之间的最小距离，即到直线的距离，即点与`LineString`任意线段之间的最小距离。

```text
> npm install @turf/point-to-line-distance
```

**参数**

| 参数    | 类型                   | 描述                           |
| :------ | :--------------------- | :----------------------------- |
| pt      | Coord                  | Feature or Geometry            |
| line    | Feature `<LineString>` | GeoJSON Feature or Geometry    |
| options | Object                 | Optional parameters: see below |

**options 选项**

| 属性     | 类型    | 默认值     | 描述                                                  |
| :------- | :------ | :--------- | :---------------------------------------------------- |
| units    | string  | kilometers | can be degrees, radians, miles, or kilometers         |
| mercator | boolean | false      | if distance should be on Mercator or WGS84 projection |

**返回**

number - distance between point and line

**示例**

```js
var pt = turf.point([0, 0]);
var line = turf.lineString([
  [1, 1],
  [-1, 1],
]);

var distance = turf.pointToLineDistance(pt, line, { units: "miles" });
//=69.11854715938406
```

**基础用法**
::: demo

```vue
<template>
  <base-map>
    {{ value }}
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="coordinates2"></vue2ol-geom-point>
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
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      coordinates2: [120.32465457916261, 28.229897499084473],
      value: null,
    };
  },
  mounted() {
    this.value = turf.pointToLineDistance(
      turf.point(this.coordinates2),
      turf.lineString(this.coordinates),
      { units: "miles" }
    );
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
    单位：<length-units :value.sync="units"></length-units>

    <input type="button" value="点" @click="handlePoint" />
    <input type="button" value="线" @click="handleLine" />
    {{ value }}
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadyPointSource">
        <vue2ol-interaction-draw
          type="Point"
          :active="isDrawPoint"
          @drawend="handleDrawEndPoint"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadyLineSource">
        <vue2ol-interaction-draw
          type="LineString"
          :active="isDrawLine"
          @drawend="handleDrawEndLine"
        ></vue2ol-interaction-draw>
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
      isDrawLine: false,
      isDrawPoint: false,
      value: null,
      pointGeometry: null,
      lineGeometry: null,
      pointSource: null,
      lineSource: null,
      units: "kilometers",
    };
  },
  watch: {
    pointGeometry() {
      this.init();
    },
    lineGeometry() {
      this.init();
    },
    units() {
      this.init();
    },
  },
  mounted() {},
  methods: {
    init() {
      if (!this.pointGeometry || !this.lineGeometry) {
        return;
      }
      console.log(this.lineGeometry.getCoordinates(),this.pointGeometry.getCoordinates());
      var options = { units: this.units };
      this.value = turf.pointToLineDistance(
        turf.point(this.pointGeometry.getCoordinates()),
        turf.lineString(this.lineGeometry.getCoordinates()),
        options
      );
    },
    handlePoint() {
      this.isDrawPoint = !this.isDrawPoint;
      this.isDrawLine = false;
    },
    handleLine() {
      this.isDrawLine = !this.isDrawLine;
      this.isDrawPoint = false;
    },
    handleDrawEndPoint(e) {
      this.pointSource.clear();
      this.pointGeometry = e.feature.getGeometry();
    },
    handleDrawEndLine(e) {
      this.lineSource.clear();
      this.lineGeometry = e.feature.getGeometry();
    },
    handleReadyPointSource(mapObject) {
      this.pointSource = mapObject;
    },
    handleReadyLineSource(mapObject) {
      this.lineSource = mapObject;
    },
  },
};
</script>
```

:::
