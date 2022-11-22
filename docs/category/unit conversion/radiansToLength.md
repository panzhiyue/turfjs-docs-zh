# 弧度转长度(radiansToLength)

```
> npm install @turf/helpers
```

> Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit. Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
>
> 接收一个弧度数值，返回其指定单位的数值。单位有 miles(英里), nauticalmiles(海里), inches(英寸), yards(码), meters(米), metres(米), kilometers(千米), centimeters(厘米), feet(英尺)

**参数**

| 参数    | 类型   | 描述                                                         |
| :------ | :----- | :----------------------------------------------------------- |
| radians | number | 跨球面的弧度                                                 |
| units   | string | 转换后的单位。单位有 miles(英里), nauticalmiles(海里), inches(英寸), yards(码), meters(米), metres(米), kilometers(千米), centimeters(厘米), feet(英尺) |

**返回**

number - 转换后的长度

**示例**

```js
turf.radiansToLength(1.0471975511965976, 'meters'); // 6671704.814011974
```