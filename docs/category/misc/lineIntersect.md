# 计算两线段相交点(lineIntersect)

```
> npm install @turf/line-intersect
```

> Takes any LineString or Polygon GeoJSON and returns the intersecting point(s).
> 接收两个任何`LineString`或`Polygon`GeoJSON，并返回所有的相交点。

**参数**

| 参数  | 类型                                                         | 描述                      |
| :---- | :----------------------------------------------------------- | :------------------------ |
| line1 | (`Geometry`\|`FeatureCollection`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | 任意线要素或面要素 |
| line2 | (`Geometry`\|`FeatureCollection`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) |任意线要素或面要素|

**返回**

`FeatureCollection <Point>` - point(s) that intersect both

`FeatureCollection <Point>` - 两者相交的点集合

**示例**

```js
var line1 = turf.lineString([
  [126, -11],
  [129, -21]
]);
var line2 = turf.lineString([
  [123, -18],
  [131, -14]
]);
var intersects = turf.lineIntersect(line1, line2);
/*
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [127.43478260869566, -15.782608695652174]
      },
      properties: {}
    }
  ]
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineIntersect.aeff2c84.webp)