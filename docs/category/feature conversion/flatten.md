# 减少嵌套层级(flatten)

```
> npm install @turf/flatten
```

> Flattens any GeoJSON to a FeatureCollection inspired by geojson-flatten.
> 接收一个 type 为 MultiPoint、MultiLineString、MultiPolygon的要素，返回 type 为 Point、LineString、Polygon 的要素集(FeatureCollection)

**参数**

| 参数    | 类型    | 描述         |
| :------ | :------ | :----------- |
| geojson | GeoJSON | Multi*的要素 |

**返回**

FeatureCollection - all Multi-Geometries are flattened into single Features

FeatureCollection - 摊平的要素集

**示例**

```js
var multiGeometry = turf.multiPolygon([
  [
    [
      [102.0, 2.0],
      [103.0, 2.0],
      [103.0, 3.0],
      [102.0, 3.0],
      [102.0, 2.0]
    ]
  ],
  [
    [
      [100.0, 0.0],
      [101.0, 0.0],
      [101.0, 1.0],
      [100.0, 1.0],
      [100.0, 0.0]
    ],
    [
      [100.2, 0.2],
      [100.8, 0.2],
      [100.8, 0.8],
      [100.2, 0.8],
      [100.2, 0.2]
    ]
  ]
]); // type 为 MultiPolygon

var flatten = turf.flatten(multiGeometry); // type 为 Polygon 的多个要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/flatten.245d8a48.webp)


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
          ></geojson-text></a-space
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
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
import { getTestOL, getTestTurf, getTestFeatures } from "../../utils/index.js";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      result: null,
      visible: true,
      type1: "MultiPolygon",
      styleRed,
      turfObj1: null,
      features1: [],
      features: [],
    };
  },
  computed: {
    code() {
      return `let value = turf.flatten(${JSON.stringify(this.turfObj1)});`;
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
        this.result = null;
        this.features = [];

        this.result = turf.flatten(this.turfObj1);
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