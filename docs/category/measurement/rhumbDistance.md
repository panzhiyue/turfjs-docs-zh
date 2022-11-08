# 计算两点间的距离(rhumbDistance)

> Calculates the distance along a rhumb line between two points in degrees, radians, miles, or kilometers.
> 以度、弧度、英里或公里为单位计算两点之间沿恒向线的距离。

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

var distance = turf.rhumbDistance(from, to, options);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/rhumbDistance.595f988c.webp)