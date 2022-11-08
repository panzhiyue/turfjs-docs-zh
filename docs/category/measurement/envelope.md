# 计算多点范围(envelope)

> Takes any number of features and returns a rectangular Polygon that encompasses all vertices.
> 接受任意数量的`feature`并返回包含所有顶点的矩形多边形。

**参数**

| 参数    | 类型    | 描述           |
| :------ | :------ | :------------- |
| geojson | GeoJSON | input features |

**返回**

Feature `<Polygon>` - a rectangular Polygon feature that encompasses all vertices

**示例**

```js
var features = turf.featureCollection([
  turf.point([-75.343, 39.984], {"name": "Location A"}),
  turf.point([-75.833, 39.284], {"name": "Location B"}),
  turf.point([-75.534, 39.123], {"name": "Location C"})
]);

var enveloped = turf.envelope(features);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/envelope.6a398488.webp)