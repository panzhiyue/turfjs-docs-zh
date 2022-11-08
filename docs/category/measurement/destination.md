# 根据点、距离和角度计算目标点(destination)

> Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the Haversine formula to account for global curvature.
> 获取一个点并计算给定距离(以度、弧度、英里或公里为单位)的目标点的位置。

**参数**

| 参数     | 类型   | 描述                           |
| :------- | :----- | :----------------------------- |
| origin   | Coord  | starting point                 |
| distance | number | distance from the origin point |
| bearing  | number | ranging from -180 to 180       |
| options  | Object | Optional parameters: see below |

**options选项**

| 属性       | 类型   | 默认值     | 描述                                   |
| :--------- | :----- | :--------- | :------------------------------------- |
| units      | string | kilometers | miles, kilometers, degrees, or radians |
| properties | Object | {}         | Translate properties to Point          |

**返回**

Feature`<Point>` - destination point

**示例**

```js
var point = turf.point([-75.343, 39.984]);
var distance = 50;
var bearing = 90;
var options = {units: 'miles'};

var destination = turf.destination(point, distance, bearing, options);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/destination.7512f72b.webp)