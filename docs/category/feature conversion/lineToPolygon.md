# 多段线转换为多边形(lineToPolygon)

> Converts (Multi)LineString(s) to Polygon(s).
> 将(多个)`LineString`转换为`Polygon`。

**参数**

| 参数    | 类型                                                         | 描述                           |
| :------ | :----------------------------------------------------------- | :----------------------------- |
| line    | (`FeatureCollection`|`Feature <(LineString\|MultiLineString)>`) | Features to convert            |
| options | Object                                                       | Optional parameters: see below |

**options选项**

| 属性         | 类型    | 默认值 | 描述                                                         |
| :----------- | :------ | :----- | :----------------------------------------------------------- |
| properties   | Object  | {}     | translates GeoJSON properties to Feature                     |
| autoComplete | boolean | true   | auto complete linestrings (matches first & last coordinates) |
| orderCoords  | boolean | true   | sorts linestrings to place outer ring at the first position of the coordinates |

**返回**

`Feature <(Polygon|MultiPolygon)>` - converted to Polygons

**示例**

```js
var line = turf.lineString([[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]);

var polygon = turf.lineToPolygon(line);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineToPolygon.97eb8b3f.webp)