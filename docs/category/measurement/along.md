# 计算延长点(along)

```
> npm install @turf/along
```

> Takes a LineString and returns a Point at a specified distance along the line.
>
> 接收入参的线段上指定距离的点。

> 注意:距离是从起点开始计算的，如果距离超过线段的长度，会返回终点的 GeoJSON



**参数**

| 参数     | 类型                   | 描述     |
| :------- | :--------------------- | :------- |
| line     | `Feature <LineString>` | 输入线段 |
| distance | number                 | 沿线距离 |
| options  | Object                 | 可配置项 |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                                         |
| :---- | :----- | :--------- | :----------------------------------------------------------- |
| units | string | kilometers | 沿线距离的单位，可选的有 degrees、radians、miles、kilometers |

**返回**

`Feature <Point>` - Point distance units along the line

`Feature <Point>` - 沿线指定距离点

**示例**

```js
var line = turf.lineString([
  [-83, 30],
  [-84, 36],
  [-78, 41]
]);
var options = { units: "miles" };

var along = turf.along(line, 200, options);
/*
{
  type: "Feature",
  geometry: {
    coordinates: [-83.4608648621918, 32.8678095806294],
    type: "Point"
  },
  properties: {}
}
*/
```

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
        <vue2ol-feature v-if="marker">
          <vue2ol-geom-point :coordinates="marker"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
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
      marker: null,
    };
  },
  mounted() {
    let options = { units: "miles" };

    let value = turf.along(turf.lineString(this.coordinates), 10, options);

    this.marker = value.geometry.coordinates;
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
    距离：<input type="number" v-model="length" />
    单位：<length-units :value.sync="units"></length-units>
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
        <vue2ol-feature v-if="marker">
          <vue2ol-geom-point :coordinates="marker"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      geometry: null,
      marker: null,
      length: 10,
      units: "kilometers",
    };
  },
  mounted() {},
  watch: {
    geometry() {
      this.initMarker();
    },
    length() {
      this.initMarker();
    },
    units() {
      this.initMarker();
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    initMarker() {
      if (!this.geometry) {
        return;
      }
      let options = { units: this.units };
      let value = turf.along(
        turf.lineString(this.geometry.getCoordinates()),
        this.length,
        options
      );
      this.marker = value.geometry.coordinates;
    },
  },
};
</script>
```

:::

