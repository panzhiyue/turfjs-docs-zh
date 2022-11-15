# 简化多边形(simplify)

> Takes a GeoJSON object and returns a simplified version. Internally uses simplify-js to perform simplification using the Ramer-Douglas-Peucker algorithm.
> 
> 获取GeoJSON对象并返回简化版本。内部使用 [simplify-js (opens new window)](https://www.npmjs.com/package/simplify-js)使用 [Ramer–Douglas–Peucker (opens new window)](https://baike.baidu.com/item/Ramer–Douglas–Peucker/6898591?fr=aladdin)算法执行简化。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | object to be simplified        |
| options | Object  | Optional parameters: see below |

**options选项**

| 属性        | 类型    | 默认值 | 描述                                                         |
| :---------- | :------ | :----- | :----------------------------------------------------------- |
| tolerance   | number  | 1      | simplification tolerance                                     |
| highQuality | boolean | false  | whether or not to spend more time to create a higher-quality simplification with a different algorithm |
| mutate      | boolean | false  | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - a simplified GeoJSON

**示例**

```js
var geojson = turf.polygon([[
  [-70.603637, -33.399918],
  [-70.614624, -33.395332],
  [-70.639343, -33.392466],
  [-70.659942, -33.394759],
  [-70.683975, -33.404504],
  [-70.697021, -33.419406],
  [-70.701141, -33.434306],
  [-70.700454, -33.446339],
  [-70.694274, -33.458369],
  [-70.682601, -33.465816],
  [-70.668869, -33.472117],
  [-70.646209, -33.473835],
  [-70.624923, -33.472117],
  [-70.609817, -33.468107],
  [-70.595397, -33.458369],
  [-70.587158, -33.442901],
  [-70.587158, -33.426283],
  [-70.590591, -33.414248],
  [-70.594711, -33.406224],
  [-70.603637, -33.399918]
]]);
var options = {tolerance: 0.01, highQuality: false};
var simplified = turf.simplify(geojson, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/simplify.d6d2eb3a.webp)



**基础用法**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="coordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>

        <vue2ol-feature v-if="offsetCoordinates" :style-obj="offsetStyle">
          <vue2ol-geom-polygon
            :coordinates="offsetCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      offsetCoordinates: null,
    };
  },
  mounted() {
    this.offsetCoordinates = turf.lineOffset(
      turf.lineString(this.coordinates),
      2,
      { units: "miles" }
    ).geometry.coordinates;

    this.offsetStyle = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
      }),
    });
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
    距离：<input type="number" v-model="distance" /> 单位：<length-units
      :value.sync="units"
    ></length-units>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          type="LineString"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="offsetCoordinates" :style-obj="offsetStyle">
          <vue2ol-geom-linestring
            :coordinates="offsetCoordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      geometry: null,
      units: "kilometers",
      distance: 10,
      offsetCoordinates: null,
      offsetStyle: null,
    };
  },
  mounted() {
    this.offsetStyle = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
      }),
    });
  },
  watch: {
    geometry() {
      this.init();
    },
    units() {
      this.init();
    },
    distance() {
      this.init();
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      this.offsetCoordinates = turf.lineOffset(
        turf.lineString(this.geometry.getCoordinates()),
        this.distance,
        { units: this.units }
      ).geometry.coordinates;
    },
  },
};
</script>
```

:::
