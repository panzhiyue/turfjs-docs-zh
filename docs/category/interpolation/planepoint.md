# planepoint

> Takes a triangular plane as a Polygon and a Point within that triangle and returns the z-value at that point. The Polygon should have properties a , b , and c that define the values at its three corners. Alternatively, the z-values of each triangle point can be provided by their respective 3rd coordinate if their values are not provided as properties.
> 获取一个三角形平面作为一个多边形和该三角形内的一个点，并返回该点的z值。多边形应该有属性a、b和c来定义它的三个角的值。或者，如果没有以属性的形式提供每个三角形点的值，则可以通过它们各自的第三坐标提供它们的z值。

**参数**

| 参数     | 类型                | 描述                                             |
| :------- | :------------------ | :----------------------------------------------- |
| point    | Coord               | the Point for which a z-value will be calculated |
| triangle | `Feature <Polygon>` | a Polygon feature with three vertices            |

**返回**

number - the z-value for interpolatedPoint

**示例**

```js
var point = turf.point([-75.3221, 39.529]);
// "a", "b", and "c" values represent the values of the coordinates in order.
var triangle = turf.polygon([[
  [-75.1221, 39.57],
  [-75.58, 39.18],
  [-75.97, 39.86],
  [-75.1221, 39.57]
]], {
  "a": 11,
  "b": 122,
  "c": 44
});

var zValue = turf.planepoint(point, triangle);
point.properties.zValue = zValue;
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/planepoint.ce685c8a.webp)