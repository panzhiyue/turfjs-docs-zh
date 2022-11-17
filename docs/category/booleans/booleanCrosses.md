# booleanCrosses

> Boolean-Crosses returns True if the intersection results in a geometry whose dimension is one less than the maximum dimension of the two source geometries and the intersection set is interior to both source geometries.
> 如果交集产生的几何图形的维数比两个源几何图形的最大维数小1，并且交集集位于两个源几何图形的内部，则返回True。

```text
> npm install @turf/boolean-crosses
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
var line1 = turf.lineString([[-2, 2], [4, 2]]);
var line2 = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);

var cross = turf.booleanCrosses(line1, line2);
//=true
```