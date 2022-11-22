# 计算交集(intersect)

```
> npm install @turf/intersect
```

> Takes two polygons and finds their intersection. If they share a border, returns the border; if they don't intersect, returns undefined.
>
> 接收两个 type 为 polygon 的多边形找到他们的交集，如果共享边界则返回边界，如果不相交则返回 null

**参数**

| 参数  | 类型                | 描述 |
| :---- | :------------------ | :--- |
| poly1 | `Feature <Polygon>` | 面1  |
| poly2 | `Feature <Polygon>` | 面2  |

**返回**

(Feature|null) - returns a feature representing the point(s) they share (in case of a Point or MultiPoint ), the borders they share (in case of a LineString or a MultiLineString ), the area they share (in case of Polygon or MultiPolygon ). If they do not share any point, returns null.

(Feature|null) - 没有交集或接收不是 type 为 polygon 的多边形都会返回 null

**示例**

```js
var poly1 = turf.polygon([
  [
    [-122.801742, 45.48565],
    [-122.801742, 45.60491],
    [-122.584762, 45.60491],
    [-122.584762, 45.48565],
    [-122.801742, 45.48565]
  ]
]);

var poly2 = turf.polygon([
  [
    [-122.520217, 45.535693],
    [-122.64038, 45.553967],
    [-122.720031, 45.526554],
    [-122.669906, 45.507309],
    [-122.723464, 45.446643],
    [-122.532577, 45.408574],
    [-122.487258, 45.477466],
    [-122.520217, 45.535693]
  ]
]);

var intersection = turf.intersect(poly1, poly2);
/*
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-122.584762, 45.545508794628965],
        [-122.584762, 45.48565],
        [-122.68902729894835, 45.48565],
        [-122.669906, 45.507309],
        [-122.720031, 45.526554],
        [-122.64038, 45.553967],
        [-122.584762, 45.545508794628965]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/intersect.fcad2571.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates1"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates2"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature :style-obj="differenceStyle">
          <vue2ol-geom-polygon
            :coordinates="differenceCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates1: [
        [
          [119.72452640533449, 27.981138706207275],
          [119.79044437408449, 28.0978684425354],
          [119.89481449127199, 28.1857590675354],
          [120.06235599517824, 28.06765604019165],
          [120.16397953033449, 27.871275424957275],
          [119.94287967681886, 27.9715256690979],
          [119.72452640533449, 27.981138706207275],
        ],
      ],
      coordinates2: [
        [
          [120.03901004791261, 28.166897773742676],
          [119.93189334869386, 27.99523639678955],
          [119.92502689361574, 27.826321601867676],
          [120.18183231353761, 27.807095527648926],
          [120.19968509674074, 27.95678424835205],
          [120.13651371002199, 28.07214069366455],
          [120.03901004791261, 28.166897773742676],
        ],
      ],

      differenceCoordinates: null,
      differenceStyle: null,
    };
  },
  mounted() {
    this.differenceCoordinates = turf.intersect(
      turf.polygon(this.coordinates1),
      turf.polygon(this.coordinates2)
    ).geometry.coordinates;

    this.differenceStyle = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#f00",
      }),
      fill: new Fill({
        color: "rgba(255,0,0,0.3)",
      }),
    });
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
    <input type="button" value="面1" @click="handlePolygon1" />
    <input type="button" value="面2" @click="handlePolygon2" />
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource1">
        <vue2ol-interaction-draw
          type="Polygon"
          :active="isDrawPolygon1"
          @drawend="handleDrawEndPolygon1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource2">
        <vue2ol-interaction-draw
          type="Polygon"
          :active="isDrawPolygon2"
          @drawend="handleDrawEndPolygon2"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature
          :style-obj="differenceStyle"
          v-if="differenceGeometry"
          :geometry="differenceGeometry"
        >
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
      isDrawPolygon2: false,
      isDrawPolygon1: false,
      polygon1: null,
      polygon2: null,
      differenceGeometry: null,
      source1: null,
      source2: null,
      differenceStyle: null,
    };
  },
  watch: {
    polygon1() {
      this.init();
    },
    polygon2() {
      this.init();
    },
  },
  mounted() {
    this.differenceStyle = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#f00",
      }),
      fill: new Fill({
        color: "rgba(255,0,0,0.3)",
      }),
    });
  },
  methods: {
    init() {
      if (!this.polygon1 || !this.polygon2) {
        return;
      }
      this.differenceGeometry = new GeoJSON()
        .readFeature(
          JSON.stringify(
            turf.intersect(
              turf.polygon(this.polygon1.getCoordinates()),
              turf.polygon(this.polygon2.getCoordinates())
            )
          )
        )
        .getGeometry();
    },
    handlePolygon1() {
      this.isDrawPolygon1 = !this.isDrawPolygon1;
      this.isDrawPolygon2 = false;
    },
    handlePolygon2() {
      this.isDrawPolygon2 = !this.isDrawPolygon2;
      this.isDrawPolygon1 = false;
    },
    handleDrawEndPolygon1(e) {
      this.source1.clear();
      this.polygon1 = e.feature.getGeometry();
    },
    handleDrawEndPolygon2(e) {
      this.source2.clear();
      this.polygon2 = e.feature.getGeometry();
    },
    handleReadySource1(mapObject) {
      this.source1 = mapObject;
    },
    handleReadySource2(mapObject) {
      this.source2 = mapObject;
    },
  },
};
</script>
```

:::
