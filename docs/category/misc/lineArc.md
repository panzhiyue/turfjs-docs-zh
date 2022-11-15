# lineArc

> Creates a circular arc, of a circle of the given radius and center point, between bearing1 and bearing2; 0 bearing is North of center point, positive clockwise.
> 在bearing1和bearing2之间创建给定半径和圆心点的圆弧；0方位为中心点以北，顺时针正。

**参数**

| 参数     | 类型   | 描述                                                       |
| :------- | :----- | :--------------------------------------------------------- |
| center   | Coord  | center point                                               |
| radius   | number | radius of the circle                                       |
| bearing1 | number | angle, in decimal degrees, of the first radius of the arc  |
| bearing2 | number | angle, in decimal degrees, of the second radius of the arc |
| options  | Object | Optional parameters: see below                             |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                   |
| :---- | :----- | :--------- | :------------------------------------- |
| steps | number | 64         | number of steps                        |
| units | string | kilometers | miles, kilometers, degrees, or radians |

**返回**

`Feature <LineString>` - line arc

**示例**

```js
var center = turf.point([-75, 40]);
var radius = 5;
var bearing1 = 25;
var bearing2 = 47;

var arc = turf.lineArc(center, radius, bearing1, bearing2);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/lineArc.2b13b98a.webp)