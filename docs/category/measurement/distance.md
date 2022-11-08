# 计算两点间距离(distance)

> Calculates the distance between two points in degrees, radians, miles, or kilometers. This uses the Haversine formula to account for global curvature.
> 以度、弧度、英里或公里为单位计算两点之间的距离。

**参数**

| 参数    | 类型   | 描述                           |
| :------ | :----- | :----------------------------- |
| from    | Coord  | origin point                   |
| to      | Coord  | destination point              |
| options | Object | Optional parameters: see below |

**options选项**

| 属性  | 类型   | 默认值     | 描述                                          |
| :---- | :----- | :--------- | :-------------------------------------------- |
| units | string | kilometers | can be degrees, radians, miles, or kilometers |

**返回**

number - distance between the two points

**示例**

```js
var from = turf.point([-75.343, 39.984]);
var to = turf.point([-75.534, 39.123]);
var options = {units: 'miles'};

var distance = turf.distance(from, to, options);
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/distance.8648291e.webp)