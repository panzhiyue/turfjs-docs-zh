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
    [-78, 41],
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
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
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
      result: null,
      visible: true,
      type1: "LineString",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      return `let f = ${JSON.stringify(this.turfObj1)};
let result = turf.lineOffset(f, 2, {
  units: "miles",
});`;
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
        this.features = [];
        this.result = null;

        this.result = turf.lineOffset(this.turfObj1, 2, {
          units: "miles",
        });
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
      <a-row>距离：<a-input-number v-model="distance" /> </a-row>
      <a-row>单位：<length-units :value.sync="units"></length-units></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>

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
      result: null,
      visible: true,
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
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let line = turf.lineString(${JSON.stringify(
        this.geometry.getCoordinates()
      )});
      let result = turf.lineOffset(
        line,
        ${this.distance},
        { units: '${this.units}' }
      );`;
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
      this.result = turf.lineOffset(
        turf.lineString(this.geometry.getCoordinates()),
        this.distance,
        { units: this.units }
      );
      this.offsetCoordinates = this.result.geometry.coordinates;
    },
  },
};
</script>
```

:::
