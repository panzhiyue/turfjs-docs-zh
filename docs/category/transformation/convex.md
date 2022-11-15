# 生成凸多边形(convex)

> Takes a Feature or a FeatureCollection and returns a convex hull Polygon.
>
> 获取一个`Feature`或`FeatureCollection`，并返回一个凸多边形。

**参数**

| 参数    | 类型    | 描述                               |
| :------ | :------ | :--------------------------------- |
| geojson | GeoJSON | input Feature or FeatureCollection |
| options | Object  | Optional parameters: see below     |

**options 选项**

| 属性      | 类型   | 默认值   | 描述                                    |
| :-------- | :----- | :------- | :-------------------------------------- |
| concavity | number | Infinity | 1 - thin shape. Infinity - convex hull. |

**返回**

`Feature <Polygon>` - a convex hull

**示例**

```js
var points = turf.featureCollection([
  turf.point([10.195312, 43.755225]),
  turf.point([10.404052, 43.8424511]),
  turf.point([10.579833, 43.659924]),
  turf.point([10.360107, 43.516688]),
  turf.point([10.14038, 43.588348]),
  turf.point([10.195312, 43.755225]),
]);

var hull = turf.convex(points);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/convex.e13d31f8.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
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
    };
  },
  mounted() {
    let points = turf.featureCollection(
      this.coordinates.map((coordinate) => {
        return turf.point(coordinate);
      })
    );

    this.concaveCoordinates = turf.convex(points, {
      units: "miles",
      maxEdge: 20,
    }).geometry.coordinates;
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
    concavity<input type="number" v-model="concavity" />
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
      concavity: 20,
    };
  },
  watch: {
    concavity() {
      this.init();
    },
  },
  mounted() {},
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

      let result = turf.convex(points, {
        concavity: this.concavity,
      });

      this.concaveCoordinates = result ? result.geometry.coordinates : null;
    },
  },
};
</script>
```

:::
