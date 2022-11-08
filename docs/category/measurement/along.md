# 计算延长点(along)

> Takes a LineString and returns a Point at a specified distance along the line.
>
> 获取一个`LineString`并返回沿该线指定距离的点。

**参数**

| 参数     | 类型                   | 描述                           |
| :------- | :--------------------- | :----------------------------- |
| line     | Feature `<LineString>` | input line                     |
| distance | number                 | distance along the line        |
| options  | Object                 | Optional parameters: see below |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                          |
| :---- | :----- | :--------- | :-------------------------------------------- |
| units | string | kilometers | can be degrees, radians, miles, or kilometers |

**返回**

Feature `<Point>` - Point distance units along the line

**示例**

```js
var line = turf.lineString([
  [109.502991, 29.68718],
  [108.837829, 32.969237],
  [113.567871, 37.200787],
]);
var options = { units: "miles" };

var along = turf.along(line, 300, options);
```

```
npm install @turf/along
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
