# 计算点到多线段最短间距的点(nearestPointOnLine)

> Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
> 获取一个点和一个LineString，并计算(多)LineString上最近的点。

**参数**

| 参数    | 类型                                                   | 描述                           |
| :------ | :----------------------------------------------------- | :----------------------------- |
| lines   | (`Geometry`|`Feature <(LineString\|MultiLineString)>`) | lines to snap to               |
| pt      | (`Geometry`|`Feature <Point>`|`Array`)                 | point to snap from             |
| options | Object                                                 | Optional parameters: see below |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                          |
| :---- | :----- | :--------- | :-------------------------------------------- |
| units | string | kilometers | can be degrees, radians, miles, or kilometers |

**返回**

`Feature <Point>` - closest point on the line to point. The properties object will contain three values: index : closest point was found on nth line part, dist : distance between pt and the closest point, location : distance along the line between start and the closest point.

**示例**

```js
var line = turf.lineString([
    [-77.031669, 38.878605],
    [-77.029609, 38.881946],
    [-77.020339, 38.884084],
    [-77.025661, 38.885821],
    [-77.021884, 38.889563],
    [-77.019824, 38.892368]
]);
var pt = turf.point([-77.037076, 38.884017]);

var snapped = turf.nearestPointOnLine(line, pt, {units: 'miles'});
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/nearestPointOnLine.cc4cb621.webp)