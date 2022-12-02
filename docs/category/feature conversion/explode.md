# 拆分多边形为点(explode)

```
> npm install @turf/explode
```

> Takes a feature or set of features and returns all positions as points.
> 获取任意要素(`Feature`)或要素集（`FeatureCollection`），返回所有要素的顶点。

**参数**

| 参数    | 类型    | 描述         |
| :------ | :------ | :----------- |
| geojson | GeoJSON | 要素或要素集 |

**返回**

`FeatureCollection <point>` - points representing the exploded input features

`FeatureCollection <point>` - 所有要素的点集合

**示例**

```js
var polygon = turf.polygon([
  [
    [-81, 41],
    [-88, 36],
    [-84, 31],
    [-80, 33],
    [-77, 39],
    [-81, 41],
  ],
]);

var explode = turf.explode(polygon); // 返回六个顶点的要素集
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/explode.340ada83.webp)

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
      type1: "Polygon",
      styleRed,
      turfObj1: null,
      features1: [],
      features: [],
    };
  },
  computed: {
    code() {
      return `let value = turf.explode(${JSON.stringify(this.turfObj1)});`;
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

        this.result = turf.explode(this.turfObj1);
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
