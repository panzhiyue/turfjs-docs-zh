

# 缩放(transformScale)

> Scale a GeoJSON from a given point by a factor of scaling (ex: factor=2 would make the GeoJSON 200% larger). If a FeatureCollection is provided, the origin point will be calculated based on each individual Feature.
> 
> 从一个给定的点缩放GeoJSON(例如:factor=2将使GeoJSON增大200%)。如果提供了`FeatureCollection`，则将根据每个单独的`Feature`计算原点。

**参数**

| 参数    | 类型    | 描述                                                   |
| :------ | :------ | :----------------------------------------------------- |
| geojson | GeoJSON | GeoJSON to be scaled                                   |
| factor  | number  | of scaling, positive or negative values greater than 0 |
| options | Object  | Optional parameters: see below                         |

**options选项**

| 属性   | 类型             | 默认值                                                       | 描述     |
| :----- | :--------------- | :----------------------------------------------------------- | :------- |
| origin | (string          | Coord)                                                       | centroid |
| mutate | boolean \| false | allows GeoJSON input to be mutated (significant performance increase if true) |          |

**返回**

GeoJSON - scaled GeoJSON

**示例**

```js
var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
var scaledPoly = turf.transformScale(poly, 3);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/transformScale.3ae75920.webp)


**基础用法**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>

        <vue2ol-feature :style-obj="style">
          <vue2ol-geom-linestring
            :coordinates="scaleCoordinates"
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
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      scaleCoordinates: null,
      style: null,
    };
  },
  mounted() {
    this.scaleCoordinates = turf.transformScale(
      turf.lineString(this.coordinates),
      2
    ).geometry.coordinates;

    this.style = new Style({
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
    <select v-model="type">
      <option value=""></option>
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
    factor：<input type="number" v-model="factor" />
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          v-if="type != ''"
          :active="true"
          :type="type"
          @drawend="handleDrawEnd1"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector v-if="scaleGeometry">
        <vue2ol-feature :style-obj="style" :geometry="scaleGeometry">
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      feature1: null,
      type: "LineString",
      scaleGeometry: null,
      style: null,
      factor: 2,
    };
  },
  watch: {
    feature1() {
      this.init();
    },
    type() {
      if (this.type) {
        this.isDrawPivot = false;
      }
    },
    factor() {
      this.init();
    },
  },
  mounted() {
    this.style = new Style({
      stroke: new Stroke({
        width: 2,
        color: "#ff0000",
      }),
    });
  },
  methods: {
    handleDrawEnd1(e) {
      this.feature1 = e.feature;
    },
    init() {
      if (!this.feature1) {
        return;
      }
      let f = turf.transformScale(
        JSON.parse(new GeoJSON().writeFeature(this.feature1)),
        parseFloat(this.factor),
      );
      this.scaleGeometry = new GeoJSON().readGeometry(
        JSON.stringify(f.geometry)
      );
    },
  },
};
</script>
```

:::
