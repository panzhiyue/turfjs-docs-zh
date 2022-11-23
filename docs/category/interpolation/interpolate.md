# 插入网格点(interpolate)

```
> npm install @turf/interpolate
```

> Takes a set of points and estimates their 'property' values on a grid using the Inverse Distance Weighting (IDW) method.
> 接收一组点要素集，使用 [反向距离加权(IDW) (opens new window)](https://baike.baidu.com/item/反距离加权插值/3689866?fr=aladdin)方法估算并返回要素集。

**参数**

| 参数     | 类型                        | 描述                 |
| :------- | :-------------------------- | :------------------- |
| points   | `FeatureCollection <Point>` | 传入的要素集         |
| cellSize | number                      | 每个网格点之间的距离 |
| options  | Object                      | 可配置项             |

**options 选项**

| 属性     | 类型   | 默认值       | 描述                                                                                           |
| :------- | :----- | :----------- | :--------------------------------------------------------------------------------------------- |
| gridType | string | "square"     | 出参要素集的要素类型，可选值有："square"(矩形)、"point"(点)、"hex"(六边形)、"triangle"(三角形) |
| property | string | "elevation"  | 参与计算的属性                                                                                 |
| units    | string | "kilometers" | 单位，可选的有 degrees、radians、miles、kilometers                                             |
| weight   | number | 1            | 调节距离衰减权重的指数                                                                         |

**返回**

`FeatureCollection <(Point|Polygon)>` - grid of points or polygons with interpolated 'property'

`FeatureCollection <(Point|Polygon)>` - 具有插值“属性”的点或多边形网格

**示例**

```js
var points = turf.randomPoint(30, { bbox: [50, 30, 70, 50] });

// add a random property to each point
turf.featureEach(points, function (point) {
  point.properties.solRad = Math.random() * 50;
});
var options = { gridType: "points", property: "solRad", units: "miles" };
var grid = turf.interpolate(points, 100, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/interpolate.566a42c7.webp)

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
      visible:true
    };
  },
    computed:{
    code(){
        return `var points = turf.randomPoint(30, { bbox: [50, 30, 70, 50] });
// add a random property to each point
turf.featureEach(points, function (point) {
  point.properties.solRad = Math.random() * 50;
});
var options = { gridType: "points", property: "solRad", units:"miles" };
var grid = turf.interpolate(points, 100, options);`
    }
  },
  mounted() {
    var points = turf.randomPoint(30, { bbox: [50, 30, 70, 50] });
    // add a random property to each point
    turf.featureEach(points, function (point) {
      point.properties.solRad = Math.random() * 50;
    });
    var options = { gridType: "points", property: "solRad", units: "miles" };
    this.result = turf.interpolate(points, 100, options);

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
          ><a-button type="primary" @click="handleDrawPoint"
            >绘制点({{ isDrawPoint ? "激活" : "未激活" }})</a-button
          ></a-space
        >
      </a-row>
      <a-row>
        <a-space
          >每个网格点之间的距离(cellSize)：<a-input-number
            v-model="cellSize"
          ></a-input-number
        ></a-space>
      </a-row>
      <a-row>
        <a-space
          >出参要素集的要素类型(gridType)：<grid-type
            :value.sync="gridType"
          ></grid-type
        ></a-space>
      </a-row>
      <a-row>
        <a-space
          >参与计算的属性(property)：<a-input v-model="property"></a-input
        ></a-space>
      </a-row>
      <a-row>
        <a-space
          >单位(units)：<length-units :value.sync="units"></length-units
        ></a-space>
      </a-row>
      <a-row>
        <a-space
          >调节距离衰减权重的指数(weight)：<a-input-number
            v-model="weight"
          ></a-input-number
        ></a-space>
      </a-row>

      <a-row>
        <a-button type="primary" @click="handleSure">确定</a-button>
      </a-row>
      <a-row>
        <a-space><json :data="result" /></a-space>
      </a-row>
    </drawer>
    <vue2ol-layer-vector @ready="handleReadyDrawLayer">
      <vue2ol-source-vector>
        <vue2ol-interaction-draw
          :active="isDrawPoint"
          type="Point"
          @drawend="handleDrawEnd"
        ></vue2ol-interaction-draw>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
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
      isDrawPoint: false,
      drawLayer: null,
      cellSize: 100,
      gridType: "square",
      units: "kilometers",
      weight: 1,
      property: "elevation",

      visible: true,
      features: null,
      result: null,
      drawFeatures: null,
    };
  },
  computed: {
    code() {
      if (!this.drawFeatures) {
        return "";
      }
      return `let grid = turf.interpolate(
  ${new GeoJSON().writeFeatures(this.drawFeatures)},
  ${this.cellSize},
  {
    gridType: '${this.gridType}',
    property: '${this.property}',
    units: '${this.units}',
    weight: ${this.weight},
  }
);`;
    },
  },
  mounted() {},
  methods: {
    handleSure() {
      this.result = turf.interpolate(
        JSON.parse(new GeoJSON().writeFeatures(this.drawFeatures)),
        this.cellSize,
        {
          gridType: this.gridType,
          property: this.property,
          units: this.units,
          weight: this.weight,
        }
      );
      this.features = new GeoJSON().readFeatures(this.result);
      console.log(this.features);
    },
    handleDrawPoint() {
      this.isDrawPoint = true;
    },
    handleReadyDrawLayer(mapObject) {
      this.drawLayer = mapObject;
    },
    handleDrawEnd(e) {
      e.feature.set(this.property, Math.random() * 50);
      this.drawFeatures = this.drawLayer.getSource().getFeatures();
    },
  },
};
</script>
```

:::
