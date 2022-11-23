# 随机点(randomPoint)

```
> npm install @turf/random
```

> Returns a random point.
> 接收指定的数量，随机生成并返回在指定边界框内的线要素集(`FeatureCollect<Point>`)

**参数**

| 参数    | 类型   | 描述           |
| :------ | :----- | :------------- |
| count   | number | 生成要素的数量 |
| options | Object | 可配置项       |

**options 选项**

| 属性 | 类型  | 默认值            | 描述   |
| :--- | :---- | :---------------- | :----- |
| bbox | Array | [-180,-90,180,90] | 边界框 |

**返回**

`FeatureCollection <Point>` - GeoJSON FeatureCollection of points

`FeatureCollection <Point>` - 点要素集

**示例**

```js
var points = turf.randomPoint(25, { bbox: [-180, -90, 180, 90] }); // 25个点要素集合
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
    this.result = turf.randomPoint(25, {
      bbox: [-180, -90, 180, 90],
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
          >数量(count)：<a-input-number
            v-model="count"
            :min="1"
          ></a-input-number
        ></a-space>
      </a-row>
      <a-row>
        <a-space><bbox :value.sync="bbox"></bbox></a-space
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
    };
  },
  computed: {
    code() {
      return `let points = turf.randomPoint(${this.count}, {
  bbox:${this.bbox}
});`;
    },
  },
  mounted() {},
  methods: {
    handleSure() {
      this.result = turf.randomPoint(this.count, {
        bbox: this.bbox,
      });
      this.features = new GeoJSON().readFeatures(this.result);
    },
  },
};
</script>
```

:::
