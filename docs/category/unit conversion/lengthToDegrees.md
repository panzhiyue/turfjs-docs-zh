# 长度转角度(lengthToDegrees)

> Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
> 将距离度量(假设地球是球形的)从真实的单位转换为度数的有效单位:英里、航海英里、英寸、码、米、米、厘米、公里、英尺

```text
> npm install @turf/helpers
```

**参数**

| 参数     | 类型   | 描述                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| distance | number | in real units                                                |
| units    | string | can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers. |

**返回**

number - degrees

```js
turf.lengthToDegrees(6671704.814011974, 'meters'); // 60
```