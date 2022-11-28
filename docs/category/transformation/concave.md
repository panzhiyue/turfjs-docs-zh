# 生成凹多边形(concave)

```
> npm install @turf/concave
```

> Takes a set of points and returns a concave hull Polygon or MultiPolygon. Internally, this uses turf-tin to generate geometries.
>
> 接收一组点并返回一个凹`Polygon`或`MultiPolygon`。在内部，它使用`turf-tin`生成几何图形。

> 值得注意的是，少于等于两个点要素都会返回 null，数量和 maxEdge 都会影响

**参数**

| 参数    | 类型                                                         | 描述       |
| :------ | :----------------------------------------------------------- | :--------- |
| points  | [FeatureCollection](../other/type.html#featurecollection)\<[Point](../other/type.html#point)\> | 若干点要素 |
| options | Object                                                       | 可配置项   |

**options 选项**

| 属性    | 类型   | 默认值     | 描述                                               |
| :------ | :----- | :--------- | :------------------------------------------------- |
| maxEdge | number | Infinity   | 以 units 为单位的多边形边缘的长度                  |
| units   | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |

**返回**

[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\>|null - a concave hull (null value is returned if unable to compute hull)

[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\>|null - 凹型多边形，若无法计算则返回 null

**示例**

```js
var points = turf.featureCollection([
  turf.point([-63.601226, 44.642643]),
  turf.point([-63.591442, 44.651436]),
  turf.point([-63.580799, 44.648749]),
  turf.point([-63.573589, 44.641788]),
  turf.point([-63.587665, 44.64533]),
  turf.point([-63.595218, 44.64765]),
]);
var options = { units: "miles", maxEdge: 1 };

var hull = turf.concave(points, options);
/*
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-63.591442, 44.651436],
        [-63.580799, 44.648749],
        [-63.573589, 44.641788],
        [-63.587665, 44.64533],
        [-63.601226, 44.642643],
        [-63.591442, 44.651436]
      ]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/concave.b58bd36a.webp)

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
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-for="coordinate in coordinates">
          <vue2ol-geom-point :coordinates="coordinate"></vue2ol-geom-point>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-polygon
            :coordinates="concaveCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      coordinates: [
        [119.72452640533449, 27.981138706207275],
        [119.79044437408449, 28.0978684425354],
        [119.89481449127199, 28.1857590675354],
        [120.06235599517824, 28.06765604019165],
        [120.16397953033449, 27.871275424957275],
        [119.94287967681886, 27.9715256690979],
      ],

      concaveCoordinates: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      let points = turf.featureCollection(
        this.coordinates.map((coordinate) => {
          return turf.point(coordinate);
        })
      );
      return `let points = ${JSON.stringify(points)};
let result = turf.concave(points, {
  units: "miles",
  maxEdge: 20,
});`;
    },
  },
  mounted() {
    let points = turf.featureCollection(
      this.coordinates.map((coordinate) => {
        return turf.point(coordinate);
      })
    );
    this.result = turf.concave(points, {
      units: "miles",
      maxEdge: 20,
    });
    this.concaveCoordinates = this.result.geometry.coordinates;
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
      <a-row>距离：<a-input-number v-model="length" /></a-row>
      <a-row>单位：<length-units :value.sync="units"></length-units></a-row>
      <a-row> <json :data="result"></json> </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          type="Point"
          :active="true"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature v-if="this.concaveCoordinates">
          <vue2ol-geom-polygon
            :coordinates="concaveCoordinates"
          ></vue2ol-geom-polygon>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      coordinates: [],

      concaveCoordinates: null,
      length: 20,
      units: "miles",
      result: null,
      visible: true,
    };
  },
  watch: {
    units() {
      this.init();
    },
    length() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (this.coordinates.length < 3) {
        return;
      }
      let points = turf.featureCollection(
        this.coordinates.map((coordinate) => {
          return turf.point(coordinate);
        })
      );
      return `let points = ${JSON.stringify(points)};
let result = turf.concave(points, {
  units: '${this.units}'',
  maxEdge: ${this.length},
});`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.coordinates = this.coordinates.concat([
        e.feature.getGeometry().getCoordinates(),
      ]);
      this.init();
    },
    init() {
      if (this.coordinates.length < 3) {
        return;
      }
      let points = turf.featureCollection(
        this.coordinates.map((coordinate) => {
          return turf.point(coordinate);
        })
      );

      this.result = turf.concave(points, {
        units: this.units,
        maxEdge: this.length,
      });

      this.concaveCoordinates = this.result
        ? this.result.geometry.coordinates
        : null;
    },
  },
};
</script>
```

:::
