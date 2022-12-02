# 根据 Feature 分割线段(lineSplit)

```
> npm install @turf/line-split
```

> Split a LineString by another GeoJSON Feature.
> 接收一个线要素(LineString),一个用于裁切的任意要素,计算并返回裁切后的线要素集

**参数**

| 参数     | 类型                   | 描述               |
| :------- | :--------------------- | :----------------- |
| line     | `Feature <LineString>` | 需要裁切的线要素   |
| splitter | Feature                | 充当切分工具的要素 |

**返回**

`FeatureCollection <LineString>` - Split LineStrings

`FeatureCollection <LineString>` - 拆分后的线段集合

**示例**

```js
var line = turf.lineString([
  [120, -25],
  [145, -25],
]);
var splitter = turf.lineString([
  [130, -15],
  [130, -35],
]);

var split = turf.lineSplit(line, splitter); // 两个线要素的要素集
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSplit.e8ae4463.webp)

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
      <a-row>线几何：<geojson-obj :value.sync="turfObj1"></geojson-obj> </a-row>
      <a-row>几何2：<geojson-obj :value.sync="turfObj2"></geojson-obj> </a-row>

      <a-row> <json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector key="1">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRandom" key="2">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRandom } from "../../utils/index.js";
export default {
  data() {
    return {
      features: [],
      result: null,
      visible: true,
      styleRandom,
      turfObj1: turf.lineString([
        [119.94219303131105, 27.934446811676025],
        [120.1646661758423, 27.948179721832275],
      ]),
      turfObj2: turf.lineString([
        [119.94219303131105, 27.834446811676025],
        [120.1646661758423, 28.098179721832275],
      ]),
    };
  },
  computed: {
    code() {
      return `let result = turf.lineSplit(${JSON.stringify(
        this.turfObj1
      )},${JSON.stringify(this.turfObj2)});`;
    },
    features1() {
      return getFeaturesFromTurf(this.turfObj1).concat(
        getFeaturesFromTurf(this.turfObj2)
      );
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    turfObj2() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.lineSplit(this.turfObj1, this.turfObj2);
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
      <a-row>
        线几何:<draw :type.sync="type1" @draw-end="handleDrawEnd1"></draw>
      </a-row>
      <a-row>
        几何2:<draw :type.sync="type2" @draw-end="handleDrawEnd2"></draw>
      </a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="styleRandom" key="2">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { getFeaturesFromTurf, styleRandom } from "../../utils/index.js";
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
      styleRandom,
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
        this.type3 = "";
      }
    },
    type2() {
      if (this.type2) {
        this.type1 = "";
        this.type3 = "";
      }
    },
  },
  computed: {
    code() {
      if (!this.turfObj1 || !this.turfObj2) {
        return;
      }
      return `let result = turf.lineSplit(${JSON.stringify(
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
        this.result = turf.lineSplit(this.turfObj1, this.turfObj2);

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
