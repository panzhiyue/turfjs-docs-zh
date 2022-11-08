# 根据点、距离和角度计算目标点(rhumbDestination)

> Returns the destination Point having travelled the given distance along a Rhumb line from the origin Point with the (varant) given bearing.
> 返回从原点到给定方位(变值)沿 [恒向线 (opens new window)](https://baike.baidu.com/item/恒向线/61737?fr=aladdin)移动给定距离的目标点。

**参数**

| 参数     | 类型   | 描述                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| origin   | Coord  | starting Point                                               |
| distance | number | distance from the starting point                             |
| bearing  | number | varant bearing angle ranging from -180 to 180 degrees from north |
| options  | Object | Optional parameters: see below                               |

**options选项**

| 属性       | 类型   | 默认值     | 描述                                          |
| :--------- | :----- | :--------- | :-------------------------------------------- |
| units      | string | kilometers | can be degrees, radians, miles, or kilometers |
| properties | Object | {}         | translate properties to destination point     |

**返回**

Feature `<Point>` - Destination point.

**示例**

```js
var pt = turf.point([-75.343, 39.984], {"marker-color": "F00"});
var distance = 50;
var bearing = 90;
var options = {units: 'miles'};

var destination = turf.rhumbDestination(pt, distance, bearing, options);
```