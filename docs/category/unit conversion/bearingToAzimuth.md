# bearingToAzimuth

> Converts any bearing angle from the north line direction (positive clockwise) and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
> 转换从正北方向(顺时针正方向)开始的任何方位角度，并返回0-360度(顺时针正方向)之间的角度，0为正北

```text
> npm install @turf/helpers
```

**参数**

| 参数    | 类型   | 描述                                 |
| :------ | :----- | :----------------------------------- |
| bearing | number | angle, between -180 and +180 degrees |

**返回**

number - angle between 0 and 360 degrees

```js
turf.bearingToAzimuth(-45); // 315
```