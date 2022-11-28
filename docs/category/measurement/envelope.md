# 计算多点范围(envelope)

```
> npm install @turf/envelope
```

> Takes any number of features and returns a rectangular Polygon that encompasses all vertices.
>
> 接受任意数量的`feature`并返回包含所有顶点的矩形多边形。

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
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="coordinates2"></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature
          v-if="envelopeGeometry"
          :geometry="envelopeGeometry"
        ></vue2ol-feature>
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
      coordinates: [
        [119.74649906158449, 28.134775638580322],
        [119.77396488189699, 27.921915531158447],
        [120.06372928619386, 27.858744144439697],
        [120.13926029205324, 27.989206790924072],
      ],
      coordinates2: [120.32465457916261, 28.229897499084473],
      envelopeGeometry: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.envelope(
  turf.featureCollection([
    turf.lineString(${JSON.stringify(this.coordinates)}),
    turf.point(${JSON.stringify(this.coordinates2)}),
  ])
);`;
    },
  },
  mounted() {
    this.result = turf.envelope(
      turf.featureCollection([
        turf.lineString(this.coordinates),
        turf.point(this.coordinates2),
      ])
    );
    this.envelopeGeometry = new GeoJSON().readGeometry(
      JSON.stringify(this.result.geometry)
    );
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
