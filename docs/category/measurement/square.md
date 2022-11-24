# 根据边界计算最小正方形边界(square)

```
> npm install @turf/square
```

> Takes a bounding box and calculates the minimum square bounding box that would contain the input.
>
> 接收 bbox(边界框) 计算并返回包含入参的最小正方形边界

**参数**

| 参数 | 类型 | 描述                  |
| :--- | :--- | :-------------------- |
| bbox | BBox | [xmin,ymin,xmax,ymax] |

**返回**

BBox - a square surrounding bbox

BBox - 一个正方形的 bbox

**示例**

```js
var bbox = [-20, -20, -15, 0];
var squared = turf.square(bbox); // [-27.5, -20, -7.5, 0]
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/square.09e05daf.webp)

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
        <vue2ol-feature v-if="geometry" :geometry="geometry"></vue2ol-feature>
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
      result: null,
      visible:true
    };
  },
  computed: {
    code() {
      return `let extent = [
  119.74649906158449, 27.858744144439697, 120.13926029205324,
  28.134775638580322,
];
let result = turf.bboxPolygon(turf.square(extent));`;
    },
  },
  mounted() {
    let extent = [
      119.74649906158449, 27.858744144439697, 120.13926029205324,
      28.134775638580322,
    ];
    let bboxPolygon = turf.bboxPolygon(turf.square(extent));
    this.result = bboxPolygon;
    this.geometry = new GeoJSON().readGeometry(
      JSON.stringify(bboxPolygon.geometry)
    );
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
      <a-row> {{ result }} </a-row>
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
        <vue2ol-feature v-if="bboxGeometry" :geometry="bboxGeometry">
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
      bboxGeometry: null,
      visible: true,
      result: null,
    };
  },
  watch: {
    geometry() {
      this.init();
    },
  },
  mounted() {},
  computed: {
    code() {
      if (!this.geometry) {
        return;
      }
      let value = turf.bbox(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry))
      );
      this.extent = value;
      return `let extent = ${JSON.stringify(value)};
let result = turf.square(extent);`;
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
      let value = turf.bbox(
        JSON.parse(new GeoJSON().writeGeometry(this.geometry))
      );
      this.extent = value;
      this.result = turf.square(this.extent);
      let bboxPolygon = turf.bboxPolygon(this.result);

      this.bboxGeometry = new GeoJSON().readGeometry(
        JSON.stringify(bboxPolygon.geometry)
      );
    },
  },
};
</script>
```

:::
