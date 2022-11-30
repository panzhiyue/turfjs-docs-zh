# 计算位于要素或要素集表面的点(pointOnFeature)

```
> npm install @turf/point-on-feature
```

> Takes a Feature or FeatureCollection and returns a Point guaranteed to be on the surface of the feature.
>
> 接收任意一个GeoJSON对象，计算并返回内部一点。
>
> 注意：返回的点要素是固定的，并非随机

> 值得注意的是，返回的点要素是固定的，并非随机

**参数**

| 参数    | 类型                                     | 描述              |
| :------ | :--------------------------------------- | :---------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 任意 GeoJSON 对象 |

**返回**

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - a point on the surface of input

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - 在输入要素表面的一个点

**示例**

```js
var polygon = turf.polygon([
  [
    [116, -36],
    [131, -32],
    [146, -43],
    [155, -25],
    [133, -9],
    [111, -22],
    [116, -36],
  ],
]);

var pointOnPolygon = turf.pointOnFeature(polygon);

/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [133, -26]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/pointOnFeature.f9a83bd6.webp)

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
let result = turf.pointOnFeature(features);`;
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

        this.result = turf.pointOnFeature(this.turfObj1);
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

**动态绘制点**
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
      result: null,
      visible: true,
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
  computed: {
    code() {
      let ps = this.coordinates.map((item) => {
        return turf.point(item);
      });
      let features = turf.featureCollection(ps);
      return `let features = ${JSON.stringify(features)};
let result = turf.pointOnFeature(features);`;
    },
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
      let center = turf.pointOnFeature(features);
      this.result = center;
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
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      let ps = this.coordinates.map((item) => {
        return turf.lineString(item);
      });
      let features = turf.featureCollection(ps);
      return `let features = ${JSON.stringify(features)};
let result = turf.pointOnFeature(features);`;
    },
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
      let center = turf.pointOnFeature(features);
      this.result = center;
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
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      let ps = this.coordinates.map((item) => {
        return turf.polygon(item);
      });
      let features = turf.featureCollection(ps);
      return `let features = ${JSON.stringify(features)};
let result = turf.pointOnFeature(features);`;
    },
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
      let center = turf.pointOnFeature(features);
      this.result = center;
      this.center = center.geometry.coordinates;
    },
  },
};
</script>
```

:::
