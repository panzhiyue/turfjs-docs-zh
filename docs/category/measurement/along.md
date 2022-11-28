# 计算延长点(along)

```
> npm install @turf/along
```

> Takes a LineString and returns a Point at a specified distance along the line.
>
> 接收一个线段，获取并返回线段上指定距离的点。

> 注意:距离是从起点开始计算的，如果距离超过线段的长度，会返回终点的 GeoJSON

**参数**

| 参数     | 类型                                                                                                                               | 描述     |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------- |
| line     | [LineString](../other/type.html#linestring)\|[Feature](../other/type.html#feature) \<[LineString](../other/type.html#linestring)\> | 输入线段 |
| distance | number                                                                                                                             | 沿线距离 |
| options  | Object                                                                                                                             | 可配置项 |

**options 选项**

| 属性  | 类型                                        | 默认值       | 描述     |
| :---- | :------------------------------------------ | :----------- | :------- |
| units | [LengthUnits](../other/units.html#长度单位) | 'kilometers' | 长度单位 |

**返回**

[Feature](../other/type.html#feature) \<[Point](../other/type.html#point)\> - Point distance units along the line

[Feature](../other/type.html#feature) \<[Point](../other/type.html#point)\> - 沿线指定距离点

**示例**

```js
var line = turf.lineString([
  [-83, 30],
  [-84, 36],
  [-78, 41],
]);
var options = { units: "miles" };

var along = turf.along(line, 200, options);
/*
{
  type: "Feature",
  geometry: {
    coordinates: [-83.4608648621918, 32.8678095806294],
    type: "Point"
  },
  properties: {}
}
*/
```

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
          >几何：<geojson-type :value.sync="type1"></geojson-type></a-space
      ></a-row>
      <a-row>
        <a-space><json :data="result"></json></a-space>
      </a-row>
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
import { getTestOL, getTestTurf, getTestFeatures } from "../../utils/index.js";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      visible: true,
      result: null,
      type1: "LineString",
      features: [],
      styleRed,
    };
  },
  computed: {
    code() {
      return `let options = { units: "kilometers" };
var along = turf.along(${JSON.stringify(this.turfObj1)}, 10, options);`;
    },
    olObj1() {
      return getTestOL(this.type1);
    },
    turfObj1() {
      return getTestTurf(this.type1);
    },
    features1() {
      return getTestFeatures(this.type1);
    },
  },
  watch: {
    type1() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      try {
        this.features = [];
        this.result = null;

        let options = { units: "kilometers" };
        this.result = turf.along(this.turfObj1, 10, options);
        this.features = getFeaturesFromTurf(this.result);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
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
      <a-row>
        <a-space
          >距离：<a-input-number type="number" v-model="length"
        /></a-space>
      </a-row>
      <a-row>
        <a-space>
          单位：<length-units :value.sync="units"></length-units
        ></a-space>
      </a-row>
      <a-row
        ><select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row><a-checkbox v-model="isGeometry">读取geometry</a-checkbox></a-row>
      <a-row>
        <a-button type="primary" @click="handleSure">确定</a-button>
      </a-row>
      <a-row><json :data="result"></json></a-row>
    </drawer>

    <vue2ol-layer-vector @ready="handleReadDrawLayer">
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
        <vue2ol-feature v-if="marker">
          <vue2ol-geom-point :coordinates="marker"></vue2ol-geom-point>
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
      marker: null,
      length: 10,
      units: "kilometers",
      visible: true,
      result: "",
      type: "LineString",
      isGeometry: false,
      drawLayer: null,
    };
  },
  computed: {
    code() {
      if (!this.feature) {
        return "";
      }
      let g = JSON.parse(new GeoJSON().writeFeature(this.feature));
      if (this.isGeometry) {
        g = g.geometry;
      }
      return `let options = { units: '${this.units}' };
var along = turf.along(
  ${JSON.stringify(g)},
  ${this.length},
  options
);`;
    },
  },
  mounted() {},
  watch: {},
  methods: {
    handleDrawEnd(e) {
      this.drawLayer.getSource().clear();
      this.feature = e.feature;
    },
    handleSure() {
      if (!this.feature) {
        return;
      }
      let g = JSON.parse(new GeoJSON().writeFeature(this.feature));
      if (this.isGeometry) {
        g = g.geometry;
      }
      let options = { units: this.units };
      this.result = turf.along(g, this.length, options);
      this.marker = this.result.geometry.coordinates;
    },
    handleReadDrawLayer(mapObject) {
      this.drawLayer = mapObject;
    },
  },
};
</script>
```

:::
