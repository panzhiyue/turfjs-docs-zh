# 计算缓冲区(buffer)

> Calculates a buffer for input features for a given radius. Units supported are miles, kilometers, and degrees.
>
> 为给定半径的`Feature`计算一个缓冲区。支持的单位是英里、公里和度数。

**参数**

| 参数    | 类型                                    | 描述                                                      |
| :------ | :-------------------------------------- | :-------------------------------------------------------- |
| geojson | (FeatureCollection\|Geometry\|Feature ) | input to be buffered                                      |
| radius  | number                                  | distance to draw the buffer (negative values are allowed) |
| options | Object                                  | Optional parameters: see below                            |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                       |
| :---- | :----- | :--------- | :----------------------------------------- |
| units | string | kilometers | any of the options supported by turf units |
| steps | number | 64         | number of steps                            |

**返回**

(`FeatureCollection`|`Feature <(Polygon|MultiPolygon)>`|`undefined`) - buffered features

**示例**

```js
var point = turf.point([-90.54863, 14.616599]);
var buffered = turf.buffer(point, 500, { units: "miles" });
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/buffer.7bed7069.webp)

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

        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="bufferCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      bufferCoordinates: null,
    };
  },
  mounted() {
    this.bufferCoordinates = turf.buffer(turf.lineString(this.coordinates), 2, {
      units: "miles",
    }).geometry.coordinates;
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
    距离：<input type="number" v-model="length" /> 单位：<length-units
      :value.sync="units"
    ></length-units>
    <select v-model="type">
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="bufferCoordinates">
          <vue2ol-geom-polygon
            :coordinates="bufferCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      geometry: null,
      type: "LineString",
      bufferCoordinates: null,
      length: 2,
      units: "kilometers",
    };
  },
  watch: {
    geometry() {
      this.init();
    },
    length() {
      this.init();
    },
    units() {
      this.init();
    },
  },
  mounted() {},
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      this.bufferCoordinates = turf.buffer(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry)),
        this.length,
        {
          units: this.units,
        }
      ).geometry.coordinates;
    },
  },
};
</script>
```

:::
