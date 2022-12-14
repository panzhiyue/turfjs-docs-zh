# 六边形网格(hexGrid)

```
> npm install @turf/hex-grid
```

> Takes a bounding box and the diameter of the cell and returns a FeatureCollection of flat-topped hexagons or triangles ( Polygon features) aligned in an "odd-q" vertical grid as described in Hexagonal Grids.
>
> 接收一个边界框和要生成的单元格的直接，计算并返回平顶六边形或三角形要素集(`FeatureCollection<Polygon>`)
>
> 入参 options 的 triangles 为 true 的这个方法和 triangleGrid 方法的区别：这个方法是基于基于六边形内部切分三角形，另一个是矩形内部切分三角形

**参数**

| 参数     | 类型   | 描述                                           |
| :------- | :----- | :--------------------------------------------- |
| bbox     | BBox   | [xmin,ymin,xmax,ymax]                          |
| cellSide | number | 三角形或六边形的边长，与六边形的外接圆半径重合 |
| options  | Object | 可配置项                                       |

**options 选项**

| 属性       | 类型                | 默认值           | 描述                                               |
| :--------- | :------------------ | :--------------- | :------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| units      | string              | "kilometers"     | 单位，可选的有 degrees、radians、miles、kilometers |
| properties | Object              | {}               | 出参 的 properties 属性                            |
| mask       | (`Feature <(Polygon | MultiPolygon)>`) |                                                    | 如果传递了 Polygon 或 MultiPollygon，则仅在传入的 mask 面要素内创建，如果范围大于 bbox，则相当于不传 |
| triangles  | boolean             | false            | 是否返回三角形而不是六边形                         |

**返回**

`FeatureCollection <Polygon>` - a hexagonal grid

`FeatureCollection <Polygon>` - 网格面要素集合

**示例**

```js
var bbox = [-96, 31, -84, 40];
var cellSide = 50;
var options = { units: "miles" };

var hexgrid = turf.hexGrid(bbox, cellSide, options); // 正六边形的要素集
var hexgrid2 = turf.hexGrid(bbox, cellSide, {
  ...options,
  triangles: true,
  mask: turf.polygon([
    [
      [-91.63, 37.48],
      [-87.75, 37.52],
      [-87.77, 34.29],
      [-92.04, 34.15],
      [-91.63, 37.48],
    ],
  ]),
}); // 仅在mask的坐标范围内生成三角形要素集
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/hexGrid.53be975c.webp)

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
      <a-row>
        是否返回三角形:<a-checkbox v-model="triangles"></a-checkbox>
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
      triangles: false,
      type1: "Polygon",
      feature1: null,
    };
  },
  computed: {
    code() {
      if (!this.turfObj1) {
        return;
      }
      return `let result  = turf.hexGrid(${this.bbox},${this.cellSide}, {
  triangles:${this.triangles},
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
    triangles() {
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
      this.result = turf.hexGrid(this.bbox, this.cellSide, {
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
