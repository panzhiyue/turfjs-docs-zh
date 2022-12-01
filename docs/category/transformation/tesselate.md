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
        ><a-space
          >几何：<geojson-text
            :type.sync="type1"
            @change="handleChange"
          ></geojson-text
        ></a-space>
      </a-row>
      <a-row
        ><a-space>源： <input type="checkbox" v-model="origin" /></a-space
      ></a-row>
      <a-row
        ><a-space>三角形： <input type="checkbox" v-model="dest" /></a-space
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector :visible="origin" key="1">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed" :visible="dest" key="2">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
export default {
  data() {
    return {
      features: [],
      origin: true,
      dest: true,
      result: null,
      visible: true,
      type1: "Feature<Polygon>",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      return `let f = ${JSON.stringify(this.turfObj1)};
let result = turf.tesselate(f);`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.tesselate(this.turfObj1);

        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
    handleChange(obj) {
      this.turfObj1 = obj;
      this.features1 = getFeaturesFromTurf(this.turfObj1);
    },
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
