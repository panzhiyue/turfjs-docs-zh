# tin 多边形(tin)

```
> npm install @turf/tin
```

> Takes a set of points and creates a Triangulated Irregular Network , or a TIN for short, returned as a collection of Polygons. These are often used for developing elevation contour maps or stepped heat visualizations.
>
> 接收一组点要素集合，创建并返回该集合的 TIN(Triangulated Irregular Network，[不规则三角形格网](https://baike.baidu.com/item/不规则三角形格网/5246408))

**参数**

| 参数   | 类型                        | 描述                                                                                    |
| :----- | :-------------------------- | :-------------------------------------------------------------------------------------- |
| points | `FeatureCollection <Point>` | 点要素集合                                                                              |
| z      | (String)                    | 从中提取 z 值的属性的名称。这是可选的：如果没有给定，则不会向派生三角形添加额外的数据。 |

**返回**

`FeatureCollection <Polygon>` - TIN output

`FeatureCollection <Polygon>` - 不规则三角形网格

**示例**

```js
// generate some random point data
var points = turf.randomPoint(30, { bbox: [50, 30, 70, 50] });

// add a random property to each point between 0 and 9
for (var i = 0; i < points.features.length; i++) {
  points.features[i].properties.z = ~~(Math.random() * 9);
}
var tin = turf.tin(points, "z");
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/tin.3d1cc363.webp)

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
      return `// generate some random point data
var points = turf.randomPoint(30, { bbox: [50, 30, 70, 50] });
// add a random property to each point between 0 and 9
for (var i = 0; i < points.features.length; i++) {
  points.features[i].properties.z = ~~(Math.random() * 9);
}
var tin = turf.tin(points, "z");`;
    },
  },
  mounted() {
    // generate some random point data
    var points = turf.randomPoint(30, { bbox: [50, 30, 70, 50] });

    // add a random property to each point between 0 and 9
    for (var i = 0; i < points.features.length; i++) {
      points.features[i].properties.z = ~~(Math.random() * 9);
    }
    console.log(points);
    this.result = turf.tin(points, "z");

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
        <a-space>z值属性名称(z)：<a-input v-model="z"></a-input></a-space>
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
      z: "z",

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
      return `var tin = turf.tin(
  ${new GeoJSON().writeFeatures(this.drawFeatures)},
  this.z
);`;
    },
  },
  mounted() {},
  methods: {
    handleSure() {
      this.result = turf.tin(
        JSON.parse(new GeoJSON().writeFeatures(this.drawFeatures)),
        this.z
      );
      this.features = new GeoJSON().readFeatures(this.result);
    },
    handleDrawPoint() {
      this.isDrawPoint = true;
    },
    handleReadyDrawLayer(mapObject) {
      this.drawLayer = mapObject;
    },
    handleDrawEnd(e) {
      e.feature.set(this.z, ~~(Math.random() * 9));
      this.drawFeatures = this.drawLayer.getSource().getFeatures();
    },
  },
};
</script>
```

:::
