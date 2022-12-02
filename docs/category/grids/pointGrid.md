# 点网格(pointGrid)

```
> npm install @turf/point-grid
```

> Creates a Point grid from a bounding box, FeatureCollection or Feature.
>
> 接收边界框，返回指定距离排列的点要素集合(`FeatureCollection<Point>`)。

**参数**

| 参数     | 类型   | 描述                  |
| :------- | :----- | :-------------------- |
| bbox     | Array  | [xmin,ymin,xmax,ymax] |
| cellSide | number | 点要素之间的距离      |
| options  | Object | 可配置项              |

**options选项**

| 属性       | 类型                                 | 默认值       | 描述                                                         |
| :--------- | :----------------------------------- | :----------- | :----------------------------------------------------------- |
| units      | string                               | "kilometers" | 单位，可选的有 degrees、radians、miles、kilometers           |
| mask       | (`Feature <(Polygon|MultiPolygon)>`) |              | 如果传递了 Polygon 或 MultiPollygon，则仅在传入的 mask 面要素内创建，如果范围大于 bbox，则相当于不传 |
| properties | Object                               | {}           | 出参的 properties 属性                                       |

**返回**

`FeatureCollection <Point>` - grid of points

`FeatureCollection <Point>` - 网格点集合

**示例**

```js
var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
var cellSide = 3;
var options = { units: "miles" };

var grid = turf.pointGrid(extent, cellSide, options); // 返回点要素集，点与点之间距离三英里
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/pointGrid.9acfdd5c.webp)


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
      return `let result  = turf.pointGrid(${this.bbox},${this.cellSide}, {
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
      this.result = turf.pointGrid(this.bbox, this.cellSide, {
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
