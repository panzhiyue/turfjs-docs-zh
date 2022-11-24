# 多边形划分三角形(tesselate)

```
> npm install @turf/tesselate
```

> Tesselates a Feature into a FeatureCollection of triangles using earcut.
>
> 使用 [earcut (opens new window)](https://www.npmjs.com/package/earcut)算法将`Feature`细分为三角形`FeatureCollection`。

**参数**

| 参数 | 类型                | 描述                   |
| :--- | :------------------ | :--------------------- |
| poly | `Feature <Polygon>` | type 为 polygon 的要素 |

**返回**

`FeatureCollection <Polygon>` - a geometrycollection feature

`FeatureCollection <Polygon>` - 三角形要素集合

**示例**

```js
var poly = turf.polygon([
  [
    [11, 0],
    [22, 4],
    [31, 0],
    [31, 11],
    [21, 15],
    [11, 11],
    [11, 0],
  ],
]);
var triangles = turf.tesselate(poly); // 裁剪成四个三角形要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tesselate.bdcde9ba.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map :center="[-70.603637, -33.399918]">
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
        ><a-space>源： <input type="checkbox" v-model="origin" /></a-space
      ></a-row>
      <a-row
        ><a-space>三角形： <input type="checkbox" v-model="dest" /></a-space
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector :visible="origin" key="1">
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon :coordinates="coordinates"></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="style" :visible="dest" key="2">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke } from "ol/style";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      coordinates: [
        [
          [-70.603637, -33.399918],
          [-70.614624, -33.395332],
          [-70.639343, -33.392466],
          [-70.659942, -33.394759],
          [-70.683975, -33.404504],
          [-70.697021, -33.419406],
          [-70.701141, -33.434306],
          [-70.700454, -33.446339],
          [-70.694274, -33.458369],
          [-70.682601, -33.465816],
          [-70.668869, -33.472117],
          [-70.646209, -33.473835],
          [-70.624923, -33.472117],
          [-70.609817, -33.468107],
          [-70.595397, -33.458369],
          [-70.587158, -33.442901],
          [-70.587158, -33.426283],
          [-70.590591, -33.414248],
          [-70.594711, -33.406224],
          [-70.603637, -33.399918],
        ],
      ],
      features: [],
      style: null,
      origin: true,
      dest: true,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let polygon = turf.polygon(${JSON.stringify(this.coordinates)});
let result = turf.tesselate(polygon);`;
    },
  },
  mounted() {
    this.result = turf.tesselate(turf.polygon(this.coordinates));

    this.features = new GeoJSON().readFeatures(JSON.stringify(this.result));
    this.style = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
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
      <a-row
        ><a-space>源： <input type="checkbox" v-model="origin" /></a-space
      ></a-row>
      <a-row
        ><a-space>三角形： <input type="checkbox" v-model="dest" /></a-space
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector :visible="origin" key="1">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="Polygon"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="style" :visible="dest" key="2">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke } from "ol/style";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      geometry: null,
      features: [],
      style: null,
      origin: true,
      dest: true,
      result: null,
      visible: true,
    };
  },
  mounted() {
    this.style = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
      }),
    });
  },
  watch: {
    geometry() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let polygon = turf.polygon(${JSON.stringify(
        this.geometry.getCoordinates()
      )});
let result = turf.tesselate(polygon);`;
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

      this.result = turf.tesselate(
        turf.polygon(this.geometry.getCoordinates())
      );

      this.features = new GeoJSON().readFeatures(JSON.stringify(this.result));
      this.style = new Style({
        stroke: new Stroke({
          width: 2,
          color: "#ff0000",
        }),
      });
    },
  },
};
</script>
```

:::
