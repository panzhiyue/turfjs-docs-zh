# 清除重复坐标点(cleanCoords)

> Removes redundant coordinates from any GeoJSON Geometry.
> 
> 从任何`GeoJSON`中删除多余的坐标。

```text
> npm install @turf/clean-coords
```

**参数**

| 参数    | 类型                | 描述                           |
| :------ | :------------------ | :----------------------------- |
| geojson | (Geometry\|Feature) | Feature or Geometry            |
| options | Object              | Optional parameters: see below |

**options选项**

| 属性   | 类型    | 默认值 | 描述                               |
| :----- | :------ | :----- | :--------------------------------- |
| mutate | boolean | false  | allows GeoJSON input to be mutated |

**返回**

(Geometry|Feature) - the cleaned input Feature/Geometry

**示例**

```js
var line = turf.lineString([[0, 0], [0, 2], [0, 5], [0, 8], [0, 8], [0, 10]]);
var multiPoint = turf.multiPoint([[0, 0], [0, 0], [2, 2]]);

turf.cleanCoords(line).geometry.coordinates;
//= [[0, 0], [0, 10]]

turf.cleanCoords(multiPoint).geometry.coordinates;
//= [[0, 0], [2, 2]]
```