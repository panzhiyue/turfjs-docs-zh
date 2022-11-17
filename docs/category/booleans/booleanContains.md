# booleanContains

> Boolean-contains returns True if the second geometry is completely contained by the first geometry. The interiors of both geometries must intersect and, the interior and boundary of the secondary (geometry b) must not intersect the exterior of the primary (geometry a). Boolean-contains returns the exact opposite result of the @turf/boolean-within.
> 如果第二个几何图形完全包含在第一个几何图形中，则`Boolean-contains`返回True。两个几何图形的内部必须相交，次要图形的内部和边界(几何图形b)不能与主要图形的外部(几何图形a)相交。`Boolean-contains`返回与`@turf/boolean-within`完全相反的结果。

```text
> npm install @turf/boolean-contains
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
var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
var point = turf.point([1, 2]);

turf.booleanContains(line, point);
//=true
```