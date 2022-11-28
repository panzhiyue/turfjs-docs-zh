# 计算两点间距离(distance)

```
> npm install @turf/distance
```

> Calculates the distance between two points in degrees, radians, miles, or kilometers. This uses the Haversine formula to account for global curvature.
>
> 以度、弧度、英里或公里为单位计算两点之间的距离。

**参数**

| 参数    | 类型                              | 描述     |
| :------ | :-------------------------------- | :------- |
| from    | [Point](../other/type.html#point) | 起始点   |
| to      | [Point](../other/type.html#point) | 目标点   |
| options | Object                            | 可配置项 |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |

**返回**

number - distance between the two points

number - 两点的距离

**示例**

```js
var from = turf.point([-75.343, 39.984]);
var to = turf.point([-75.534, 39.123]);
var options = { units: "miles" };

var distance = turf.distance(from, to, options); // 60.35329997171415
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
        <vue2ol-feature :style-obj="startStyle">
          <vue2ol-geom-point
            :coordinates="startCoordinates"
          ></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature :style-obj="endStyle">
          <vue2ol-geom-point :coordinates="endCoordinates"></vue2ol-geom-point>
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
      result: null,
      startStyle: null,
      endStyle: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `var options = { units: "miles" };
let result = turf.distance(
  turf.point(${JSON.stringify(this.startCoordinates)}),
  turf.point(${JSON.stringify(this.endCoordinates)}),
  options
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
    var options = { units: "miles" };
    this.result = turf.distance(
      turf.point(this.startCoordinates),
      turf.point(this.endCoordinates),
      options
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
        ><a-button type="primary" @click="handleStart">绘制起点</a-button>
        <a-button type="primary" @click="handleEnd">绘制终点</a-button></a-row
      >
      <a-row> 单位：<length-units :value.sync="units"></length-units></a-row>
      <a-row> {{ result }}</a-row>
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
      result: null,
      startStyle: null,
      endStyle: null,
      startGeometry: null,
      endGeometry: null,
      startSource: null,
      endSource: null,
      units: "kilometers",
      visible:true
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
  computed:{
    code(){
       if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      return ` var options = { units: '${this.units}' };
let result = turf.distance(
  turf.point(${JSON.stringify(this.startGeometry.getCoordinates())}),
  turf.point(${JSON.stringify(this.endGeometry.getCoordinates())}),
  options
);`
    }
  },
  methods: {
    init() {
      if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      var options = { units: this.units };
      this.result = turf.distance(
        turf.point(this.startGeometry.getCoordinates()),
        turf.point(this.endGeometry.getCoordinates()),
        options
      );
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
