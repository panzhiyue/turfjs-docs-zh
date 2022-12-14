# 联合(union)

```
> npm install @turf/union
```

> Takes two or more polygons and returns a combined polygon. If the input polygons are not contiguous, this function returns a MultiPolygon feature.
>
> 获取两个或多个多边形，并返回一个组合多边形。如果输入的多边形不是连续的，这个函数将返回一个`MultiPolygon`。

**参数**

| 参数 | 类型                   | 描述             |
| :--- | :--------------------- | :--------------- |
| A    | ...`Feature <Polygon>` | 需要合并的面要素 |

**返回**

`Feature <(Polygon|MultiPolygon)>` - a combined Polygon or MultiPolygon feature

`Feature <(Polygon|MultiPolygon)>` - 组合多边形或多多边形

**示例**

```js
var poly1 = turf.polygon(
  [
    [
      [-82.574787, 35.594087],
      [-82.574787, 35.615581],
      [-82.545261, 35.615581],
      [-82.545261, 35.594087],
      [-82.574787, 35.594087],
    ],
  ],
  { fill: "#0f0" }
);
var poly2 = turf.polygon(
  [
    [
      [-82.560024, 35.585153],
      [-82.560024, 35.602602],
      [-82.52964, 35.602602],
      [-82.52964, 35.585153],
      [-82.560024, 35.585153],
    ],
  ],
  { fill: "#00f" }
);

var union = turf.union(poly1, poly2);
/*
{
  type: "Feature",
  geometry: {
    type: "polygon",
    coordinates: [
      [
        [-82.574787, 35.594087],
        [-82.574787, 35.615581],
        [-82.545261, 35.615581],
        [-82.545261, 35.602602],
        [-82.52964, 35.602602],
        [-82.52964, 35.585153],
        [-82.560024, 35.585153],
        [-82.560024, 35.594087],
        [-82.574787, 35.594087]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/union.f2707727.webp)

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
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
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
        <vue2ol-feature :style-obj="unionStyle">
          <vue2ol-geom-polygon
            :coordinates="unionCoordinates"
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

      unionCoordinates: null,
      unionStyle: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.union(
  turf.polygon(${JSON.stringify(this.coordinates1)}),
  turf.polygon(${JSON.stringify(this.coordinates2)})
);`;
    },
  },
  mounted() {
    this.result = turf.union(
      turf.polygon(this.coordinates1),
      turf.polygon(this.coordinates2)
    );
    this.unionCoordinates = this.result.geometry.coordinates;

    this.unionStyle = new Style({
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
        <a-button type="primary" @click="handlePolygon1">面1</a-button>
        <a-button type="primary" @click="handlePolygon2">面2</a-button></a-row
      >
      <a-row> <json :data="result"></json> </a-row>
    </drawer>

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
          :style-obj="unionStyle"
          v-if="unionGeometry"
          :geometry="unionGeometry"
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
      unionGeometry: null,
      source1: null,
      source2: null,
      unionStyle: null,
      result: null,
      visible: true,
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
    this.unionStyle = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#f00",
      }),
      fill: new Fill({
        color: "rgba(255,0,0,0.3)",
      }),
    });
  },
  computed: {
    code() {
      if (!this.polygon1 || !this.polygon2) {
        return;
      }
      return `let result = turf.union(
  turf.polygon(${JSON.stringify(this.polygon1.getCoordinates())}),
  turf.polygon(${JSON.stringify(this.polygon2.getCoordinates())})
);`;
    },
  },
  methods: {
    init() {
      if (!this.polygon1 || !this.polygon2) {
        return;
      }
      this.result = turf.union(
        turf.polygon(this.polygon1.getCoordinates()),
        turf.polygon(this.polygon2.getCoordinates())
      );
      this.unionGeometry = new GeoJSON()
        .readFeature(JSON.stringify(this.result))
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
