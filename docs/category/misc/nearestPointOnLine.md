# 计算点到多线段最短间距的点(nearestPointOnLine)

```
> npm install @turf/nearest-point-on-line
```

> Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
> 获取一个点(Point)和一个线(LineString)，计算并返回该点在改线上最近的点要素。

**参数**

| 参数    | 类型                                                   | 描述                           |
| :------ | :----------------------------------------------------- | :----------------------------- |
| lines   | `Geometry|Feature<LineString|MultiLineString>` |参照物的线要素 |
| pt      | `Geometry|Feature<Point>` |需计算的点要素|
| options | Object                                                 | 可配置项 |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |

**返回**

`Feature <Point>` - closest point on the line to point. The properties object will contain three values: index : closest point was found on nth line part, dist : distance between pt and the closest point, location : distance along the line between start and the closest point.

`Feature <Point>` - 距离线段最近的点. properties对象将包含三个值：index：在第n行部分找到最近的点，dist：pt和最近点之间的距离，location：起点和最近点沿着直线的距离

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

var snapped = turf.nearestPointOnLine(line, pt, { units: "miles" }); // [-77.02996941477018, 38.881361463229524]的点要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/nearestPointOnLine.cc4cb621.webp)