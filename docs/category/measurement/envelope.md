# 计算多点范围(envelope)

```
> npm install @turf/envelope
```

> Takes any number of features and returns a rectangular Polygon that encompasses all vertices.
>
> 接受任意的GeoJSON对象，计算并返回包含所有顶点的矩形多边形。

> 值得注意的是，矩形是正四边形，所以会去包含更靠外的要素顶点，从而保证所有的要素都在矩形内

**参数**

| 参数    | 类型                                     | 描述         |
| :------ | :--------------------------------------- | :----------- |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 任意 GeoJSON |

**返回**

[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\> - a rectangular Polygon feature that encompasses all vertices

[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\> - 包含所有入参要素顶点的 GeoJSON

**示例**

```js
var features = turf.featureCollection([
  turf.point([-75.343, 39.984], { name: "Location A" }),
  turf.point([-75.833, 39.284], { name: "Location B" }),
  turf.point([-75.534, 39.123], { name: "Location C" }),
]);

var enveloped = turf.envelope(features);
/*
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-75.833, 39.123],
        [-75.343, 39.123],
        [-75.343, 39.984],
        [-75.833, 39.984],
        [-75.833, 39.123]
      ]
    ]
  },
  properties: {}
}
*/

// 包含更靠外的要素，第四个点[-75.12, 38.4]比第三个点[-75.534, 39.123]有更小的维度，所以第三个点不在矩形的边上
var features = turf.featureCollection([
  turf.point([-75.343, 39.984], { name: "Location A" }),
  turf.point([-75.833, 39.284], { name: "Location B" }),
  turf.point([-75.534, 39.123], { name: "Location C" }),
  turf.point([-75.12, 38.4], { name: "Location D" }),
]);
var enveloped = turf.envelope(features);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/envelope.6a398488.webp)

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
      <a-row> <json :data="result"></json></a-row>
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
import { getTestOL } from "../../utils/index.js";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      visible: true,
      result: null,
      type1: "LineString",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      return `let features = ${JSON.stringify(this.turfObj1)};
let result = turf.envelope(features);`;
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

        this.result = turf.envelope(this.turfObj1);
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
        ><select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row> <json :data="result"></json></a-row>
    </drawer>
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
        <vue2ol-feature v-if="envelopeGeometry" :geometry="envelopeGeometry">
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
      extent: null,
      features: [],
      type: "LineString",
      envelopeGeometry: null,
      result: null,
      visible: true,
    };
  },
  watch: {},
  mounted() {},
  computed: {
    code() {
      return `let features = ${new GeoJSON().writeFeatures(this.features)};
let result = turf.envelope(features);`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.features.push(e.feature);
      this.init();
    },
    init() {
      if (!this.features) {
        return;
      }
      this.result = turf.envelope(
        JSON.parse(new GeoJSON().writeFeatures(this.features))
      );

      this.envelopeGeometry = new GeoJSON().readGeometry(
        JSON.stringify(this.result.geometry)
      );
    },
  },
};
</script>
```

:::
