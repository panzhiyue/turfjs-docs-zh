# 计算多边形切线点(polygonTangents)

> Finds the tangents of a (Multi)Polygon from a Point.
> 从一个点找到一个(多)多边形的切线。

**参数**

| 参数    | 类型                               | 描述                                 |
| :------ | :--------------------------------- | :----------------------------------- |
| pt      | Coord                              | to calculate the tangent points from |
| polygon | `Feature <(Polygon|MultiPolygon)>` | to get tangents from                 |

**返回**

FeatureCollection `<Point>` - Feature Collection containing the two tangent points

**示例**

```js
var polygon = turf.polygon([[[11, 0], [22, 4], [31, 0], [31, 11], [21, 15], [11, 11], [11, 0]]]);
var point = turf.point([61, 5]);

var tangents = turf.polygonTangents(point, polygon)
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/polygonTangents.b465321f.webp)