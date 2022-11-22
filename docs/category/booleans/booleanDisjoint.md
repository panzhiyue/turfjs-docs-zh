# 判断是否不相交(booleanDisjoint)

```
> npm install @turf/boolean-disjoint
```

> Boolean-disjoint returns (TRUE) if the intersection of the two geometries is an empty set.
> 接收两个任意类型的要素，判断它们是否不相交，不相交返回 true

**参数**

| 参数     | 类型                | 描述    |
| :------- | :------------------ | :------ |
| feature1 | (Geometry\|Feature) | GeoJSON |
| feature2 | (Geometry\|Feature) | GeoJSON |

**返回**

boolean - true/false

**示例**

```js
var point = turf.point([2, 2]);
var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);

turf.booleanDisjoint(line, point);
//=true
```