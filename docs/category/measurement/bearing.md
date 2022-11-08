# 计算两点间角度(bearing)

> Takes two points and finds the geographic bearing between them, i.e. the angle measured in degrees from the north line (0 degrees)
> 
> 获取两个点，找出它们之间的地理方位，即从正北算起的角度(0 度)

**参数**

| 参数    | 类型   | 描述                           |
| :------ | :----- | :----------------------------- |
| start   | Coord  | starting Point                 |
| end     | Coord  | ending Point                   |
| options | Object | Optional parameters: see below |

**options 选项**

| 属性  | 类型    | 默认值 | 描述                                 |
| :---- | :------ | :----- | :----------------------------------- |
| final | boolean | false  | calculates the final bearing if true |

**返回**

number - bearing in decimal degrees, between -180 and 180 degrees (positive clockwise)

**示例**

```js
var point1 = turf.point([109.104262, 37.831315]);
var point2 = turf.point([102.865569, 34.089941]);

var bearing = turf.bearing(point1, point2);
```

```
npm install @turf/bearing
```

![image-20221108114651670](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221108114651670.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    {{ value }}
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
    {{ value }}
    <input type="button" value="起点" @click="handleStart" />
    <input type="button" value="终点" @click="handleEnd" />
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
        turf.point(this.endGeometry.getCoordinates())
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
