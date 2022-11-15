# 多边形化(polygonize)

> Polygonizes (Multi)LineString(s) into Polygons.
> 将(多个)`LineString`多边形化。

```text
> npm install @turf/polygonize
```

**参数**

| 参数    | 类型                                                         | 描述                         |
| :------ | :----------------------------------------------------------- | :--------------------------- |
| geojson | (`FeatureCollection`|`Geometry\|Feature <(LineString\|MultiLineString)>`) | Lines in order to polygonize |

**返回**

`FeatureCollection <Polygon>` - Polygons created

**示例**

```js
var linestring = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]]);

var polygonize = turf.polygonize(linestring);
```