# 计算缓冲区(buffer)

```
npm install @turf/buffer
```

> Calculates a buffer for input features for a given radius. Units supported are miles, kilometers, and degrees.
>
> 为给定半径的`Feature`计算一个缓冲区。支持的单位是英里、公里和度数。

**参数**

| 参数    | 类型                                                                                                                                      | 描述                       |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| geojson | [FeatureCollection](../other/type.html#featurecollection)\|[Geometry](../other/type.html#geometry)\|[Feature](../other/type.html#feature) | 任意类型 的 GeoJSON        |
| radius  | number                                                                                                                                    | 绘制缓冲区的距离(允许负值) |
| options | Object                                                                                                                                    | 可配置项                   |

**options 选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| steps | number | 64         | 步数                                               |

**返回**

[FeatureCollection](../other/type.html#featurecollection)\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\>|[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\>\|undefined - buffered features

[FeatureCollection](../other/type.html#featurecollection)\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\>|[Feature](../other/type.html#feature)\<[Polygon](../other/type.html#polygon)\|[MultiPolygon](../other/type.html#multipolygon)\>\|undefined - 缓冲要素

**示例**

```js
var point = turf.point([-90.54863, 14.616599]);
var buffered = turf.buffer(point, 500, { units: "miles" });
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/buffer.7bed7069.webp)

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
      <a-row> <json :data="result"></json> </a-row>
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
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      result: null,
      visible: true,
      type1: "LineString",
      features: [],
      styleRed,
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      return `let f = ${JSON.stringify(this.turfObj1)};
let result = turf.buffer(f, 2, {
  units: "miles",
});`;
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

        this.result = turf.buffer(this.turfObj1, 2, {
          units: "miles",
        });
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
      <a-row>
        <select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row><json :data="result"></json> </a-row>
    </drawer>

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
        <vue2ol-feature v-if="bufferCoordinates">
          <vue2ol-geom-polygon
            :coordinates="bufferCoordinates"
          ></vue2ol-geom-polygon>
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
      geometry: null,
      type: "LineString",
      bufferCoordinates: null,
      length: 2,
      units: "kilometers",
      result: null,
      visible: true,
    };
  },
  watch: {
    geometry() {
      this.init();
    },
    length() {
      this.init();
    },
    units() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let geometry = ${new GeoJSON().writeGeometry(this.geometry)};
let result = turf.buffer(
  geometry,
  ${this.length},
  {
    units: '${this.units}'',
  }
);`;
    },
  },
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      this.result = turf.buffer(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry)),
        this.length,
        {
          units: this.units,
        }
      );
      this.bufferCoordinates = this.result.geometry.coordinates;
    },
  },
};
</script>
```

:::
