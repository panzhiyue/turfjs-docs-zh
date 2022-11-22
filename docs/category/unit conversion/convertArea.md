# 转换区域(convertArea)

```
> npm install @turf/helpers
```

> Converts a area to the requested unit. Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
>
> 接收一个面积数值，返回其指定单位的面积数值。单位有 kilometers(千米), kilometres(千米), meters(米), metres(米), centimetres(厘米), millimeters(毫米), acres(英亩), miles(英里), yards(码), feet(英尺), inches(英寸)

**参数**

| 参数         | 类型   | 描述               |
| :----------- | :----- | :----------------- |
| area         | number | 要被转换的面积数值 |
| originalUnit | string | 初始单位           |
| finalUnit    | string | 转换后的指定单位   |

**返回**

number - 转换后的面积值

**示例**

```js
turf.convertArea(1, "kilometers", "meters"); // 1000000，面积公式Math.pow(1000, 2)
```