# 计算点到多段线的最短距离(pointToLineDistance)

```
> npm install @turf/point-to-line-distance
```

> Returns the minimum distance between a Point and a LineString , being the distance from a line the minimum distance between the point and any segment of the LineString.
>
> 接收一个点和一条线段，获取二者之间的最小距离

**参数**

| 参数    | 类型                                                         | 描述           |
| :------ | :----------------------------------------------------------- | :------------- |
| pt      | [Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\>\|Array | 参与计算的点   |
| line    | [Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\> | 参与计算的线段 |
| options | Object                                                       | 可配置项       |

**options 选项**

| 属性     | 类型    | 默认值     | 描述                                               |
| :------- | :------ | :--------- | :------------------------------------------------- |
| units    | string  | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| mercator | boolean | false      | 是否要以墨卡托投影计算                             |

**返回**

number - distance between point and line

number - 点到线的距离

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
      <a-row> {{ result }}</a-row>
    </drawer>
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
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.pointToLineDistance(
  turf.point(${JSON.stringify(this.coordinates2)}),
  turf.lineString(${JSON.stringify(this.coordinates)}),
  { units: "miles" }
);`;
    },
  },
  mounted() {
    this.result = turf.pointToLineDistance(
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
        ><a-button type="primary" @click="handlePoint">点</a-button
        ><a-button type="primary" @click="handleLine">线</a-button></a-row
      >
      <a-row> 单位：<length-units :value.sync="units"></length-units></a-row>
      <a-row> {{result}}</a-row>
    </drawer>

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
      result: null,
      visible: true,
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
  computed: {
    code() {
      if (!this.pointGeometry || !this.lineGeometry) {
        return;
      }
      return `var options = { units: '${this.units}'' };
let result = turf.pointToLineDistance(
  turf.point(${JSON.stringify(this.pointGeometry.getCoordinates())}),
  turf.lineString(${JSON.stringify(this.lineGeometry.getCoordinates())}),
  options
);`;
    },
  },
  methods: {
    init() {
      if (!this.pointGeometry || !this.lineGeometry) {
        return;
      }
      var options = { units: this.units };
      this.result = turf.pointToLineDistance(
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
