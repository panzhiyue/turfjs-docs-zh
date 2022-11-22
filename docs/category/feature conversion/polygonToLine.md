# 多边形转换多段线(polygonToLine)

```
> npm install @turf/polygon-to-line
```

> Converts a Polygon to (Multi)LineString or MultiPolygon to a FeatureCollection of (Multi)LineString.
> 接收`Feature<Polygon|MultiPolygon>`,转换并返回`FeatureCollection<LineString|MultiLineString>`

**参数**

| 参数    | 类型                               | 描述         |
| :------ | :--------------------------------- | :----------- |
| polygon | `Feature <(Polygon|MultiPolygon)>` | 需转换的要素 |
| options | Object                             | 可配置项     |

**options选项**

| 属性       | 类型   | 默认值 | 描述                         |
| :--------- | :----- | :----- | :--------------------------- |
| properties | Object | {}     | 输出GeoJSON的properties 属性 |

**返回**

(`FeatureCollection`|`Feature <(LineString|MultiLinestring)>`) - converted (Multi)Polygon to (Multi)LineString

(`FeatureCollection`|`Feature <(LineString|MultiLinestring)>`) - 转后的结果

**示例**

```js
var poly = turf.polygon([[[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]]);

var line = turf.polygonToLine(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/polygonToLine.54099e58.webp)