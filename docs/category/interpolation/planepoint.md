# 平面点(planepoint)

```
> npm install @turf/planepoint
```

> Takes a triangular plane as a Polygon and a Point within that triangle and returns the z-value at that point. The Polygon should have properties a , b , and c that define the values at its three corners. Alternatively, the z-values of each triangle point can be provided by their respective 3rd coordinate if their values are not provided as properties.
>
> 接收一个三角形平面要素(`Feature<Polygon>`)与内部一点(`Feature<Point>`),计算并返回该点的z值，面要素应该包含a,b,c三个属性值来定义它的三个角的值。或者，如果没有以属性的形式提供每个三角形点的值，则可以通过它们各自的第三坐标提供它们的z值。

**参数**

| 参数     | 类型                | 描述              |
| :------- | :------------------ | :---------------- |
| point    | Coord               | 需要被计算z值的点 |
| triangle | `Feature <Polygon>` | 三角形平面要素    |

**返回**

number - the z-value for interpolatedPoint

number - z值数值

**示例**

```js
var point = turf.point([-75.3221, 39.529]);
// "a", "b", and "c" values represent the values of the coordinates in order.
var triangle = turf.polygon(
  [
    [
      [-75.1221, 39.57],
      [-75.58, 39.18],
      [-75.97, 39.86],
      [-75.1221, 39.57]
    ]
  ],
  {
    a: 11,
    b: 122,
    c: 44
  }
);

var zValue = turf.planepoint(point, triangle); // 37.43364475092331
point.properties.zValue = zValue;
```
