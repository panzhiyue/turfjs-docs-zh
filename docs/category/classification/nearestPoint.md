# nearestPoint

> Takes a reference point and a FeatureCollection of Features with Point geometries and returns the point from the FeatureCollection closest to the reference. This calculation is geodesic.
> 获取一个参考点和一个具有点几何特征的`FeatureCollection`，并从`FeatureCollection`最接近的参考点返回点。这个计算是测地线的。

```
npm install @turf/nearest-point
```

**参数**

| 参数        | 类型                        | 描述                    |
| :---------- | :-------------------------- | :---------------------- |
| targetPoint | Coord                       | the reference point     |
| points      | `FeatureCollection <Point>` | against input point set |

**返回**

`Feature <Point>` - the closest point in the set to the reference point

**示例**

```js
var targetPoint = turf.point([112.015826, 36.074031], {"marker-color": "#F00"});
var points = turf.featureCollection([
    turf.point([105.142483, 35.834725]),
    turf.point([104.772949, 30.963027]),
    turf.point([110.907223, 33.09316])
]);

var nearest = turf.nearestPoint(targetPoint, points);
```

