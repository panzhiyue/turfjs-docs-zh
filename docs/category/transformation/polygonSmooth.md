# 多边形平滑(polygonSmooth)

```
npm install @turf/polygon-smooth
```

> Smooths a [Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) or [MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.7). Based on Chaikin's algorithm . Warning: may create degenerate polygons.
>
> 基于 Chaikin 算法平滑多边形(Polygon)或多多边形(MultiPolygon)。
>
> 注意:可能会创建退化多边形

**参数**

| 参数       | 类型                                                                                                                                                                                         | 描述                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| inputPolys | ([FeatureCollection](../other/type.html#featurecollection)\|[Feature](../other/type.html#feature))\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\> | (Multi)Polygon(s) to smooth |
| options    | Object                                                                                                                                                                                       | 可配置项                    |

**options 选项**

| 属性       | 类型   | 默认值 | 描述                                     |
| :--------- | :----- | :----- | :--------------------------------------- |
| iterations | string | 1      | 平滑多边形的次数。值越大，多边形越平滑。 |

**返回**

[FeatureCollection](../other/type.html#featurecollection)\<[Polygon](../other/type.html#polygon)\> - FeatureCollection containing the smoothed polygon/poylgons

[FeatureCollection](../other/type.html#featurecollection)\<[Polygon](../other/type.html#polygon)\> - 平滑后的多边形

**示例**

```js
var polygon = turf.polygon([
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

var smoothed = turf.polygonSmooth(polygon, { iterations: 3 });
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
          ></geojson-text
        ></a-space>
      </a-row>
      <a-row>
        <a-space
          >iterations:<a-input-number
            v-model="iterations"
          ></a-input-number></a-space
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
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";
export default {
  data() {
    return {
      result: null,
      visible: true,
      type1: "MultiPolygon",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
      iterations: 3,
    };
  },
  computed: {
    code() {
      return `let f = ${JSON.stringify(this.turfObj1)};
let smoothed = turf.polygonSmooth(f, {
  iterations: ${this.iterations},
});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    iterations() {
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

        this.result = turf.polygonSmooth(this.turfObj1, {
          iterations: this.iterations,
        });
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
      <a-row>iterations：<a-input-number v-model="iterations" /> </a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="Polygon"
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
      result: null,
      visible: true,
      type1: "Polygon",
      features: [],
      styleRed,
      turfObj1: null,
      iterations: 3,
    };
  },
  watch: {
    feature() {
      this.init();
    },
    iterations() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.feature) {
        return;
      }
      return `let f = ${new GeoJSON().writeFeature(this.feature)};
let result = turf.polygonSmooth(
  f,
  { iterations: '${this.iterations}' }
);`;
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
      try {
        this.features = [];
        this.result = null;
        this.result = turf.polygonSmooth(
          JSON.parse(new GeoJSON().writeFeature(this.feature)),
          { iterations: this.iterations }
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
