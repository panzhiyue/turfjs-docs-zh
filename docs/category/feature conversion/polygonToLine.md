# 多边形转换多段线(polygonToLine)

> Converts a Polygon to (Multi)LineString or MultiPolygon to a FeatureCollection of (Multi)LineString.
> 转换多边形为(Multi)`LineString`或(Multi)`Polygon`为(Multi)`LineString`的`FeatureCollection`。

**参数**

| 参数    | 类型                               | 描述                           |
| :------ | :--------------------------------- | :----------------------------- |
| polygon | `Feature <(Polygon|MultiPolygon)>` | Feature to convert             |
| options | Object                             | Optional parameters: see below |

**options选项**

| 属性       | 类型   | 默认值 | 描述                                     |
| :--------- | :----- | :----- | :--------------------------------------- |
| properties | Object | {}     | translates GeoJSON properties to Feature |

**返回**

(`FeatureCollection`|`Feature <(LineString|MultiLinestring)>`) - converted (Multi)Polygon to (Multi)LineString

**示例**

```js
var poly = turf.polygon([[[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]]);

var line = turf.polygonToLine(poly);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/polygonToLine.54099e58.webp)