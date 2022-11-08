# 计算两点恒向线夹角(rhumbBearing)

> Takes two points and finds the bearing angle between them along a Rhumb line i.e. the angle measured in degrees start the north line (0 degrees)
> 取两个点，找出它们之间沿[恒向线 (opens new window)](https://baike.baidu.com/item/恒向线/61737?fr=aladdin)的夹角，即从北线开始(0度)测量的角度。

**参数**

| 参数    | 类型   | 描述                           |
| :------ | :----- | :----------------------------- |
| start   | Coord  | starting Point                 |
| end     | Coord  | ending Point                   |
| options | Object | Optional parameters: see below |

**options选项**

| 属性  | 类型    | 默认值 | 描述                                 |
| :---- | :------ | :----- | :----------------------------------- |
| final | boolean | false  | calculates the final bearing if true |

**返回**

number - bearing from north in decimal degrees, between -180 and 180 degrees (positive clockwise)

**示例**

```js
var point1 = turf.point([-75.343, 39.984], {"marker-color": "#F00"});
var point2 = turf.point([-75.534, 39.123], {"marker-color": "#00F"});

var bearing = turf.rhumbBearing(point1, point2);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/rhumbBearing.814edb3e.webp)