# 边界裁切(bboxClip)

```
> npm install @turf/bbox-clip
```

> Takes a Feature and a bbox and clips the feature to the bbox using lineclip. May result in degenerate edges when clipping Polygons.
>
> 接收一个`Feature`和一个`bbox`，裁剪超出 bbox 的范围并返回新的要素。在裁剪多边形时可能导致退化边缘。

**参数**

| 入参    | 类型                  | 描述                  |
| ------- | ---------------------| ---------------------- |
| feature | [Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\|[MultiLineString](../other/type.html#multilinestring)\|[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\> | 需要与 bbox 裁剪的要素 |
| bbox    | [bbox](../other/type.html#bbox) | [xmin,ymin,xmax,ymax] |

**返回**

[Feature](../other/type.html#feature)\<[LineString](../other/type.html#linestring)\|[MultiLineString](../other/type.html#multilinestring)\|[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\> - 裁剪后的 feature

**示例**

```js
var bbox = [0, 0, 10, 10];
var poly = turf.polygon([
  [
    [2, 2],
    [8, 4],
    [12, 8],
    [3, 7],
    [2, 2],
  ],
]);

var clipped = turf.bboxClip(poly, bbox);
/*
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [2, 2],
        [8, 4],
        [10,6],
        [10, 7.777777777777778],
        [3, 7],
        [2, 2]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bboxClip.f58ca074.webp)

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
        <vue2ol-feature key="1">
          <vue2ol-geom-polygon :coordinates="coordinates"></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature key="2" :geometry="bboxGeometry"> </vue2ol-feature>

        <vue2ol-feature key="3" :geometry="clipGeometry" :style-obj="clipStyle">
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      extent: [
        119.77396488189699, 27.771647453308105, 120.26010990142824,
        28.22620677947998,
      ],
      coordinates: [
        [
          [119.82697608925122, 28.20411200111616],
          [119.67655860065376, 27.864037679069753],
          [120.06895204916886, 27.71144022686944],
          [120.37414695356948, 27.927256623552736],
          [120.24552910100064, 28.193212183101853],
          [119.82697608925122, 28.20411200111616],
        ],
      ],
      bboxGeometry: null,
      clipGeometry: null,
      clipStyle: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let polygon=turf.polygon(${JSON.stringify(this.coordinates)});
let extent = ${JSON.stringify(this.extent)};
let result = turf.bboxClip(polygon, extent);`;
    },
  },
  mounted() {
    let bboxPolygon = turf.bboxPolygon(this.extent);

    this.bboxGeometry = new GeoJSON().readGeometry(
      JSON.stringify(bboxPolygon.geometry)
    );
    this.result = turf.bboxClip(turf.polygon(this.coordinates), this.extent);
    this.clipGeometry = new GeoJSON().readGeometry(
      JSON.stringify(this.result.geometry)
    );

    this.clipStyle = new Style({
      stroke: new Stroke({
        color: "#ff0000",
        width: 2,
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
      <a-row>
        <select v-model="type">
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row><json :data="result"></json> </a-row>
    </drawer>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadyDrawSource">
        <vue2ol-interaction-draw
          :active="true"
          :type="type"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="bboxGeometry" key="2" :geometry="bboxGeometry">
        </vue2ol-feature>
        <vue2ol-feature
          v-if="clipGeometry"
          key="3"
          :geometry="clipGeometry"
          :style-obj="clipStyle"
        >
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
export default {
  data() {
    return {
      extent: [
        119.77396488189699, 27.771647453308105, 120.26010990142824,
        28.22620677947998,
      ],
      bboxGeometry: null,
      drawGeometry: null,
      clipGeometry: null,
      clipStyle: null,
      type: "LineString",
      source: null,
      result: null,
      visible: true,
    };
  },
  watch: {
    drawGeometry() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.drawGeometry) {
        return;
      }
      return `let polygon=${new GeoJSON().writeGeometry(this.drawGeometry)};
let extent = ${JSON.stringify(this.extent)}
let result = turf.bboxClip(polygon,extent);`;
    },
  },
  mounted() {
    this.clipStyle = new Style({
      stroke: new Stroke({
        color: "#ff0000",
        width: 2,
      }),
    });

    let bboxPolygon = turf.bboxPolygon(this.extent);

    this.bboxGeometry = new GeoJSON().readGeometry(
      JSON.stringify(bboxPolygon.geometry)
    );
  },
  methods: {
    handleDrawEnd(e) {
      this.source.clear();
      this.drawGeometry = e.feature.getGeometry();
    },
    init() {
      this.result = turf.bboxClip(
        JSON.parse(new GeoJSON().writeGeometry(this.drawGeometry)),
        this.extent
      );
      this.clipGeometry = new GeoJSON().readGeometry(
        JSON.stringify(this.result.geometry)
      );
    },
    handleReadyDrawSource(mapObject) {
      this.source = mapObject;
    },
  },
};
</script>
```

:::
