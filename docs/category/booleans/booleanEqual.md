# 判断是否相等(booleanEqual)

```
> npm install @turf/boolean-equal
```

> Determine whether two geometries of the same type have identical X,Y coordinate values. See http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm
> 接收两个任意类型的要素，判断它们的坐标是否相等。参见http://edndoc.esri.com/arcsde/9.0/general_topics/understand_spatial_relations.htm。
>
> 值得注意的是，坐标的顺序没有影响，只要全部坐标对的对应相等，就认为是相等的坐标

**参数**

| 参数     | 类型              | 描述    |
| :------- | :---------------- | :------ |
| feature1 | Geometry\|Feature | GeoJSON |
| feature2 | Geometry\|Feature | GeoJSON |

**返回**

boolean - true if the objects are equal, false otherwise

**示例**

```js
var pt1 = turf.point([0, 0]);
var pt2 = turf.point([0, 0]);
var pt3 = turf.point([1, 1]);

turf.booleanEqual(pt1, pt2);
//= true
turf.booleanEqual(pt2, pt3);
//= false

var pt1 = turf.polygon([
  [
    [114.11207138646921, 40.065237806396226],
    [116.72681748022632, 37.74008299506812],
    [117.2981065427258, 40.28349411053313],
    [114.11207138646921, 40.065237806396226],
  ],
]);
var pt2 = turf.polygon([
  [
    [117.2981065427258, 40.28349411053313],
    [116.72681748022632, 37.74008299506812],
    [114.11207138646921, 40.065237806396226],
    [117.2981065427258, 40.28349411053313],
  ],
]);

var boolean = turf.booleanEqual(pt1, pt2); // true，坐标顺序不影响
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
      <a-row> {{ result }} </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates1"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates2"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates1: [
        [
          [114.11207138646921, 40.065237806396226],
          [116.72681748022632, 37.74008299506812],
          [117.2981065427258, 40.28349411053313],
          [114.11207138646921, 40.065237806396226],
        ],
      ],
      coordinates2: [
        [
          [117.2981065427258, 40.28349411053313],
          [116.72681748022632, 37.74008299506812],
          [114.11207138646921, 40.065237806396226],
          [117.2981065427258, 40.28349411053313],
        ],
      ],

      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let coordinates1 = ${JSON.stringify(this.coordinates1)};
let coordinates2 = ${JSON.stringify(this.coordinates2)};
let result = turf.booleanEqual(turf.polygon(coordinates1), turf.polygon(coordinates2));`;
    },
  },
  mounted() {
    this.result = turf.booleanEqual(turf.polygon(this.coordinates1), turf.polygon(this.coordinates2));
  },
};
</script>
```

:::
