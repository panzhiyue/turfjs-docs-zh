# 随机多边形(randomPolygon)

```
> npm install @turf/random
```

> Returns a random polygon.
> 接收指定的数量，随机生成并返回在指定边界框内的面要素集(`FeatureCollect<Polygon>`)

**参数**

| 参数    | 类型   | 描述           |
| :------ | :----- | :------------- |
| count   | number | 生成要素的数量 |
| options | Object | 可配置项       |

**options 选项**

| 属性              | 类型   | 默认值            | 描述                                                       |
| :---------------- | :----- | :---------------- | :--------------------------------------------------------- |
| bbox              | Array  | [-180,-90,180,90] | 边界框                                                     |
| num_vertices      | number | 10                | 每个要素包含的坐标数量                                     |
| max_radial_length | number | 10                | 坐标点相对于该面要素的中心点的最大经度或纬度，单位为十进制 |

**返回**

`FeatureCollection <Polygon>` - GeoJSON FeatureCollection of polygons

`FeatureCollection <Polygon>` - 面要素集

**示例**

```js
var polygons = turf.randomPolygon(25, { bbox: [-180, -90, 180, 90] }); // 25个面要素集合
```

**基本用法**
::: demo

```vue
<template>
  <base-map :zoom="1">
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
    };
  },
  mounted() {
    this.result = turf.randomPolygon(25, {
      bbox: [-180, -90, 180, 90],
      num_vertices: 10,
      max_radial_length: 10,
    });
    this.features = new GeoJSON().readFeatures(this.result);
    console.log(this.features);
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
          >数量(count)：
          <a-input-number v-model="count" :min="1"></a-input-number
        ></a-space>
      </a-row>
      <a-row>
        <a-space><bbox :value.sync="bbox"></bbox></a-space
      ></a-row>
      <a-row
        >坐标数量(num_vertices)：<a-input-number
          v-model="num_vertices"
        ></a-input-number
      ></a-row>
      <a-row
        >相对于中心点的最大经度或纬度(max_radial_length)：<a-input-number
          v-model="max_radial_length"
        ></a-input-number
      ></a-row>

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
      max_radial_length: 10,
    };
  },
  computed: {
    code() {
      return `let polygons  = turf.randomPolygon(${this.count}, {
  bbox:${this.bbox},
  num_vertices: ${this.num_vertices},
  max_radial_length: ${this.max_radial_length},
});`;
    },
  },
  mounted() {},
  methods: {
    handleSure() {
      console.log({
        bbox: this.bbox,
        num_vertices: this.num_vertices,
        max_radial_length: this.max_radial_length,
      });
      this.result = turf.randomPolygon(this.count, {
        bbox: this.bbox,
        num_vertices: this.num_vertices,
        max_radial_length: this.max_radial_length,
      });
      this.features = new GeoJSON().readFeatures(this.result);
      console.log(this.features);
    },
  },
};
</script>
```

:::
