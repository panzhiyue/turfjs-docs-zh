# 计算区域面积(area)

```
> npm install @turf/area
```

> Takes one or more features and returns their area in square meters.
>
> 获取一个或多个`feature`，并返回其面积,单位为平方米。

> 值得注意的是，该方法应该是传入 polygon 类型的 GeoJSON，即 Point 点类型和 LineString 线段类型均为 0

**参数**

| 参数    | 类型                                     | 描述                |
| :------ | :--------------------------------------- | :------------------ |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 一个或多个`feature` |

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
    [125, -15],
  ],
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
        [125, -15],
      ],
    ]),
    turf.polygon([
      [
        [225, -15],
        [213, -22],
        [254, -27],
        [244, -15],
        [225, -15],
      ],
    ]),
  ],
}); // 6679892478393.854
```

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
      <a-row> {{ result }}平方米 </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
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
    };
  },
  computed: {
    code() {
      return `let value = turf.area(${JSON.stringify(this.turfObj1)});`;
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
        let value = turf.area(this.turfObj1);
        this.result = value;
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
        ><select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row><a-checkbox v-model="isGeometry">读取geometry</a-checkbox></a-row>
      <a-row> {{ result }}平方米 </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
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
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      feature: null,
      result: null,
      visible: true,
      type: "Polygon",
      isGeometry: false,
    };
  },
  mounted() {},
  watch: {
    feature() {
      this.init();
    },
    isGeometry() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.feature) {
        return;
      }
      let g = JSON.parse(new GeoJSON().writeFeature(this.feature));
      if (this.isGeometry) {
        g = g.geometry;
      }
      return `let value = turf.area(${JSON.stringify(g)});`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.feature = e.feature;
    },

    init() {
      if (!this.feature) {
        return;
      }
      let g = JSON.parse(new GeoJSON().writeFeature(this.feature));
      if (this.isGeometry) {
        g = g.geometry;
      }
      let value = turf.area(g);
      this.result = value;
    },
  },
};
</script>
```

:::
