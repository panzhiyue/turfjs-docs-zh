# 判断是否交叉(booleanCrosses)

```
> npm install @turf/boolean-crosses
```

> Boolean-Crosses returns True if the intersection results in a geometry whose dimension is one less than the maximum dimension of the two source geometries and the intersection set is interior to both source geometries.
>
> 接收两个任意类型的要素，判断它们是否有相交点

**参数**

| 参数     | 类型              | 描述    |
| :------- | :---------------- | :------ |
| feature1 | Geometry\|Feature | GeoJSON |
| feature2 | Geometry\|Feature | GeoJSON |

**返回**

boolean - true/false

**示例**

```js
var line1 = turf.lineString([[-2, 2], [4, 2]]);
var line2 = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);

var cross = turf.booleanCrosses(line1, line2);
//=true
```