# 三角形网格(triangleGrid)

```
> npm install @turf/triangle-grid
```

> Takes a bounding box and a cell depth and returns a set of triangular polygons in a grid.
>
> 接收一个边界框(BBox),单元格长度，创建并返回网格中的三角形多边形集合(`FeatureCollection<Polygon>`)。

**参数**

| 参数     | 类型   | 描述                     |
| :------- | :----- | :----------------------- |
| bbox     | BBox   | [xmin,ymin,xmax,ymax]    |
| cellSide | number | 三角形面要素的直角边边长 |
| options  | Object | 可配置项                 |

**options选项**

| 属性       | 类型                                 | 默认值       | 描述                                                         |
| :--------- | :----------------------------------- | :----------- | :----------------------------------------------------------- |
| units      | string                               | "kilometers" | 单位，可选的有 degrees、radians、miles、kilometers           |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |              | 如果传递了 Polygon 或 MultiPollygon，则仅在传入的 mask 面要素内创建，如果范围大于 bbox，则相当于不传 |
| properties | Object                               | {}           | 出参 的 properties 属性                                      |

**返回**

`FeatureCollection <Polygon>` - grid of polygons

`FeatureCollection <Polygon>` - 网格面要素集合

**示例**

```js
var bbox = [-95, 30 ,-85, 40];
var cellSide = 50;
var options = {units: 'miles'};

var triangleGrid = turf.triangleGrid(bbox, cellSide, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/triangleGrid.99926a65.webp)

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
      <a-row>
        <a-space><bbox :value.sync="bbox"></bbox></a-space
      ></a-row>
      <a-row
        >cellSide：<a-input-number v-model="cellSide"></a-input-number
      ></a-row>
      <a-row>
        单位(units)：<length-units :value.sync="units"></length-units>
      </a-row>
      <a-row
        >mask：<draw :type.sync="type1" @draw-end="handleDrawEnd1"></draw
      ></a-row>
      <a-row>
        <a-space><json :data="result" /></a-space>
      </a-row>
    </drawer>
    <vue2ol-layer-vector :zIndex="20" v-if="features">
      <vue2ol-source-vector :features="features"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { GeoJSON } from "ol/format";
export default {
  data() {
    return {
      visible: true,
      result: null,
      features: null,
      bbox: [
        119.8226308822632, 27.863550662994385, 120.19891262054445,
        28.20275354385376,
      ],
      cellSide: 1,
      units: "miles",
      type1: "Polygon",
      feature1: null,
    };
  },
  computed: {
    code() {
      if (!this.turfObj1) {
        return;
      }
      return `let result  = turf.triangleGrid(${this.bbox},${this.cellSide}, {
  units: '${this.units}',
  mask:${JSON.stringify(this.turfObj1)}
});`;
    },
    turfObj1() {
      if (this.feature1) {
        return JSON.parse(new GeoJSON().writeFeature(this.feature1));
      }
      return null;
    },
  },
  watch: {
    bbox() {
      this.init();
    },
    cellSide() {
      this.init();
    },
    units() {
      this.init();
    },
    feature1() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.result = turf.triangleGrid(this.bbox, this.cellSide, {
        triangles: this.triangles,
        units: this.units,
        mask: this.turfObj1,
      });
      this.features = new GeoJSON().readFeatures(this.result);
    },
    handleDrawEnd1(feature) {
      this.feature1 = feature;
    },
  },
};
</script>
```

:::
