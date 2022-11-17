# 根据边界计算最小正方形边界(square)

> Takes a bounding box and calculates the minimum square bounding box that would contain the input.
> 
> 获取边框并计算包含输入的最小正方形边框。

**参数**

| 参数 | 类型 | 描述                                     |
| :--- | :--- | :--------------------------------------- |
| bbox | BBox | extent in west, south, east, north order |

**返回**

BBox - a square surrounding bbox

**示例**

```js
var bbox = [-20, -20, -15, 0];
var squared = turf.square(bbox);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/square.09e05daf.webp)

**基础用法**
::: demo

```vue
<template>
  <base-map>
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
    };
  },
  mounted() {
    let extent = [
      119.74649906158449, 27.858744144439697, 120.13926029205324,
      28.134775638580322,
    ];
    let bboxPolygon = turf.bboxPolygon(turf.square(extent));

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
    {{ extent
    }}<select v-model="type">
      <option value="Point">点</option>
      <option value="LineString">线</option>
      <option value="Polygon">面</option>
    </select>
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
    };
  },
  watch: {
    geometry() {
      this.init();
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

      let bboxPolygon = turf.bboxPolygon(turf.square(this.extent));

      this.bboxGeometry = new GeoJSON().readGeometry(
        JSON.stringify(bboxPolygon.geometry)
      );
    },
  },
};
</script>
```

:::
