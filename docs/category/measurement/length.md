# 计算多段线长度(length)

```
> npm install @turf/length
```

> Takes a GeoJSON and measures its length in the specified units, (Multi)Point 's distance are ignored.
>
> 取一个 GeoJSON 并以指定的单位测量其长度，(Multi)Point 的返回值为 0。

**参数**

| 参数    | 类型                                                                                                                                        | 描述               |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------ | :----------------- |
| geojson | [Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\|[MultiLineString](../other/type.html#multilinestring)\> | 需要测量的 GeoJSON |
| options | Object                                                                                                                                      | 可配置项           |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |

**返回**

number - length of GeoJSON

number - 长度

**示例**

```js
var line = turf.lineString([
  [115, -32],
  [131, -22],
  [143, -25],
  [150, -34],
]);
var length = turf.length(line, { units: "miles" }); // 2738.9663893575207
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
      <a-row>{{ result }}</a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getTestOL } from "../../utils/index.js";
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
    };
  },
  computed: {
    code() {
      return `let options = { units: "miles" };
let result = turf.length(${JSON.stringify(this.turfObj1)}), 10, options);`;
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

        let options = { units: "miles" };

        this.result = turf.length(this.turfObj1, 10, options);
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
      <a-row> 单位：<length-units :value.sync="units"></length-units></a-row>
      <a-row>{{ result }}</a-row>
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
      units: "kilometers",
      result: null,
      visible: true,
    };
  },
  mounted() {},
  watch: {
    geometry() {
      this.initMarker();
    },
    units() {
      this.initMarker();
    },
  },
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let options = { units: '${this.units}'' };
this.result = turf.length(
  turf.lineString(${JSON.stringify(this.geometry.getCoordinates())}),
  options
);`;
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
      this.result = turf.length(
        turf.lineString(this.geometry.getCoordinates()),
        options
      );
    },
  },
};
</script>
```

:::
