# 多边形化(polygonize)

```
> npm install @turf/polygonize
```

> Polygonizes (Multi)LineString(s) into Polygons.
> 将(多个)`LineString`多边形化。接收一个 type 为LineString或MultiLineString的要素，转换为type为Polygon的面要素集合

> 值得注意的是，lineToPolygon 方法返回要素，该方法返回要素集，且不能传入 options 的属性

**参数**

| 参数    | 类型                                                         | 描述           |
| :------ | :----------------------------------------------------------- | :------------- |
| geojson | `FeatureCollection|Geometry|Feature<LineString|MultiLineString>` | 需转换的线要素 |

**返回**

`FeatureCollection <Polygon>` - Polygons created

`FeatureCollection <Polygon>` - 创建的多边形集合

**示例**

```js
var line = turf.lineString([
  [125, -30],
  [145, -30],
  [145, -20],
  [125, -20],
  [125, -30]
]);

var polygon = turf.polygonize(line); // type 为 Polygon 的面要素
```