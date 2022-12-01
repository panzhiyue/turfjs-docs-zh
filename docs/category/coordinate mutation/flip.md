# 翻转经纬度(flip)

```
> npm install @turf/flip
```

> Takes input features and flips all of their coordinates from [x, y] to [y, x].
>
> 接收`GeoJSON`并将它们的所有坐标从`[x, y]`翻转为`[y, x]`。

**参数**

| 参数    | 类型                                     | 描述                   |
| :------ | :--------------------------------------- | :--------------------- |
| geojson | [GeoJSON](../other/type.html#allgeojson) | 一个任意类型的 GeoJSON |
| options | Object                                   | 可配置项               |

**options 选项**

| 属性   | 类型    | 默认值 | 描述                                           |
| :----- | :------ | :----- | :--------------------------------------------- |
| mutate | boolean | false  | 是否返回入参的 GeoJSON，为 true 性能能显著提高 |

**返回**

[GeoJSON](../other/type.html#allgeojson) - a feature or set of features of the same type as input with flipped coordinates

[GeoJSON](../other/type.html#allgeojson) - 翻转坐标后的 GeoJSON

**示例**

```js
var serbia = turf.point([20.566406, 43.421008]);

var saudiArabia = turf.flip(serbia);
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [43.421008, 20.566406]
  },
  properties: {}
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
        return getFeaturesFromTurf(this.turfObj1);
      } else {
        return [];
      }
    },
    code() {
      return `let line=${JSON.stringify(this.turfObj1)};
this.result = turf.flip(line);`;
    },
  },
  methods: {
    handleClick() {
      if (!this.turfObj1) {
        return;
      }
      try {
        this.features = [];
        this.result = null;

        this.result = turf.flip(this.turfObj1);
      } catch (e) {
        this.result = {
          error: e.toString(),
        };
      }
    },
  },
};
</script>
```

:::
