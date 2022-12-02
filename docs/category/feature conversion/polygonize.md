# 多边形化(polygonize)

```
> npm install @turf/polygonize
```

> Polygonizes (Multi)LineString(s) into Polygons.
> 
> 将(多个)`LineString`多边形化。接收一个 type 为LineString或MultiLineString的要素，转换为type为Polygon的面要素集合

> 值得注意的是，lineToPolygon 方法返回要素，该方法返回要素集，且不能传入 options 的属性。并且传入的线要素必须是闭合的。

**参数**

| 参数    | 类型                                                         | 描述           |
| :------ | :----------------------------------------------------------- | :------------- |
| geojson | `FeatureCollection|Geometry|Feature<LineString|MultiLineString>` | 需转换的线要素 |

**返回**

`FeatureCollection <Polygon>` - Polygons created

`FeatureCollection <Polygon>` - 创建的多边形集合

**示例**

```js
var line = turf.lineString([
  [125, -30],
  [145, -30],
  [145, -20],
  [125, -20],
  [125, -30]
]);

var polygon = turf.polygonize(line); // type 为 Polygon 的面要素
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
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRed">
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
      type1: "LineString",
      styleRed,
      turfObj1: null,
      features1: [],
      features: [],
    };
  },
  computed: {
    code() {
      return `let value = turf.polygonize(${JSON.stringify(
        this.turfObj1
      )});`;
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

        this.result = turf.polygonize(this.turfObj1);
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