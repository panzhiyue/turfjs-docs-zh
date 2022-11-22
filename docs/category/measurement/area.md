# 计算区域面积(area)

```
> npm install @turf/area
```

> Takes one or more features and returns their area in square meters.
> 
> 获取一个或多个`feature`，并返回其面积平方米。

> 值得注意的是，该方法应该是传入 polygon 类型的 GeoJSON，即 Point 点类型和 LineString 线段类型均为 0

**参数**

| 参数    | 类型    | 描述                |
| :------ | :------ | :------------------ |
| geojson | GeoJSON | 一个或多个`feature` |

**返回**

number - area in square meters

number - 面积（平方米）

**示例**

```js
var polygon = turf.polygon([
  [
    [125, -15],
    [113, -22],
    [154, -27],
    [144, -15],
    [125, -15]
  ]
]);

var area = turf.area(polygon); // 3339946239196.927

// 多要素
var area = turf.area({
  type: "FeatureCollection",
  features: [
    turf.polygon([
      [
        [125, -15],
        [113, -22],
        [154, -27],
        [144, -15],
        [125, -15]
      ]
    ]),
    turf.polygon([
      [
        [225, -15],
        [213, -22],
        [254, -27],
        [244, -15],
        [225, -15]
      ]
    ])
  ]
}); // 6679892478393.854
```

**基础用法**
::: demo

```vue
<template>
  <base-map>
    <div>{{ area }}平方米</div>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon :coordinates="coordinates"></vue2ol-geom-polygon>
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
        [
          [119.82697608925122, 28.20411200111616],
          [119.67655860065376, 27.864037679069753],
          [120.06895204916886, 27.71144022686944],
          [120.37414695356948, 27.927256623552736],
          [120.24552910100064, 28.193212183101853],
          [119.82697608925122, 28.20411200111616],
        ],
      ],
      area: null,
    };
  },
  mounted() {
    let value = turf.area(turf.polygon(this.coordinates));
    this.area = value;
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
    <div>{{ area }}平方米</div>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="Polygon"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
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
      area: null,
    };
  },
  mounted() {},
  watch: {
    geometry() {
      this.init();
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      let value = turf.area(turf.polygon(this.geometry.getCoordinates()));
      this.area = value;
    },
  },
};
</script>
```

:::
