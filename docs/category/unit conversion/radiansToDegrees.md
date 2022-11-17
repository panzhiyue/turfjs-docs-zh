# radiansToLength

> Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit. Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
> 将距离度量(假设地球是球形的)从弧度转换为更友好的单位。有效单位:英里、航海英里、英寸、码、米、米、公里、厘米、英尺

```text
> npm install @turf/helpers
```

**参数**

| 参数    | 类型   | 描述                                                         |
| :------ | :----- | :----------------------------------------------------------- |
| radians | number | in radians across the sphere                                 |
| units   | string | can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers. |

**返回**

number - distance

```js
turf.radiansToLength(1.0471975511965976, 'meters'); // 6671704.814011974
```