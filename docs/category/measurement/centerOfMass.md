# 计算多点中心(centerOfMass)

```
> npm install @turf/center-of-mass
```

> Takes any Feature or a FeatureCollection and returns its center of mass using this formula: Centroid of Polygon.
>
> 接收任意GeoJSON对象，并使用以下公式返回其质心：多边形的质心。

**参数**

| 参数       | 类型                                     | 描述                            |
| :--------- | :--------------------------------------- | :------------------------------ |
| geojson    | [GeoJSON](../other/type.html#allgeojson) | 任意 geojson 对象               |
| properties | Object                                   | 输出 geojson 的 properties 属性 |

**返回**

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - the center of mass

[Feature](../other/type.html#feature)\<[Point](../other/type.html#point)\> - 质心

**示例**

```js
var polygon = turf.polygon([
  [
    [-81, 41],
    [-88, 36],
    [-84, 31],
    [-80, 33],
    [-77, 39],
    [-81, 41],
  ],
]);

var center = turf.centerOfMass(polygon, {
  desc: "center of mass",
});
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-82.3109243697479, 36.134453781512605]
  },
  properties: {
    desc: "center of mass"
  }
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/centerOfMass.d807f8b0.webp)

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
let result = turf.centerOfMass(features);`;
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

        this.result = turf.centerOfMass(this.turfObj1);
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
      visible: true,
      result: null,
    };
  },
  computed: {
    code() {
      let ps = this.coordinates.map((item) => {
        return turf.point(item);
      });
      let features = turf.featureCollection(ps);
      return `let features = ${JSON.stringify(features)};
let result = turf.centerOfMass(features);`;
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
        return turf.point(item);
      });
      let features = turf.featureCollection(ps);
      this.result = turf.centerOfMass(features);
      this.center = this.result.geometry.coordinates;
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
      visible: true,
      result: null,
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
        return turf.lineString(item);
      });
      let features = turf.featureCollection(ps);
      return `let features = ${JSON.stringify(features)};
let result = turf.centerOfMass(features);`;
    },
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
      this.result = turf.centerOfMass(features);
      this.center = this.result.geometry.coordinates;
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
      visible: true,
      result: null,
    };
  },
  computed: {
    code() {
      let ps = this.coordinates.map((item) => {
        return turf.polygon(item);
      });
      let features = turf.featureCollection(ps);
      return `let features = ${JSON.stringify(features)};
let result = turf.centerOfMass(features);`;
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
      this.result = turf.centerOfMass(features);
      this.center = this.result.geometry.coordinates;
    },
  },
};
</script>
```

:::
