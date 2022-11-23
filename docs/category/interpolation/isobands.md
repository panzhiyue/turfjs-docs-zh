# 等压线(isobands)

```
> npm install @turf/isobands
```

> Takes a grid FeatureCollection of Point features with z-values and an array of value breaks and generates filled contour isobands.
>
> 接收点要素集(`FeatureCollection<Point>`)，根据参与分级的属性和分级的数组计算出等值面并返回。

**参数**

| 参数      | 类型                        | 描述           |
| :-------- | :-------------------------- | :------------- |
| pointGrid | `FeatureCollection <Point>` | 传入的点要素集 |
| breaks    | Array                       | 分级的数组     |
| options   | Object                      | 可配置项       |

**options 选项**

| 属性             | 类型   | 默认值      | 描述                                                                                        |
| :--------------- | :----- | :---------- | :------------------------------------------------------------------------------------------ |
| zProperty        | string | "elevation" | 参与分级的属性                                                                              |
| commonProperties | Object | {}          | 每个要素的属性                                                                              |
| breaksProperties | Array  | []          | GeoJSON properties passed, in order, to the correspondent isoband (order defined by breaks) |

**返回**

`FeatureCollection <MultiPolygon>` - a FeatureCollection of MultiPolygon features representing isobands

`FeatureCollection <MultiPolygon>` - 表示等压线的多面要素集合

**示例**

```js
var extent = [0, 30, 20, 50];
var cellWidth = 100;
var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });

for (var i = 0; i < pointGrid.features.length; i++) {
  pointGrid.features[i].properties.temperature = Math.random() * 10;
}
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var lines = turf.isobands(pointGrid, breaks, { zProperty: "temperature" });
```

**基础用法**
::: demo

```vue
<template>
  <base-map :zoom="1">
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
      coordinate: null,
      features: null,
      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `var extent = [0, 30, 20, 50];
var cellWidth = 100;
var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });
for (var i = 0; i < pointGrid.features.length; i++) {
  pointGrid.features[i].properties.temperature = Math.random() * 10;
}
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var lines  = turf.isobands(pointGrid, breaks, {
  zProperty: "temperature",
});`;
    },
  },
  mounted() {
    var extent = [0, 30, 20, 50];
    var cellWidth = 100;
    var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });

    for (var i = 0; i < pointGrid.features.length; i++) {
      pointGrid.features[i].properties.temperature = Math.random() * 10;
    }
    var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.result = turf.isobands(pointGrid, breaks, {
      zProperty: "temperature",
    });

    this.features = new GeoJSON().readFeatures(this.result);
  },
  methods: {},
};
</script>
```

:::

**动态设置**
::: demo

```vue
<template>
  <base-map :zoom="1">
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
          >分级的数组(breaks)：<a-input v-model="breaks"></a-input
        ></a-space>
      </a-row>

      <a-row>
        <a-space
          >参与分级的属性(zProperty)：<a-input v-model="zProperty"></a-input
        ></a-space>
      </a-row>

      <a-row>
        <a-button type="primary" @click="handleSure">确定</a-button>
      </a-row>
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
      breaks: "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
      zProperty: "elevation",
      visible: true,
      features: null,
      result: null,
    };
  },
  computed: {
    code() {
      var extent = [0, 30, 20, 50];
      var cellWidth = 100;
      var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });
      for (var i = 0; i < pointGrid.features.length; i++) {
        pointGrid.features[i].properties[this.zProperty] = Math.random() * 10;
      }
      return `var pointGrid=${JSON.stringify(pointGrid)};
var lines = turf.isobands(pointGrid, ${this.breaks.split(",")}, {
  zProperty: '${this.zProperty}',
});`;
    },
  },
  mounted() {},
  methods: {
    handleSure() {
      var extent = [0, 30, 20, 50];
      var cellWidth = 100;
      var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });

      for (var i = 0; i < pointGrid.features.length; i++) {
        pointGrid.features[i].properties[this.zProperty] = Math.random() * 10;
      }

      this.result = turf.isobands(pointGrid, this.breaks.split(","), {
        zProperty: this.zProperty,
      });
      this.features = new GeoJSON().readFeatures(this.result);
      console.log(this.features);
    },
  },
};
</script>
```

:::
