# 返回指定数量的点(sample)

```
> npm install @turf/sample
```

> Takes a FeatureCollection and returns a FeatureCollection with given number of features at random.
>
> 接收一个任意的要素集(FeatureCollection)，随机挑选出指定数量的要素并以要素集的格式返回
>
> 值得注意的是，当入参的指定数量大于要素集本身长度，features 有可能会返回 undefined

**参数**

| 参数              | 类型              | 描述         |
| :---------------- | :---------------- | :----------- |
| featurecollection | FeatureCollection | 要素集       |
| num               | number            | 要返回的数量 |

**返回**

`FeatureCollection` - a FeatureCollection with n features

`FeatureCollection` - 要素集

**示例**

```js
var points = turf.randomPoint(100, { bbox: [-80, 30, -60, 60] });

var sample = turf.sample(points, 5);

var sample2 = turf.sample(points, 200);
/*
{
  type: "FeatureCollection",
  features: [undefined, {...全部100个点要素}]
}
*/
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
        <a-space
          >数量(count)：<a-input-number
            v-model="count"
            :min="1"
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
      return `let points = turf.randomPoint(100, { bbox: ${JSON.stringify(this.bbox)} });
this.result = turf.sample(points, ${this.count});`;
    },
  },
  mounted() {},
  methods: {
    handleSure() {
      let points = turf.randomPoint(100, { bbox: this.bbox });

      this.result = turf.sample(points, this.count);
      this.features = new GeoJSON().readFeatures(this.result);
    },
  },
};
</script>
```

:::
