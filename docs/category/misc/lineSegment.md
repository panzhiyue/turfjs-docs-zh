# lineSegment

> Creates a FeatureCollection of 2-vertex LineString segments from a (Multi)LineString or (Multi)Polygon.
> 从一个(多)`LineString`或(多)多`Polygon`创建一个`2-vertex`线段的`FeatureCollection`。

**参数**

| 参数    | 类型                                                         | 描述                          |
| :------ | :----------------------------------------------------------- | :---------------------------- |
| geojson | (`Geometry`|`FeatureCollection`|`Feature <(LineString\|MultiLineString\|MultiPolygon\|Polygon)>`) | GeoJSON Polygon or LineString |

**返回**

`FeatureCollection <LineString>` - 2-vertex line segments

**示例**

```js
var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
var segments = turf.lineSegment(polygon);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineSegment.8fccea3b.webp)