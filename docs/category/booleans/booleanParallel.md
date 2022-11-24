# 判断是否平行(booleanParallel)

```
> npm install @turf/boolean-parallel
```

> Boolean-Parallel returns True if each segment of line1 is parallel to the correspondent segment of line2
>
> 接收两个线要素，判断它们是否平行

**参数**

| 参数  | 类型      | 描述                 |
| :---- | :-------- | :------------------- | ------ |
| line1 | `Geometry | Feature<LineString>` | 线要素 |
| line2 | `Geometry | Feature<LineString>` | 线要素 |

**返回**

boolean - true/false if the lines are parallel

**示例**

```js
var line1 = turf.lineString([
  [0, 0],
  [0, 1],
]);
var line2 = turf.lineString([
  [1, 0],
  [1, 1],
]);

turf.booleanParallel(line1, line2);
//=true
```

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
      <a-row> {{ result }} </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates1"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
        <vue2ol-feature>
          <vue2ol-geom-linestring
            :coordinates="coordinates2"
          ></vue2ol-geom-linestring>
        </vue2ol-feature>
      </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { Style, Stroke, Fill } from "ol/style";
export default {
  data() {
    return {
      coordinates1: [
        [119.72452640533449, 27.781138706207275],
        [119.79044437408449, 28.0978684425354],
      ],
      coordinates2: [
        [119.82452640533449, 27.781138706207275],
        [119.89044437408449, 28.0978684425354],
      ],

      result: null,
      visible: true,
    };
  },
  computed: {
    code() {
      return `let result = turf.booleanParallel(
  turf.lineString(${JSON.stringify(this.coordinates1)}),
  turf.lineString(${JSON.stringify(this.coordinates2)})
);`;
    },
  },
  mounted() {
    this.result = turf.booleanParallel(
      turf.lineString(this.coordinates1),
      turf.lineString(this.coordinates2)
    );
  },
};
</script>
```

:::
