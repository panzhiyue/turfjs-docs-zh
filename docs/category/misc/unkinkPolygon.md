# 去除自相交多边形(unkinkPolygon)

```
> npm install @turf/unkink-polygon
```

> Takes a kinked polygon and returns a feature collection of polygons that have no kinks. Uses simplepolygon internally.
> 
> 接收一个有自相交的面要素(`Feature<Polygon|MultiPolygon>`)或面要素集合(`FeatureCollection<Polygon|MultiPolygon>`)，计算并返回没有自相交的面要素集合，如果入参没有自相交，则返回入参数据的要素集。内部使用simplepolygon算法。

**参数**

| 参数    | 类型                                                      | 描述                            |
| :------ | :-------------------------------------------------------- | :------------------------------ |
| geojson | `FeatureCollection|Feature<Polygon|MultiPolygon>` | |

**返回**

`FeatureCollection <Polygon>` - Unkinked polygons

**示例**

```js
var poly = turf.polygon([[[0, 0], [2, 0], [0, 2], [2, 2], [0, 0]]]);

var result = turf.unkinkPolygon(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/unkinkPolygon.f48ba212.webp)

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
    <vue2ol-layer-vector :style-obj="styleRandom">
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
      styleRandom,
    };
  },
  computed: {
    code() {
      return `let result = turf.unkinkPolygon(${JSON.stringify(this.turfObj1)})`;
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
        this.result = turf.unkinkPolygon(this.turfObj1);

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
    <vue2ol-layer-vector :style-obj="styleRandom">
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
      feature: null,
      features: [],
      type: "LineString",
      result: null,
      visible: true,
      styleRandom,
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
      return `let result = turf.unkinkPolygon(${new GeoJSON().writeFeature(
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
        this.result = turf.unkinkPolygon(
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
