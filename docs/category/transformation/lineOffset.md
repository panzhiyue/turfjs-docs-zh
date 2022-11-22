# 多段线偏移(lineOffset)

```
npm install @turf/line-offset
```

> Takes a line and returns a line at offset by the specified distance.
>
> 接收 type 为 lineString 的线段，返回偏移指定距离的线段

> 值得注意的是，偏移的角度随要素的形状而改变

**参数**

| 参数     | 类型                                                     | 描述                   |
| -------- | -------------------------------------------------------- | ---------------------- |
| geojson  | (`Geometry` \|`Feature <(LineString\|MultiLineString)>`) | 接收的 GeoJSON         |
| distance | Number                                                   | 偏移的距离，可以是负值 |
| options  | Object                                                   | 可配置项               |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |

**返回**

`Feature <(LineString|MultiLineString)>` - Line offset from the input line

`Feature <(LineString|MultiLineString)>` - 偏移后的线段

**示例**

```js
var line = turf.lineString(
  [
    [-83, 30],
    [-84, 36],
    [-78, 41]
  ],
  { stroke: "#F00" }
);

var offsetLine = turf.lineOffset(line, 2, { units: "miles" });
/*
{
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [-82.97144752916007, 30.004758745139988],
      [-83.96871903948426, 35.98838780708505],
      [-77.98146901966652, 40.977762823599825]
    ]
  },
  properties: {
    stroke: "#F00"
  }
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
