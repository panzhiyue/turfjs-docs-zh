# 清除重复坐标点(cleanCoords)

```
> npm install @turf/clean-coords
```

> Removes redundant coordinates from any GeoJSON Geometry.
>
> 接收任意 GeoJSON，删除冗余坐标并返回

**参数**

| 参数    | 类型              | 描述                |
| :------ | :---------------- | :------------------ |
| geojson | Geometry\|Feature | Feature 或 Geometry |
| options | Object            | 可配置项            |

**options 选项**

| 属性   | 类型    | 默认值 | 描述                   |
| :----- | :------ | :----- | :--------------------- |
| mutate | boolean | false  | 是否返回入参的 GeoJSON |

**返回**

Geometry|Feature - the cleaned input Feature/Geometry

Geometry|Feature - 已清理的 Feature/Geometry

**示例**

```js
var line = turf.lineString([
  [0, 0],
  [0, 2],
  [0, 5],
  [0, 8],
  [0, 8],
  [0, 10]
]);
var multiPoint = turf.multiPoint([
  [0, 0],
  [0, 0],
  [2, 2]
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
    [2, 2]
  ]
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

      console.log(turf.cleanCoords(line).geometry.coordinates);
      //= [[0, 0], [0, 10]]

      console.log(turf.cleanCoords(multiPoint).geometry.coordinates);
      //= [[0, 0], [2, 2]]
    },
  },
};
</script>
```

:::
