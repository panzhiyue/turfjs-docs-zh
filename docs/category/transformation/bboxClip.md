# 边界裁切(bboxClip)

> Takes a Feature and a bbox and clips the feature to the bbox using lineclip. May result in degenerate edges when clipping Polygons.
>
> 获取一个`Feature`和一个`bbox`，并使用`lineclip`将该`Feature`裁切到`bbox`。在裁剪多边形时可能导致退化边缘。

**参数**

| 参数    | 类型                  | 描述                                   |
| :------ | :-------------------- | :------------------------------------- | ------- | --------------- | --------------------------- |
| feature | `Feature <(LineString | MultiLineString                        | Polygon | MultiPolygon)>` | feature to clip to the bbox |
| bbox    | BBox                  | extent in minX, minY, maxX, maxY order |

**返回**

`Feature <(LineString|MultiLineString|Polygon|MultiPolygon)>` - clipped Feature

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
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/bboxClip.f58ca074.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
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
    };
  },
  mounted() {
    let bboxPolygon = turf.bboxPolygon(this.extent);

    this.bboxGeometry = new GeoJSON().readGeometry(
      JSON.stringify(bboxPolygon.geometry)
    );
    var clipped = turf.bboxClip(turf.polygon(this.coordinates), this.extent);
    this.clipGeometry = new GeoJSON().readGeometry(
      JSON.stringify(clipped.geometry)
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
    <select v-model="type">
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
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
    };
  },
  watch: {
    drawGeometry() {
      this.init();
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
      var clipped = turf.bboxClip(
        JSON.parse(new GeoJSON().writeGeometry(this.drawGeometry)),
        this.extent
      );
      this.clipGeometry = new GeoJSON().readGeometry(
        JSON.stringify(clipped.geometry)
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
