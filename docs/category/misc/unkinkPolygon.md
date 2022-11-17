# 计算非弯曲多边形(unkinkPolygon)

> Takes a kinked polygon and returns a feature collection of polygons that have no kinks. Uses simplepolygon internally.
> 获取一个弯曲的多边形，并返回没有弯曲的多边形的`FeatureCollection`。使用simplepolygon内部。

**参数**

| 参数    | 类型                                                      | 描述                            |
| :------ | :-------------------------------------------------------- | :------------------------------ |
| geojson | (`FeatureCollection`|`Feature <(Polygon\|MultiPolygon)>`) | GeoJSON Polygon or MultiPolygon |

**返回**

`FeatureCollection <Polygon>` - Unkinked polygons

**示例**

```js
var poly = turf.polygon([[[0, 0], [2, 0], [0, 2], [2, 2], [0, 0]]]);

var result = turf.unkinkPolygon(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/unkinkPolygon.f48ba212.webp)