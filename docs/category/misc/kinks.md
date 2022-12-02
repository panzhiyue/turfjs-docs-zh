# 返回相交点(kinks)

```
> npm install @turf/kinks
```

> Takes a linestring , multi-linestring , multi-polygon , or polygon and returns points at all self-intersections.
> 接收一个`LineString`、`MultiLineString`、`Polygon`、`MultiPolygon`的要素，并返回所有自身相交点。

**参数**

| 参数      | 类型                  | 描述            |
| :-------- | :-------------------- | :-------------- | ------------ | ---------- | ---------------- |
| featureIn | `Feature <(LineString | MultiLineString | MultiPolygon | Polygon)>` | 计算自相交的要素 |

**返回**

`FeatureCollection <Point>` - self-intersections

`FeatureCollection <Point>` - 自相交点集合

**示例**

```js
var poly = turf.polygon([
  [
    [-12.034835, 8.901183],
    [-12.060413, 8.899826],
    [-12.03638, 8.873199],
    [-12.059383, 8.871418],
    [-12.034835, 8.901183],
  ],
]);

var kinks = turf.kinks(poly); // 返回要素集
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/kinks.8ed66c95.webp)

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
      <a-row>几何：<geojson-obj :value.sync="turfObj1"></geojson-obj> </a-row>
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      result: null,
      visible: true,
      turfObj1: turf.polygon([
        [
          [119.86391544342042, 28.107288360595703],
          [120.22097110748292, 28.118274688720703],
          [119.82271671295167, 27.858722686767578],
          [120.10012149810792, 27.880695343017578],
          [119.86391544342042, 28.107288360595703],
        ],
      ]),
      features: [],
      styleRed,
    };
  },
  computed: {
    code() {
      return `let result = turf.kinks(${JSON.stringify(this.turfObj1)})`;
    },
    features1() {
      if (this.turfObj1) {
        return getFeaturesFromTurf(this.turfObj1);
      } else {
        return [];
      }
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.kinks(this.turfObj1);

        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
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
        ><select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector @ready="handleReadyDrawLayer">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
export default {
  data() {
    return {
      feature: null,
      features: [],
      type: "LineString",
      result: null,
      visible: true,
      styleRed,
      drawLayer: null,
    };
  },
  watch: {
    feature() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.feature) {
        return;
      }
      return `let result = turf.kinks(${new GeoJSON().writeFeature(
        this.feature
      )})`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.drawLayer.getSource().clear();
      this.feature = e.feature;
    },
    handleReadyDrawLayer(mapObject) {
      this.drawLayer = mapObject;
    },
    init() {
      if (!this.feature) {
        return;
      }
      try {
        this.result = turf.kinks(
          JSON.parse(new GeoJSON().writeFeature(this.feature))
        );
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
};
</script>
```

:::
