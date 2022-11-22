# 创建圆弧(lineArc)

```
> npm install @turf/line-arc
```

> Creates a circular arc, of a circle of the given radius and center point, between bearing1 and bearing2; 0 bearing is North of center point, positive clockwise.
> 在角度bearing1和角度bearing2之间创建给定半径和圆心点的圆弧。

> 值得注意的是，角度是与正北方向所形成的角度，顺时针为正值，且两个角度有先后顺序

**参数**

| 参数     | 类型                    | 描述                  |
| :------- | :---------------------- | :-------------------- |
| center   | Coord\|`Feature<Point>` | 中心点                |
| radius   | number                  | 圆的半径              |
| bearing1 | number                  | 介于 -180 至 180 之间 |
| bearing2 | number                  | 介于 -180 至 180 之间 |
| options  | Object                  | 可配置项              |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                               |
| :---- | :----- | :--------- | :------------------------------------------------- |
| steps | number | 64         | 圆弧的平滑度，数值越高越平滑                       |
| units | string | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |

**返回**

`Feature <LineString>` - line arc

`Feature <LineString>` - 圆弧线段

**示例**

```js
var center = turf.point([-75, 40]);
var radius = 5;
var bearing1 = 25;
var bearing2 = 47;

var arc = turf.lineArc(center, radius, bearing1, bearing2);
/*
{
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [-74.97517792609881, 40.04075040571227],
      [-74.97008079359495, 40.038690305118934],
      [-74.96527228827969, 40.03625742190849],
      [-74.96079876149496, 40.03347522459089],
      [-74.95705100267124, 40.03065882615696]
    ]
  },
  properties: {}
}
*/
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineArc.2b13b98a.webp)