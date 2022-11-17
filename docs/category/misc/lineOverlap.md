# 计算两多线段重叠端(lineOverlap)

> Takes any LineString or Polygon and returns the overlapping lines between both features.
> 获取任何`LineString`或`Polygon`，并返回两个`Feature`之间的重叠线。

**参数**

| 参数    | 类型                                                         | 描述                           |
| :------ | :----------------------------------------------------------- | :----------------------------- |
| line1   | (`Geometry`|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | any LineString or Polygon      |
| line2   | (`Geometry`\|`Feature <(LineString\|MultiLineString\|Polygon\|MultiPolygon)>`) | any LineString or Polygon      |
| options | Object                                                       | Optional parameters: see below |

**options选项**

| 属性      | 类型   | 默认值 | 描述                                                         |
| :-------- | :----- | :----- | :----------------------------------------------------------- |
| tolerance | number | 0      | Tolerance distance to match overlapping line segments (in kilometers) |

**返回**

`FeatureCollection <LineString>` - lines(s) that are overlapping between both features

**示例**

```js
var line1 = turf.lineString([[115, -35], [125, -30], [135, -30], [145, -35]]);
var line2 = turf.lineString([[115, -25], [125, -30], [135, -30], [145, -25]]);

var overlapping = turf.lineOverlap(line1, line2);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineOverlap.99a65c25.webp)