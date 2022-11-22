# 计算扇形多边形(sector)

```
> npm install @turf/sector
```

> Creates a circular sector of a circle of given radius and center Point , between (clockwise) bearing1 and bearing2; 0 bearing is North of center point, positive clockwise.
> 在角度bearing1和角度bearing2之间创建给定半径和圆心点的扇形。

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

| 属性       | 类型       | 默认值     | 描述                                               |
| :--------- | :--------- | :--------- | :------------------------------------------------- |
| units      | string     | kilometers | 单位，可选的有 degrees、radians、miles、kilometers |
| steps      | number     | 64         | 圆弧的平滑度，数值越高越平滑                       |
| properties | Properties | {}         | 输出GeoJSON的properties 属性                       |

**返回**

`Feature <Polygon>` - sector polygon

`Feature <Polygon>` - 扇形面

**示例**

```js
var center = turf.point([-75, 40]);
var radius = 5;
var bearing1 = 25;
var bearing2 = 45;

var sector = turf.sector(center, radius, bearing1, bearing2); // type 为 Polygon 的扇形面要素
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/sector.b64e9689.webp)