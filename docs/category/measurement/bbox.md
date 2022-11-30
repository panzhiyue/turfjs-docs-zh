# 计算边界(bbox)

```
> npm install @turf/bbox
```

> Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
>
> 传入任意 GeoJSON 对象，计算并返回边界框(bbox)

> 边界框是由右上角的坐标和左下角的坐标组成的一位数组

**参数**

| 参数    | 类型                                     | 描述                   |
| :------ | :--------------------------------------- | :--------------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 一个任意类型的 GeoJSON |

**返回**

[bbox](../other/type.html#bbox)

**示例**

```js
var line = turf.lineString([
  [-74, 40],
  [-78, 42],
  [-82, 35],
]);
var bbox = turf.bbox(line); // [-82, 35, -74, 42]
var bboxPolygon = turf.bboxPolygon(bbox);
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
          >几何：<geojson-text
            :type.sync="type1"
            @change="handleChange"
          ></geojson-text></a-space
      ></a-row>
      <a-row> {{ result }} </a-row>
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
      turfObj1: null,
      features1: [],
    };
  },
  computed: {
    code() {
      return `let value = turf.bbox(${JSON.stringify(this.turfObj1)});`;
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

        this.result = turf.bbox(this.turfObj1);
        this.features = getFeaturesFromTurf(turf.bboxPolygon(this.result));
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
      <a-row
        ><select v-model="type">
          <option value="Point">点</option>
          <option value="LineString">线</option>
          <option value="Polygon">面</option>
        </select></a-row
      >
      <a-row> {{ extent }} </a-row>
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
        <vue2ol-feature v-if="extent">
          <vue2ol-geom-polygon
            :coordinates="[
              [
                [extent[0], extent[3]],
                [extent[2], extent[3]],
                [extent[2], extent[1]],
                [extent[0], extent[1]],
              ],
            ]"
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
      extent: null,
      geometry: null,
      type: "LineString",
      visible: true,
    };
  },
  watch: {
    geometry() {
      this.init();
    },
  },
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      return `let value = turf.bbox(
  ${new GeoJSON().writeGeometry(this.geometry)}
);`;
    },
  },
  mounted() {},
  methods: {
    handleDrawEnd(e) {
      this.geometry = e.feature.getGeometry();
    },
    init() {
      if (!this.geometry) {
        return;
      }
      let value = turf.bbox(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry))
      );
      this.extent = value;
    },
  },
};
</script>
```

:::
