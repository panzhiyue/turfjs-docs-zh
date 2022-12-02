# 结合(combine)

```
> npm install @turf/combine
```

> Combines a FeatureCollection of Point , LineString , or Polygon features into MultiPoint , MultiLineString , or MultiPolygon features.
> 将`Point`、`LineString`或`Polygon`的`FeatureCollection`组合成`MultiPoint`、`MultiLineString`或`MultiPolygon`的`feature`。

**参数**

| 参数 | 类型                       | 描述       |
| ---- | -------------------------- | ---------- | ---------- | ---------------- |
| fc   | `FeatureCollection <(Point | LineString | Polygon)>` | 任意类型的要素集 |

**返回**

`FeatureCollection <(MultiPoint|MultiLineString|MultiPolygon)>` - a FeatureCollection of corresponding type to input

`FeatureCollection <(MultiPoint|MultiLineString|MultiPolygon)>` - 要输入的相应类型的 FeatureCollection

**示例**

```js
var fc = turf.featureCollection([
  turf.point([19.026432, 47.49134]),
  turf.point([19.074497, 47.509548]),
]);

var combined = turf.combine(fc);
/*
{
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    geometry: {
      type: "MultiPoint",
      coordinates: [
        [19.026432, 47.49134],
        [19.074497, 47.509548]
      ]
    }
  }]
}
*/
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
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates1"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates2"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
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
      coordinates1: [
        [
          [119.72452640533449, 27.981138706207275],
          [119.79044437408449, 28.0978684425354],
          [119.89481449127199, 28.1857590675354],
          [120.06235599517824, 28.06765604019165],
          [120.16397953033449, 27.871275424957275],
          [119.94287967681886, 27.9715256690979],
          [119.72452640533449, 27.981138706207275],
        ],
      ],
      coordinates2: [
        [
          [120.03901004791261, 28.166897773742676],
          [119.93189334869386, 27.99523639678955],
          [119.92502689361574, 27.826321601867676],
          [120.18183231353761, 27.807095527648926],
          [120.19968509674074, 27.95678424835205],
          [120.13651371002199, 28.07214069366455],
          [120.03901004791261, 28.166897773742676],
        ],
      ],
      result: null,
      visible: true,
      features: null,
      styleRed,
    };
  },
  computed: {
    code() {
      return `let fc = turf.featureCollection([
  turf.polygon(${JSON.stringify(this.coordinates1)}),
  turf.polygon(${JSON.stringify(this.coordinates2)}),
]);
let result = turf.combine(fc);`;
    },
  },
  mounted() {
    let fc = turf.featureCollection([
      turf.polygon(this.coordinates1),
      turf.polygon(this.coordinates2),
    ]);
    this.result = turf.combine(fc);
    this.features = getFeaturesFromTurf(this.result);
  },
};
</script>
```

:::
