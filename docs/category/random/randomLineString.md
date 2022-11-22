# 随机线段(randomLineString)

```
> npm install @turf/random
```

> Returns a random linestring.
> 接收指定的数量，随机生成并返回在指定边界框内的线要素集(`FeatureCollect<LineString>`)

**参数**

| 参数    | 类型   | 描述           |
| :------ | :----- | :------------- |
| count   | number | 生成要素的数量 |
| options | Object | 可配置项       |

**options 选项**

| 属性         | 类型   | 默认值            | 描述                                                 |
| :----------- | :----- | :---------------- | :--------------------------------------------------- |
| bbox         | Array  | [-180,-90,180,90] | 边界框                                               |
| num_vertices | number | 10                | 每个要素包含的坐标数量                               |
| max_length   | number | 0.0001            | 坐标点相对于其前一个坐标点的最大的度数，单位为十进制 |
| max_rotation | number | Math.PI/8         | 坐标点相对于其前一个坐标点能形成的最大弧度           |

**返回**

`FeatureCollection <LineString>` - GeoJSON FeatureCollection of linestrings

`FeatureCollection <LineString>` - 线要素集

**示例**

```js
var lineStrings = turf.randomLineString(25, { bbox: [-180, -90, 180, 90] }); // 25个线要素集合
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
    <drawer :visible.sync="visible">
      <a-row>
        <a-space
          >数量：<a-input-number v-model="count" :min="1"></a-input-number
        ></a-space>
      </a-row>
      <a-row>
        <a-space><bbox :value.sync="bbox"></bbox></a-space
      ></a-row>
      <a-row>坐标数量：<a-input-number v-model="num_vertices"></a-input-number></a-row>
      <a-row>最大度数：<a-input-number v-model="max_length"></a-input-number></a-row>
      <a-row>最大弧度：<a-input-number v-model="max_rotation"></a-input-number></a-row>
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
      coordinate: null,
      visible: true,
      count: 25,
      features: null,
      result: null,
      bbox: [-180, -90, 180, 90],
      num_vertices: 10,
      max_length: 10,
      max_rotation: Math.PI / 8,
    };
  },
  mounted() {},
  methods: {
    handleSure() {
      this.result = turf.randomLineString(this.count, {
        bbox: this.bbox,
        num_vertices: this.num_vertices,
        max_length: this.max_length,
        max_rotation: this.max_rotation,
      });
      this.features = new GeoJSON().readFeatures(this.result);
      console.log(this.features);
    },
  },
};
</script>
```

:::
