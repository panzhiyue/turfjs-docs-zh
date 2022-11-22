# 长度转角度(lengthToDegrees)

```
> npm install @turf/helpers
```

> Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
>
> 接收一个真实单位的距离测量数值(假设是球形地球)，返回其指定单位的数值。单位有 miles(英里), nauticalmiles(海里), inches(英寸), yards(码), meters(米), metres(米), kilometers(千米), centimeters(厘米), feet(英尺)

**参数**

| 参数     | 类型   | 描述                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| distance | number | 测量数值                                                     |
| units    | string | 传入值单位。单位有 miles(英里), nauticalmiles(海里), inches(英寸), yards(码), meters(米), metres(米), kilometers(千米), centimeters(厘米), feet(英尺) |

**返回**

number - degrees

```js
turf.lengthToDegrees(6671704.814011974, 'meters'); // 60
```