# 计算扇形多边形(sector)

> Creates a circular sector of a circle of given radius and center Point , between (clockwise) bearing1 and bearing2; 0 bearing is North of center point, positive clockwise.
> 创建给定半径和中心点的圆的一个扇形，位于(顺时针)bearing1和bearing2之间;0方位为中心点以北，顺时针正。

**参数**

| 参数     | 类型   | 描述                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| center   | Coord  | center point                                                 |
| radius   | number | radius of the circle                                         |
| bearing1 | number | angle, in decimal degrees, of the first radius of the sector |
| bearing2 | number | angle, in decimal degrees, of the second radius of the sector |
| options  | Object | Optional parameters: see below                               |

**options选项**

| 属性       | 类型       | 默认值     | 描述                                    |
| :--------- | :--------- | :--------- | :-------------------------------------- |
| units      | string     | kilometers | miles, kilometers, degrees, or radians  |
| steps      | number     | 64         | number of steps                         |
| properties | Properties | {}         | Translate properties to Feature Polygon |

**返回**

`Feature <Polygon>` - sector polygon

**示例**

```js
var center = turf.point([-75, 40]);
var radius = 5;
var bearing1 = 25;
var bearing2 = 45;

var sector = turf.sector(center, radius, bearing1, bearing2);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/sector.b64e9689.webp)