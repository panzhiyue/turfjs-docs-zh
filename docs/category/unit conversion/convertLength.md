# 转换长度(convertLength)

```
> npm install @turf/helpers
```

> Converts a length to the requested unit. Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
>
> 接收一个长度数值，返回其指定单位的长度数值。单位有 kilometers(千米), nauticalmiles(海里), meters(米), metres(米), centimeters(厘米), miles(英里), yards(码), feet(英尺), inches(英寸)

**参数**

| 参数         | 类型   | 描述               |
| :----------- | :----- | :----------------- |
| length       | number | 要被转换的面积数值 |
| originalUnit | string | 初始单位           |
| finalUnit    | string | 转换后的指定单位   |

**返回**

number - 转换后的长度值

**示例**

```js
turf.convertLength(1000, 'meters', 'kilometers'); // 1
```