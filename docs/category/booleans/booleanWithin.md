# 判断是否在线内(booleanWithin)

> Boolean-within returns true if the first geometry is completely within the second geometry. The interiors of both geometries must intersect and, the interior and boundary of the primary (geometry a) must not intersect the exterior of the secondary (geometry b). Boolean-within returns the exact opposite result of the @turf/boolean-contains.
> 如果第一个几何图形完全在第二个几何图形内，则返回true。两个几何图形的内部必须相交，并且，主几何图形(几何a)的内部和边界不能相交于次几何图形(几何b)的外部。`Boolean-within`与`@turf/boolean-contains`是完全相反的结果。

```text
> npm install @turf/boolean-within
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

turf.booleanWithin(point, line);
//=true
```