# 根据点截取多线段(lineSlice)

```
> npm install @turf/line-slice
```

> Takes a line , a start Point , and a stop point and returns a subsection of the line in-between those points. The start & stop points don't need to fall exactly on the line.
> 接收一条线、起点和终点，并返回这些点之间的线段。

> 起止点不需要正好落在直线上，会计算出点到线最近的点

**参数**

| 参数    | 类型                    | 描述         |
| :------ | :---------------------- | :----------- |
| startPt | Coord\|`Feature<Point>` | 起点         |
| stopPt  | Coord\|`Feature<Point>` | 终点         |
| line    | `Feature <LineString>`  | 要裁切的线段 |

**返回**

`Feature <LineString>` - sliced line

`Feature <LineString>` - 裁切后的线段

**示例**

```js
var line = turf.lineString([
  [-77.031669, 38.878605],
  [-77.029609, 38.881946],
  [-77.020339, 38.884084],
  [-77.025661, 38.885821],
  [-77.021884, 38.889563],
  [-77.019824, 38.892368],
]);
var start = turf.point([-77.029609, 38.881946]);
var stop = turf.point([-77.021884, 38.889563]);

var sliced = turf.lineSlice(start, stop, line); // 返回裁切的线段GeoJSON
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSlice.bbce2156.webp)

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
          >线几何：<geojson-obj :value.sync="turfObj1"></geojson-obj
        ></a-space>
      </a-row>
      <a-row
        ><a-space
          >起点几何：<geojson-obj :value.sync="turfObj2"></geojson-obj
        ></a-space>
      </a-row>
      <a-row
        ><a-space
          >终点几何：<geojson-obj :value.sync="turfObj3"></geojson-obj
        ></a-space>
      </a-row>

      <a-row> <json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector key="1">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed" key="2">
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
      result: null,
      visible: true,
      styleRed,
      turfObj1: turf.lineString([
        [119.7307062149048, 28.1473069190979],
        [119.68401432037355, 27.9880051612854],
        [119.94219303131105, 27.934446811676025],
        [120.1646661758423, 27.948179721832275],
        [120.13033390045167, 28.10610818862915],
      ]),
      turfObj2: turf.point([119.68401432037355, 27.9880051612854]),
      turfObj3: turf.point([120.1646661758423, 27.948179721832275]),
    };
  },
  computed: {
    code() {
      return `let result = turf.lineSlice(${JSON.stringify(
        this.turfObj2
      )},${JSON.stringify(this.turfObj3)},${JSON.stringify(this.turfObj1)});`;
    },
    features1() {
      return getFeaturesFromTurf(this.turfObj1);
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    turfObj2() {
      this.init();
    },
    turfObj3() {
      this.init();
    },
  },
  methods: {
    init() {
      if (!this.turfObj1 || !this.turfObj2 || !this.turfObj3) {
        return;
      }
      try {
        this.features = [];
        this.result = null;
        this.result = turf.lineSlice(
          this.turfObj2,
          this.turfObj3,
          this.turfObj1
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
        起点几何:<draw :type.sync="type2" @draw-end="handleDrawEnd2"></draw>
      </a-row>
      <a-row>
        终点几何:<draw :type.sync="type3" @draw-end="handleDrawEnd3"></draw>
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
      type3: "",
      features: [],
      feature1: null,
      feature2: null,
      feature3: null,

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
    feature3() {
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
    type3() {
      if (this.type3) {
        this.type1 = "";
        this.type2 = "";
      }
    },
  },
  computed: {
    code() {
      if (!this.turfObj1 || !this.turfObj2 || !this.turfObj3) {
        return;
      }
      return `let result = turf.lineSlice(${JSON.stringify(
        this.turfObj2
      )},${JSON.stringify(this.turfObj3)},${JSON.stringify(this.turfObj1)});`;
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
    turfObj3() {
      if (this.feature3) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature3));
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
    handleDrawEnd3(feature) {
      this.feature3 = feature;
    },
    init() {
      if (!this.turfObj1 || !this.turfObj2 || !this.turfObj3) {
        return;
      }

      try {
        this.features = [];
        this.result = null;
        this.result = turf.lineSlice(
          this.turfObj2,
          this.turfObj3,
          this.turfObj1
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
