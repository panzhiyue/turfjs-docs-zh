# 计算两点中心点(midpoint)

> Takes two points and returns a point midway between them. The midpoint is calculated geodesically, meaning the curvature of the earth is taken into account.
> 获取两个点并返回中间的一个点。中点是测地线计算的，这意味着地球的 [曲率 (opens new window)](https://baike.baidu.com/item/曲率/9985286?fr=aladdin)被考虑在内。

**参数**

| 参数   | 类型  | 描述         |
| :----- | :---- | :----------- |
| point1 | Coord | first point  |
| point2 | Coord | second point |

**返回**

Feature `<Point>` - a point midway between pt1 and pt2

**示例**

```js
var point1 = turf.point([144.834823, -37.771257]);
var point2 = turf.point([145.14244, -37.830937]);

var midpoint = turf.midpoint(point1, point2);
```



![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/midpoint.c2f5c5cb.webp)