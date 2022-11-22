# 计算最近的点(nearestPoint)

```
> npm install @turf/nearest-point
```

> Takes a reference point and a FeatureCollection of Features with Point geometries and returns the point from the FeatureCollection closest to the reference. This calculation is geodesic.
>
> 接收一组点要素集合(`FeatureCollection<Point>`)和一个参照物点要素()，返回该点要素集合里最接近参照物点的点要素，包含两个属性：在要素集里的index,和参照物的距离(英里)
>
> 

**参数**

| 参数        | 类型                        | 描述         |
| :---------- | :-------------------------- | :----------- |
| targetPoint | Coord\|`Feature<Point>`     | 参照物点要素 |
| points      | `FeatureCollection <Point>` | 点要素集     |

**返回**

`Feature <Point>` - the closest point in the set to the reference point

`Feature <Point>` - 集合中距离参考点最近的点

**示例**

```js
var targetPoint = turf.point([28.965797, 41.010086], { "marker-color": "#0F0" });
var points = turf.featureCollection([
  turf.point([28.973865, 41.011122]),
  turf.point([28.948459, 41.024204]),
  turf.point([28.938674, 41.013324])
]);

var nearest = turf.nearestPoint(targetPoint, points);
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [28.973865, 41.011122]
  },
  properties: {
    featureIndex: 0,
    distanceToPoint: 0.6866892586431127
  }
}
*/
```

