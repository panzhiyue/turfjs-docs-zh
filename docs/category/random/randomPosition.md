# 随机位置(randomPosition)

```
> npm install @turf/random
```

> Returns a random position within a box.
> 接收一个边界框范围,返回在改边界框内随机的经纬度坐标

**参数**

| 参数 | 类型  | 描述   |
| :--- | :---- | :----- |
| bbox | Array | 边界框 |

**返回**

Array - Position longitude, latitude

Array - 经纬度坐标

**示例**

```js
var position = turf.randomPosition([-180, -90, 180, 90]); // [lng, lat]
```

**基础用法**
::: demo

```vue
<template>
  <base-map :center="coordinate ? coordinate : [120, 28]" :zoom="1">
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
        <a-space><bbox :value.sync="bbox"></bbox></a-space
      ></a-row>
      <a-row>
        <a-button type="primary" @click="handleSure">确定</a-button>
      </a-row>
      <a-row>
        <a-space>{{ coordinate }}</a-space>
      </a-row>
    </drawer>
    <vue2ol-layer-vector :zIndex="20">
      <vue2ol-source-vector>
        <vue2ol-feature v-if="coordinate">
          <vue2ol-geom-point :coordinates="coordinate"></vue2ol-geom-point>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import { Feature } from "ol";
import { LineString } from "ol/geom";
import * as turf from "@turf/turf";
export default {
  data() {
    return {
      coordinate: null,
      visible: true,
      result: null,
      bbox: [-180, -90, 180, 90],
    };
  },
  mounted() {},
  methods: {
    handleSure() {
      this.coordinate = turf.randomPosition([-180, -90, 180, 90]);
    },
  },
};
</script>
```

:::
