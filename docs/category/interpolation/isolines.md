# 等值线(isolines)

```
> npm install @turf/isolines
```

> Takes a grid FeatureCollection of Point features with z-values and an array of value breaks and generates isolines.
>
> 接收一组正方形或矩形网格带有 z 值的点要素集(`FeatureCollection<Point>`)，生成并返回等高线。

**参数**

| 参数      | 类型                        | 描述                          |
| :-------- | :-------------------------- | :---------------------------- |
| pointGrid | `FeatureCollection <Point>` | 输入点要素集-必须是方形或矩形 |
| breaks    | Array                       | 分级的数组                    |
| options   | Object                      | 可配置项                      |

**options 选项**

| 属性             | 类型   | 默认值      | 描述                                                                                                                                        |
| :--------------- | :----- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| zProperty        | string | "elevation" | 绘制等值线的 z 属性名                                                                                                                       |
| commonProperties | Object | {}          | 每个要素的属性                                                                                                                              |
| breaksProperties | Array  | []          | GeoJSON properties passed, in order, to the correspondent isoline; the breaks array will define the order in which the isolines are created |

**返回**

`FeatureCollection <MultiLineString>` - a FeatureCollection of MultiLineString features representing isolines

`FeatureCollection <MultiLineString>` - 表示等值线的线要素集

**示例**

```js
// create a grid of points with random z-values in their properties
var extent = [0, 30, 20, 50];
var cellWidth = 100;
var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });

for (var i = 0; i < pointGrid.features.length; i++) {
  pointGrid.features[i].properties.temperature = Math.random() * 10;
}
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var lines = turf.isolines(pointGrid, breaks, { zProperty: "temperature" });
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/isolines.1a393e92.webp)

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
      return `// create a grid of points with random z-values in their properties
var extent = [0, 30, 20, 50];
var cellWidth = 100;
var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });
for (var i = 0; i < pointGrid.features.length; i++) {
  pointGrid.features[i].properties.temperature = Math.random() * 10;
}
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var lines = turf.isolines(pointGrid, breaks, {
  zProperty: "temperature",
});`;
    },
  },
  mounted() {
    // create a grid of points with random z-values in their properties
    var extent = [0, 30, 20, 50];
    var cellWidth = 100;
    var pointGrid = turf.pointGrid(extent, cellWidth, { units: "miles" });

    for (var i = 0; i < pointGrid.features.length; i++) {
      pointGrid.features[i].properties.temperature = Math.random() * 10;
    }
    var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.result = turf.isolines(pointGrid, breaks, {
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
var lines = turf.isolines(pointGrid, ${this.breaks.split(",")}, {
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

      this.result = turf.isolines(pointGrid, this.breaks.split(","), {
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