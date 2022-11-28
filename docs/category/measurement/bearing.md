# 计算两点间角度(bearing)

```
> npm install @turf/bearing
```

> Takes two points and finds the geographic bearing between them, i.e. the angle measured in degrees from the north line (0 degrees)
>
> 接收两个点类型的 GeoJSON，计算获取二者之间的地理方位，并与正北方向所形成的角度(0 度)

> 即以起始点为参照物，终止点的偏移角度

**参数**

| 参数    | 类型                            | 描述                     |
| :------ | :------------------------------ | :----------------------- |
| start   | [Coor](../other/type.html#coor) | 起始点，即作为参照物的点 |
| end     | [Coor](../other/type.html#coor) | 终止点，即要对比计算的点 |
| options | Object                          | 可配置项                 |

**options 选项**

| 属性  | 类型    | 默认值 | 描述                                                   |
| :---- | :------ | :----- | :----------------------------------------------------- |
| final | boolean | false  | 为 true 只计算最终轴承，即返回的数值介于 0 至 360 之间 |

**返回**

number - bearing in decimal degrees, between -180 and 180 degrees (positive clockwise)

number - 如果 final 为 false,返回的数值介于 -180 至 180 之间，顺时针为正值,否则返回的数值介于 0 至 360 之间

**示例**

```js
var point1 = turf.point([-75.343, 39.984]);
var point2 = turf.point([-75.534, 39.123]);

var bearing = turf.bearing(point1, point2); // -170.2330491349224
var bearing = turf.bearing(point1, point2, { final: true }); // 189.6453188611693

// 也可以用经纬度坐标
var bearing = turf.bearing([-75.343, 39.984], [-75.534, 39.123]); // -170.2330491349224
```

![image-20221108114651670](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221108114651670.webp)

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
      <a-row> {{ value }}</a-row>
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
      value: null,
      startStyle: null,
      endStyle: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.bearing(
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
    this.value = turf.bearing(
      turf.point(this.startCoordinates),
      turf.point(this.endCoordinates)
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
        ><a-button type="primary" @click="handleStart"
          >绘制起点</a-button
        ></a-row
      >
      <a-row
        ><a-button type="primary" @click="handleEnd">绘制终点</a-button></a-row
      >
      <a-row> {{ value }}</a-row>
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
      value: null,
      startStyle: null,
      endStyle: null,
      startGeometry: null,
      endGeometry: null,
      startSource: null,
      endSource: null,
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
  },
  computed: {
    code() {
      if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      return `let result = turf.bearing(
  turf.point(${JSON.stringify(this.startGeometry.getCoordinates())}),
  turf.point(${JSON.stringify(this.endGeometry.getCoordinates())}),
  { final: true }
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
  },
  methods: {
    init() {
      if (!this.startGeometry || !this.endGeometry) {
        return;
      }
      this.value = turf.bearing(
        turf.point(this.startGeometry.getCoordinates()),
        turf.point(this.endGeometry.getCoordinates()),
        { final: true }
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
      console.log(mapObject);
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
