# 计算2点间的弧线(greatCircle)

> Calculate great circles routes as LineString
> 用`LineString`计算大圆路线

**参数**

| 参数    | 类型   | 描述                           |
| :------ | :----- | :----------------------------- |
| start   | Coord  | source point feature           |
| end     | Coord  | destination point feature      |
| options | Object | Optional parameters: see below |

**options选项**

| 属性       | 类型   | 默认值 | 描述                                                         |
| :--------- | :----- | :----- | :----------------------------------------------------------- |
| properties | Object | {}     | line feature properties                                      |
| npoints    | number | 100    | number of points                                             |
| offset     | number | 10     | offset controls the likelyhood that lines will be split which cross the dateline. The higher the number the more likely.(偏移量控制跨越日期变更线的线被分割的可能性。数字越高，可能性越大) |

**返回**

Feature `<LineString>` - great circle line feature

**示例**

```js
var start = turf.point([-122, 48]);
var end = turf.point([-77, 39]);

var greatCircle = turf.greatCircle(start, end, {'name': 'Seattle to DC'});
```

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/greatCircle.5d38447e.webp)