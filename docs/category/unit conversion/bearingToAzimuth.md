# 转换方位角(bearingToAzimuth)

```
> npm install @turf/helpers
```

> Converts any bearing angle from the north line direction (positive clockwise) and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
> 转换从正北方向(顺时针正方向)开始的任何方位角度，并返回0-360度(顺时针正方向)之间的角度，0为正北

**参数**

| 参数    | 类型   | 描述                  |
| :------ | :----- | :-------------------- |
| bearing | number | 介于 -180 至 180 之间 |

**返回**

number - 介于 0 至 360 之间的角度

**示例**

```js
turf.bearingToAzimuth(-50); // 310

turf.bearingToAzimuth(50); // 50
```