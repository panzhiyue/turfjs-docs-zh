# 随机位置(randomPosition)

```
> npm install @turf/random
```

> Returns a random position within a box.
> 接收一个边界框范围,返回在改边界框内随机的经纬度坐标

**参数**

| 参数 | 类型  | 描述   |
| :--- | :---- | :----- |
| bbox | Array | 边界框 |

**返回**

Array - Position longitude, latitude

Array - 经纬度坐标

**示例**

```js
var position = turf.randomPosition([-180, -90, 180, 90]); // [lng, lat]
```