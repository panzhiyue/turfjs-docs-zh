# 计算多点范围(envelope)

> Takes any number of features and returns a rectangular Polygon that encompasses all vertices.
> 
> 接受任意数量的`feature`并返回包含所有顶点的矩形多边形。

**参数**

| 参数    | 类型    | 描述           |
| :------ | :------ | :------------- |
| geojson | GeoJSON | input features |

**返回**

Feature `<Polygon>` - a rectangular Polygon feature that encompasses all vertices

**示例**

```js
var features = turf.featureCollection([
  turf.point([-75.343, 39.984], { name: "Location A" }),
  turf.point([-75.833, 39.284], { name: "Location B" }),
  turf.point([-75.534, 39.123], { name: "Location C" }),
]);

var enveloped = turf.envelope(features);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/envelope.6a398488.webp)

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
    };
  },
  mounted() {
    let value = turf.envelope(
      turf.featureCollection([
        turf.lineString(this.coordinates),
        turf.point(this.coordinates2),
      ])
    );

    this.envelopeGeometry = new GeoJSON().readGeometry(
      JSON.stringify(value.geometry)
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
    {{ extent
    }}<select v-model="type">
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
    };
  },
  watch: {},
  mounted() {},
  methods: {
    handleDrawEnd(e) {
      this.features.push(e.feature);
      this.init();
    },
    init() {
      if (!this.features) {
        return;
      }
      let value = turf.envelope(
        JSON.parse(new GeoJSON().writeFeatures(this.features))
      );

      this.envelopeGeometry = new GeoJSON().readGeometry(
        JSON.stringify(value.geometry)
      );
    },
  },
};
</script>
```

:::
