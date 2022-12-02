# 分割多线段(lineChunk)

```
> npm install @turf/link-chunk
```

> Divides a LineString into chunks of a specified length. If the line is shorter than the segment length then the original line is returned.
>
> 将一个`LineString`分割成指定长度的线段。如果`LineString`比分隔段长度短，则返回原始`LineString`。

**参数**

| 参数          | 类型                                                                         | 描述           |
| :------------ | :--------------------------------------------------------------------------- | :------------- |
| geojson       | (`FeatureCollection`\|`Geometry`\|`Feature <(LineString\|MultiLineString)>`) | 要切分的线要素 |
| segmentLength | number                                                                       | 每段线段的长度 |
| options       | Object                                                                       | 可配置项       |

**options 选项**

| 属性    | 类型    | 默认值     | 描述                                               |
| :------ | :------ | :--------- | :------------------------------------------------- |
| units   | string  | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| reverse | boolean | false      | 反转坐标以在末尾开始第一个分块段                   |

**返回**

`FeatureCollection <LineString>` - collection of line segments

`FeatureCollection <LineString>` - 线段的集合

**示例**

```js
var line = turf.lineString([
  [-95, 40],
  [-93, 45],
  [-85, 50],
]);

var chunk = turf.lineChunk(line, 15, { units: "miles" }); // 间隔15英里切分一段线段
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
      <a-row
        >每段线段的长度(segmentLength)：<a-input-number
          v-model="segmentLength"
        ></a-input-number
      ></a-row>
      <a-row>单位(units)：<length-units :value.sync="units"></length-units></a-row>
      <a-row
        >反转坐标以在末尾开始第一个分块段(reverse)：<a-checkbox
          v-model="reverse"
        ></a-checkbox
      ></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="styleRandom">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRandom } from "../../utils/index.js";

export default {
  data() {
    return {
      result: null,
      visible: true,
      type1: "LineString",
      features: [],
      styleRandom,
      turfObj1: null,
      features1: [],
      segmentLength: 10,
      units: "kilometers",
      reverse: false,
    };
  },
  computed: {
    code() {
      return `let result = turf.lineChunk(${JSON.stringify(this.turfObj1)}, ${
        this.segmentLength
      }, 
{
  reverse: ${this.reverse},
  units: '${this.units}'
});`;
    },
  },
  watch: {
    turfObj1() {
      this.init();
    },
    segmentLength() {
      this.init();
    },
    units() {
      this.init();
    },
    reverse() {
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
        this.result = turf.lineChunk(this.turfObj1, this.segmentLength, {
          reverse: this.reverse,
          units: this.units,
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
      <a-row
        >每段线段的长度(segmentLength)：<a-input-number
          v-model="segmentLength"
        ></a-input-number
      ></a-row>
      <a-row>单位(units)：<length-units :value.sync="units"></length-units></a-row>
      <a-row
        >反转坐标以在末尾开始第一个分块段(reverse)：<a-checkbox
          v-model="reverse"
        ></a-checkbox
      ></a-row>
      <a-row> <json :data="result"></json></a-row>
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
    <vue2ol-layer-vector :style-obj="styleRandom">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { getFeaturesFromTurf, styleRandom } from "../../utils/index.js";

export default {
  data() {
    return {
      result: null,
      visible: true,
      styleRandom,
      feature:null,
      features: [],
      segmentLength: 10,
      units: "kilometers",
      reverse: false,
    };
  },
  watch: {
    feature() {
      this.init();
    },
    segmentLength() {
      this.init();
    },
    units() {
      this.init();
    },
    reverse() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.feature) {
        return;
      }
      return `let result = turf.lineChunk(${JSON.stringify(this.turfObj1)}, ${
        this.segmentLength
      }, 
{
  reverse: ${this.reverse},
  units: '${this.units}'
});`;
    },
    turfObj1() {
      return JSON.parse(new GeoJSON().writeFeature(this.feature));
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.feature = e.feature;
    },
    init() {
      console.log(this.feature);
      if (!this.feature) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.lineChunk(this.turfObj1, this.segmentLength, {
          reverse: this.reverse,
          units: this.units,
        });
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
};
</script>
```

:::
