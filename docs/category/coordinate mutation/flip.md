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

[GeoJSON](../other/type.html#allgeojson) - 翻转坐标后的GeoJSON

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
    <input type="button" value="执行" @click="handleClick" />
  </base-map>
</template>
<script>
import * as turf from "@turf/turf";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClick() {
      var line = turf.lineString([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);
      var multiPoint = turf.multiPoint([
        [0, 2],
        [2, 1],
      ]);

      console.log(turf.flip(line).geometry.coordinates);
      //= [[0, 0], [0, 10]]

      console.log(turf.flip(multiPoint).geometry.coordinates);
      //= [[0, 0], [2, 2]]
    },
  },
};
</script>
```

:::
