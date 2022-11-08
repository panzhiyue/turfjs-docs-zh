# 计算位于多边形表面的点(pointOnFeature)

> Takes a Feature or FeatureCollection and returns a Point guaranteed to be on the surface of the feature.
> 获取一个`Feature`或`FeatureCollection`，并返回一个点，保证在该`feature`的表面。

**参数**

| 参数    | 类型    | 描述                             |
| :------ | :------ | :------------------------------- |
| geojson | GeoJSON | any Feature or FeatureCollection |

**返回**

Feature `<Point>` - a point on the surface of input

**示例**

```js
var polygon = turf.polygon([[
  [116, -36],
  [131, -32],
  [146, -43],
  [155, -25],
  [133, -9],
  [111, -22],
  [116, -36]
]]);

var pointOnPolygon = turf.pointOnFeature(polygon);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/pointOnFeature.f9a83bd6.webp)