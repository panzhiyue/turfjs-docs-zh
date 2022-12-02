# 返回遮罩多边形(mask)

```
> npm install @turf/mask
```

> Takes any type of polygon and an optional mask and returns a polygon exterior ring with holes.
> 接收一个 type 为 polygon 或 MultiPolygon 的面要素，作为内圈。返回一个挖孔的面要素作为遮罩

**参数**

| 参数    | 类型                | 描述                                           |
| :------ | :------------------ | :--------------------------------------------- | -------------- | -------------------- |
| polygon | `FeatureCollection  | Feature<Polygon                                | MultiPolygon>` | 面要素，作为遮罩内圈 |
| mask    | `Feature <Polygon>` | 可选项，作为遮罩外圈，不传则以世界范围作为外圈 |

**返回**

`Feature <Polygon>` - Masked Polygon (exterior ring with holes).

`Feature <Polygon>` - 蒙版多边形（带孔的外环）。

**示例**

```js
var polygon = turf.polygon([
  [
    [112, -21],
    [116, -36],
    [146, -39],
    [153, -24],
    [133, -10],
    [112, -21],
  ],
]);
var mask = turf.polygon([
  [
    [90, -55],
    [170, -55],
    [170, 10],
    [90, 10],
    [90, -55],
  ],
]);

var masked = turf.mask(polygon, mask);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/mask.61ef78d5.webp)

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
      type1: "Feature<Polygon>",
      styleRed,
      turfObj1: null,
      features1: [],
      features: [],
    };
  },
  computed: {
    code() {
      return `let value = turf.mask(${JSON.stringify(this.turfObj1)});`;
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
        console.log(this.turfObj1);
        this.result = turf.mask(this.turfObj1);
        console.log(2);
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
      <a-row>
        几何:<draw :type.sync="type1" @draw-end="handleDrawEnd1"></draw>
      </a-row>
      <a-row>
        mask几何:<draw :type.sync="type2" @draw-end="handleDrawEnd2"></draw>
      </a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="styleRed" key="2">
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
      type1: "",
      type2: "",
      features: [],
      feature1: null,
      feature2: null,

      result: null,
      visible: true,
      styleRed,
    };
  },
  mounted() {},
  watch: {
    feature1() {
      this.init();
    },
    feature2() {
      this.init();
    },
    type1() {
      if (this.type1) {
        this.type2 = "";
      }
    },
    type2() {
      if (this.type2) {
        this.type1 = "";
      }
    },
  },
  computed: {
    code() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }
      return `let result = turf.mask(${JSON.stringify(
        this.turfObj1
      )},${JSON.stringify(this.turfObj2)});`;
    },
    turfObj1() {
      if (this.feature1) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature1));
      }
    },
    turfObj2() {
      if (this.feature2) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature2));
      }
    },
  },
  methods: {
    handleDrawEnd1(feature) {
      this.feature1 = feature;
    },
    handleDrawEnd2(feature) {
      this.feature2 = feature;
    },
    init() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }

      try {
        this.features = [];
        this.result = null;
        this.result = turf.mask(this.turfObj1, this.turfObj2);

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
