# 计算两多线段重叠段(lineOverlap)

```
> npm install @turf/line-overlap
```

> Takes any LineString or Polygon and returns the overlapping lines between both features.
> 获取任何`LineString`或`Polygon`，并返回两个`Feature`之间的重叠线。

**参数**

| 参数    | 类型                                                                           | 描述               |
| :------ | :----------------------------------------------------------------------------- | :----------------- |
| line1   | (`Geometry`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | 任意线要素或面要素 |
| line2   | (`Geometry`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | 任意线要素或面要素 |
| options | Object                                                                         | 可配置项           |

**options 选项**

| 属性      | 类型   | 默认值 | 描述                                 |
| :-------- | :----- | :----- | :----------------------------------- |
| tolerance | number | 0      | 匹配重叠线段的公差距离，以公里为单位 |

**返回**

`FeatureCollection <LineString>` - lines(s) that are overlapping between both features

`FeatureCollection <LineString>` - 两个要素之间重叠的线

**示例**

```js
var line1 = turf.lineString([
  [115, -35],
  [125, -30],
  [135, -30],
  [145, -35],
]);
var line2 = turf.lineString([
  [115, -25],
  [125, -30],
  [135, -30],
  [145, -25],
]);

var overlapping = turf.lineOverlap(line1, line2); // [125, -30], [135, -30] 线段重叠
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineOverlap.99a65c25.webp)

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
      <a-row>线1：<geojson-obj :value.sync="turfObj1"></geojson-obj></a-row>
      <a-row>线2：<geojson-obj :value.sync="turfObj2"></geojson-obj></a-row>
      <a-row
        >公差(tolerance)：<a-input-number v-model="tolerance"></a-input-number
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector :style-obj="styleRandom">
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
import { styleRandom } from "../../utils/index.js";
export default {
  data() {
    return {
      turfObj1: turf.lineString([
        [119.72452640533449, 27.981138706207275],
        [119.79044437408449, 28.0978684425354],
        [119.89481449127199, 28.1857590675354],
        [120.06235599517824, 28.06765604019165],
        [120.16397953033449, 27.871275424957275],
        [119.94287967681886, 27.9715256690979],
        [119.72452640533449, 27.981138706207275],
      ]),
      turfObj2: turf.lineString([
        [119.72452640533449, 27.981138706207275],
        [119.79044437408449, 28.0978684425354],
        [119.89481449127199, 28.1857590675354],
        [120.06235599517824, 28.06765604019165],
        [120.16235599517824, 28.06765604019165],
        [120.16235599517824, 28.16765604019165],
      ]),

      result: null,
      visible: true,
      styleRed,
      styleRandom,
      features: [],
      tolerance: 0,
    };
  },
  computed: {
    code() {
      return `let result = turf.lineOverlap(
  ${JSON.stringify(this.turfObj1)},
  ${JSON.stringify(this.turfObj2)},
  {tolerance:${this.tolerance}}
);`;
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
    tolerance() {
      this.init();
    },
  },
  methods: {
    init() {
      try {
        this.result = turf.lineOverlap(this.turfObj1, this.turfObj2, {
          tolerance: this.tolerance,
        });
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
  mounted() {
    this.init();
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
        <a-button type="primary" @click="handleDraw1">线1</a-button>
        <a-button type="primary" @click="handleDraw2">线2</a-button>
      </a-row>
      <a-row
        >公差(tolerance)：<a-input-number v-model="tolerance"></a-input-number
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource1">
        <vue2ol-interaction-draw
          type="LineString"
          :active="isDraw1"
          @drawend="handleDrawEnd1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadySource2">
        <vue2ol-interaction-draw
          type="LineString"
          :active="isDraw2"
          @drawend="handleDrawEnd2"
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
      isDraw2: false,
      isDraw1: false,
      feature1: null,
      feature2: null,
      source1: null,
      source2: null,
      result: null,
      visible: true,
      styleRed,
      features: [],
      tolerance: 1,
    };
  },
  watch: {
    feature1() {
      this.init();
    },
    feature2() {
      this.init();
    },
    tolerance() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    turfObj1() {
      return JSON.parse(new GeoJSON().writeFeature(this.feature1));
    },
    turfObj2() {
      return JSON.parse(new GeoJSON().writeFeature(this.feature2));
    },
    code() {
      if (!this.feature1 || !this.feature2) {
        return;
      }
      return `let result = turf.lineOverlap(
  ${JSON.stringify(this.turfObj1)},
  ${JSON.stringify(this.turfObj2)}, 
  {
    tolerance: ${this.tolerance},
  }
);`;
    },
  },
  methods: {
    init() {
      if (!this.feature1 || !this.feature2) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.lineOverlap(this.turfObj1, this.turfObj2, {
          tolerance: this.tolerance,
        });
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
    handleDraw1() {
      this.isDraw1 = !this.isDraw1;
      this.isDraw2 = false;
    },
    handleDraw2() {
      this.isDraw2 = !this.isDraw2;
      this.isDraw1 = false;
    },
    handleDrawEnd1(e) {
      this.source1.clear();
      this.feature1 = e.feature;
    },
    handleDrawEnd2(e) {
      this.source2.clear();
      this.feature2 = e.feature;
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
