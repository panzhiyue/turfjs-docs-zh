# 计算多边形切线点(polygonTangents)

```
> npm install @turf/polygon-tangents
```

> Finds the tangents of a (Multi)Polygon from a Point.
>
> 接收一个点和一个(Multi)Polygon，计算二者的切线，返回切线在(Multi)Polygon 上的点

**参数**



| 参数    | 类型             | 描述           |
| ------- |  -------------- | ---------------- |
| pt      | [Coor](../other/type.html#coor) | 参与计算的点   |
| polygon | [Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\> | 参与计算的多边形 |

**返回**

[FeatureCollection](../other/type.html#featurecollection)\<[Point](../other/type.html#point)\> - Feature Collection containing the two tangent points

[FeatureCollection](../other/type.html#featurecollection)\<[Point](../other/type.html#point)\> - 包含两个切点的要素集合

**示例**

```js
var polygon = turf.polygon([
  [
    [11, 0],
    [22, 4],
    [31, 0],
    [31, 11],
    [21, 15],
    [11, 11],
    [11, 0],
  ],
]);
var point = turf.point([61, 5]);

var tangents = turf.polygonTangents(point, polygon);
/*
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "point",
        coordinates: [21, 15]
      },
      properties: {}
    },
    {
      type: "Feature",
      geometry: {
        type: "point",
        coordinates: [31, 0]
      },
      properties: {}
    }
  ]
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/polygonTangents.b465321f.webp)

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
          <vue2ol-geom-polygon :coordinates="coordinates"></vue2ol-geom-polygon>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-point :coordinates="coordinates2"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector :style-obj="tangentsStyle">
      <vue2ol-source-vector :features="tangentsFeatures">
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Circle, Stroke, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates: [
        [
          [119.74649906158449, 28.134775638580322],
          [119.77396488189699, 27.921915531158447],
          [120.06372928619386, 27.858744144439697],
          [120.13926029205324, 27.989206790924072],
          [119.74649906158449, 28.134775638580322],
        ],
      ],
      coordinates2: [120.32465457916261, 28.229897499084473],
      tangentsFeatures: null,
      tangentsStyle: null,
      result: null,
      visible: true,
    };
  },
  computed:{
    code(){
      return `let result = turf.polygonTangents(
  turf.point(${JSON.stringify(this.coordinates2)}),
  turf.polygon(${JSON.stringify(this.coordinates)})
);`
    }
  },
  mounted() {
    this.result = turf.polygonTangents(
      turf.point(this.coordinates2),
      turf.polygon(this.coordinates)
    );

    this.tangentsFeatures = new GeoJSON().readFeatures(
      JSON.stringify(this.result)
    );

    this.tangentsStyle = new Style({
      image: new Circle({
        radius: 6,
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.5)",
        }),
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
      <a-row
        ><a-button type="primary" @click="handlePoint">点</a-button
        ><a-button type="primary" @click="handlePolygon">面</a-button></a-row
      >
      <a-row> <json :data="result"></json></a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadyPointSource">
        <vue2ol-interaction-draw
          type="Point"
          :active="isDrawPoint"
          @drawend="handleDrawEndPoint"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector>
      <vue2ol-source-vector @ready="handleReadyPolygonSource">
        <vue2ol-interaction-draw
          type="Polygon"
          :active="isDrawPolygon"
          @drawend="handleDrawEndPolygon"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>

    <vue2ol-layer-vector :style-obj="tangentsStyle">
      <vue2ol-source-vector :features="tangentsFeatures">
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Circle, Stroke, Fill } from "ol/style";
export default {
  data() {
    return {
      isDrawPolygon: false,
      isDrawPoint: false,
      result: null,
      visible: true,
      pointGeometry: null,
      polygonGeometry: null,
      pointSource: null,
      polygonSource: null,
      tangentsFeatures: null,
      tangentsStyle: null,
    };
  },
  watch: {
    pointGeometry() {
      this.init();
    },
    polygonGeometry() {
      this.init();
    },
  },
  mounted() {
    this.tangentsStyle = new Style({
      image: new Circle({
        radius: 6,
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.5)",
        }),
      }),
    });
  },
  computed: {
    code() {
      if (!this.pointGeometry || !this.polygonGeometry) {
        return;
      }
      return `let result = turf.polygonTangents(
  turf.point(${JSON.stringify(this.pointGeometry.getCoordinates())}),
  turf.polygon(${JSON.stringify(this.polygonGeometry.getCoordinates())})
);`;
    },
  },
  methods: {
    init() {
      if (!this.pointGeometry || !this.polygonGeometry) {
        return;
      }
      this.result = turf.polygonTangents(
        turf.point(this.pointGeometry.getCoordinates()),
        turf.polygon(this.polygonGeometry.getCoordinates())
      );

      this.tangentsFeatures = new GeoJSON().readFeatures(
        JSON.stringify(this.result)
      );
    },
    handlePoint() {
      this.isDrawPoint = !this.isDrawPoint;
      this.isDrawPolygon = false;
    },
    handlePolygon() {
      this.isDrawPolygon = !this.isDrawPolygon;
      this.isDrawPoint = false;
    },
    handleDrawEndPoint(e) {
      this.pointSource.clear();
      this.pointGeometry = e.feature.getGeometry();
    },
    handleDrawEndPolygon(e) {
      this.polygonSource.clear();
      this.polygonGeometry = e.feature.getGeometry();
    },
    handleReadyPointSource(mapObject) {
      this.pointSource = mapObject;
    },
    handleReadyPolygonSource(mapObject) {
      this.polygonSource = mapObject;
    },
  },
};
</script>
```

:::
