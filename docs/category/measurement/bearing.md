# 计算两点间角度(bearing)

> Takes two points and finds the geographic bearing between them, i.e. the angle measured in degrees from the north line (0 degrees)
> 获取两个点，找出它们之间的地理方位，即从正北算起的角度(0度)

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

number - bearing in decimal degrees, between -180 and 180 degrees (positive clockwise)

**示例**

```js
var point1 = turf.point([109.104262, 37.831315]);
var point2 = turf.point([102.865569, 34.089941]);

var bearing = turf.bearing(point1, point2);
```

```
npm install @turf/bearing
```

![image-20221108114651670](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/image-20221108114651670.webp)