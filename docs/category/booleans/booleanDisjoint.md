# booleanDisjoint

> Boolean-disjoint returns (TRUE) if the intersection of the two geometries is an empty set.
> 如果两个几何图形的交点为空集，则返回(TRUE)。

```text
> npm install @turf/boolean-disjoint
```

**参数**

| 参数     | 类型                | 描述                        |
| :------- | :------------------ | :-------------------------- |
| feature1 | (Geometry\|Feature) | GeoJSON Feature or Geometry |
| feature2 | (Geometry\|Feature) | GeoJSON Feature or Geometry |

**返回**

boolean - true/false

**示例**

```js
var point = turf.point([2, 2]);
var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);

turf.booleanDisjoint(line, point);
//=true
```