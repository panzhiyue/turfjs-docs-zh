# 清除重复坐标点(cleanCoords)

```
> npm install @turf/clean-coords
```

> Removes redundant coordinates from any GeoJSON Geometry.
>
> 接收任意 GeoJSON，删除冗余坐标并返回

**参数**

| 参数    | 类型                                                                           | 描述                |
| :------ | :----------------------------------------------------------------------------- | :------------------ |
| geojson | [Geometry](../other/type.html#geometry)\|[Feature](../other/type.html#feature) | Feature 或 Geometry |
| options | Object                                                                         | 可配置项            |

**options 选项**

| 属性   | 类型    | 默认值 | 描述                   |
| :----- | :------ | :----- | :--------------------- |
| mutate | boolean | false  | 是否返回入参的 GeoJSON |

**返回**

[Geometry](../other/type.html#geometry)\|[Feature](../other/type.html#feature) - the cleaned input Feature/Geometry

[Geometry](../other/type.html#geometry)\|[Feature](../other/type.html#feature) - 已清理的 Feature/Geometry

**示例**

```js
var line = turf.lineString([
  [0, 0],
  [0, 2],
  [0, 5],
  [0, 8],
  [0, 8],
  [0, 10],
]);
var multiPoint = turf.multiPoint([
  [0, 0],
  [0, 0],
  [2, 2],
]);

turf.cleanCoords(line).geometry.coordinates;
//= [[0, 0], [0, 10]]

turf.cleanCoords(multiPoint).geometry.coordinates;
//= [[0, 0], [2, 2]]

// 也可以使用 Geometry 对象
var geometry = {
  type: "LineString",
  coordinates: [
    [0, 0],
    [0, 0],
    [2, 2],
  ],
};
var result = turf.cleanCoords(geometry, { mutate: true });

/*
geometry、result均为
{
  coordinates: [[0, 0], [2, 2]],
  type: "LineString"
}
*/
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
      <a-row> <geojson-obj :value.sync="turfObj1"></geojson-obj></a-row>
      <a-row> <input type="button" value="执行" @click="handleClick" /></a-row>
      <a-row>
        <a-space><json :data="result"></json></a-space>
      </a-row>
    </drawer>
    <vue2ol-layer-vector>
      <vue2ol-source-vector :features="features1"> </vue2ol-source-vector>
    </vue2ol-layer-vector>
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
import { getFeaturesFromTurf, styleRed } from "../../utils/index.js";

export default {
  data() {
    return {
      visible: true,
      result: null,
      turfObj1: turf.lineString([
        [119.67302799224855, 28.048086643218994],
        [119.77302799224855, 28.048086643218994],
        [119.87302799224855, 28.048086643218994],
        [119.97302799224855, 28.048086643218994],
      ]),
    };
  },
  mounted() {},
  computed: {
    features1() {
      if (this.turfObj1) {
        console.log(1);
        return getFeaturesFromTurf(this.turfObj1);
      } else {
        console.log(2);
        return [];
      }
    },
    code() {
      return `let line=${JSON.stringify(this.turfObj1)};
this.result = turf.cleanCoords(line);`;
    },
  },
  methods: {
    handleClick() {
      this.result = turf.cleanCoords(this.turfObj1);
      //= [[0, 0], [0, 10]]
    },
  },
};
</script>
```

:::
