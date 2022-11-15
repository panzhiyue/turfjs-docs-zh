# lineIntersect

> Takes any LineString or Polygon GeoJSON and returns the intersecting point(s).
> 获取任何`LineString`或`Polygon`GeoJSON，并返回相交点。

**参数**

| 参数  | 类型                                                         | 描述                      |
| :---- | :----------------------------------------------------------- | :------------------------ |
| line1 | (`Geometry`\|`FeatureCollection`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | any LineString or Polygon |
| line2 | (`Geometry`|`FeatureCollection`|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | any LineString or Polygon |

**返回**

`FeatureCollection <Point>` - point(s) that intersect both

**示例**

```js
var line1 = turf.lineString([[126, -11], [129, -21]]);
var line2 = turf.lineString([[123, -18], [131, -14]]);
var intersects = turf.lineIntersect(line1, line2);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineIntersect.aeff2c84.webp)