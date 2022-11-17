# booleanOverlap

> Compares two geometries of the same dimension and returns true if their intersection set results in a geometry different from both but of the same dimension. It applies to Polygon/Polygon, LineString/LineString, Multipoint/Multipoint, MultiLineString/MultiLineString and MultiPolygon/MultiPolygon.
> 比较相同维度的两个几何图形，如果它们的交集集产生的几何图形与两个几何图形不同，但维度相同，则返回true。适用于`Polygon/Polygon`、`LineString/LineString`、`Multipoint/Multipoint`、`MultiLineString/MultiLineString`、`MultiPolygon/MultiPolygon`。

```text
> npm install @turf/boolean-overlap
```

**参数**

| 参数     | 类型                                                         | 描述  |
| :------- | :----------------------------------------------------------- | :---- |
| feature1 | (`Geometry`|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | input |
| feature2 | (`Geometry`|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | input |

**返回**

boolean - true/false

**示例**

```js
var poly1 = turf.polygon([[[0,0],[0,5],[5,5],[5,0],[0,0]]]);
var poly2 = turf.polygon([[[1,1],[1,6],[6,6],[6,1],[1,1]]]);
var poly3 = turf.polygon([[[10,10],[10,15],[15,15],[15,10],[10,10]]]);

turf.booleanOverlap(poly1, poly2)
//=true
turf.booleanOverlap(poly2, poly3)
//=false
```