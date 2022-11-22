# 多段线转换为多边形(lineToPolygon)

```
> npm install @turf/line-to-polygon
```

> Converts (Multi)LineString(s) to Polygon(s).
> 将`(Multi)LineString`转换为`(Multi)Polygon`。

> 值得注意的是，入参只能接收线要素，否则报错

**参数**

| 参数    | 类型                                                      | 描述           |
| :------ | :-------------------------------------------------------- | :------------- |
| line    | `FeatureCollectionFeature <(LineString|MultiLineString)>` | 需转换的线要素 |
| options | Object                                                    | 可配置项       |

**options选项**

| 属性         | 类型    | 默认值 | 描述                           |
| :----------- | :------ | :----- | :----------------------------- |
| properties   | Object  | {}     | 输出GeoJSON的properties 属性   |
| autoComplete | boolean | true   | 匹配首尾坐标来自动完成面的规则 |
| orderCoords  | boolean | true   | 外圈的线优先放置在坐标组的前面 |

**返回**

`Feature <(Polygon|MultiPolygon)>` - converted to Polygons

`Feature <(Polygon|MultiPolygon)>` - 转换后的多边形

**示例**

```js
var line = turf.lineString([
  [125, -30],
  [145, -30],
  [145, -20],
  [125, -20],
  [125, -30]
]);

var polygon = turf.lineToPolygon(line); // type 为 Polygon 的面要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineToPolygon.97eb8b3f.webp)