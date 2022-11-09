# 计算多点中心(centerOfMass)

> Takes any Feature or a FeatureCollection and returns its center of mass using this formula: Centroid of Polygon.
> 
> 获取任何`Feature`或`FeatureCollection`，并调用`centerOfMass`方法返回其中心。

**参数**

| 参数       | 类型    | 描述                                                |
| :--------- | :------ | :-------------------------------------------------- |
| geojson    | GeoJSON | GeoJSON to be centered                              |
| properties | Object  | an Object that is used as the Feature 's properties |

**返回**

Feature `<Point>` - the center of mass

**示例**

```js
var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);

var center = turf.centerOfMass(polygon);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/centerOfMass.d807f8b0.webp)



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

    let center = turf.centerOfMass(features);
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

**动态绘制点**
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
      let center = turf.centerOfMass(features);
      this.center = center.geometry.coordinates;
    },
  },
};
</script>
```

:::



**动态绘制线**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          type="LineString"
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
        return turf.lineString(item);
      });
      let features = turf.featureCollection(ps);
      let center = turf.centerOfMass(features);
      this.center = center.geometry.coordinates;
    },
  },
};
</script>
```

:::



**动态绘制面**
::: demo

```vue
<template>
  <base-map>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          type="Polygon"
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
        return turf.polygon(item);
      });
      let features = turf.featureCollection(ps);
      let center = turf.centerOfMass(features);
      this.center = center.geometry.coordinates;
    },
  },
};
</script>
```

:::
