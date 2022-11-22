# 判断是否重叠(booleanOverlap)

```
> npm install @turf/boolean-overlap
```

> Compares two geometries of the same dimension and returns true if their intersection set results in a geometry different from both but of the same dimension. It applies to Polygon/Polygon, LineString/LineString, Multipoint/Multipoint, MultiLineString/MultiLineString and MultiPolygon/MultiPolygon.
>
> 接收两个任意类型的要素，判断它们是否有交集重叠。
>
> 值得注意的是，判断的要素必须是同类型的：面要素和面要素、线和线、MultiPoint 和 MultiPoint、MultiLineString 和 MultiLineString、MultiPolygon 和 MultiPolygon

**参数**

| 参数     | 类型                                                         | 描述    |
| :------- | :----------------------------------------------------------- | :------ |
| feature1 | `Geometry|Feature<LineString>|MultiLineString|Polygon|MultiPolygon` | GeoJSON |
| feature2 | `Geometry|Feature<LineString>|MultiLineString|Polygon|MultiPolygon` | GeoJSON |

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