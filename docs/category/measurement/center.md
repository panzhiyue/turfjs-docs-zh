# 计算中心点(center)

> Takes a Feature or FeatureCollection and returns the absolute center point of all features.
> 
> 获取一个`Feature`或`FeatureCollection`，并返回所有`Feature`的绝对中心点。

**参数**

| 参数    | 类型    | 描述                           |
| :------ | :------ | :----------------------------- |
| geojson | GeoJSON | GeoJSON to be centered         |
| options | Object  | Optional parameters: see below |

**options 选项**

| 属性       | 类型   | 默认值 | 描述                          |
| :--------- | :----- | :----- | :---------------------------- |
| properties | Object | {}     | an Object that is used as the |

**返回**

Feature `<Point>` - a Point feature at the absolute center point of all input features

**示例**

```js
var features = turf.featureCollection([
  turf.point([-97.522259, 35.4691]),
  turf.point([-97.502754, 35.463455]),
  turf.point([-97.508269, 35.463245]),
]);

var center = turf.center(features);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/center.57e658f3.webp)

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
        <vue2ol-feature v-if="center" :style-obj="centerStyle">
          <vue2ol-geom-point :coordinates="center"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke, Text, Circle, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates: [
        [119.72040653228761, 28.17103910446167],
        [119.72727298736574, 27.908740520477295],
        [120.22852420806886, 28.13808012008667],
      ],
      center: null,
      centerStyle: null,
    };
  },
  mounted() {
    let ps = this.coordinates.map((item) => {
      return turf.point(item);
    });
    let features = turf.featureCollection(ps);

    let center = turf.center(features);
    this.center = center.geometry.coordinates;

    this.centerStyle = new Style({
      image: new Circle({
        radius: 8,
        stroke: new Stroke({
          color: "#ff0000",
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
        <vue2ol-feature v-if="center" :style-obj="centerStyle">
          <vue2ol-geom-point :coordinates="center"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
import { Style, Stroke, Text, Circle, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates: [],
      center: null,
      centerStyle: null,
    };
  },
  mounted() {
    this.centerStyle = new Style({
      image: new Circle({
        radius: 8,
        stroke: new Stroke({
          color: "#ff0000",
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.5)",
        }),
      }),
    });
  },
  methods: {
    handleDrawEnd(e) {
      this.coordinates.push(e.feature.getGeometry().getCoordinates());
      this.init();
    },
    init() {
      let ps = this.coordinates.map((item) => {
        return turf.point(item);
      });
      let features = turf.featureCollection(ps);
      let center = turf.center(features);
      this.center = center.geometry.coordinates;
    },
  },
};
</script>
```

:::
