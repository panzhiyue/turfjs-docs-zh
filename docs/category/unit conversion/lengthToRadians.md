# 长度转弧度(lengthToRadians)

> Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
> 将距离测量(假设地球是球形的)从真实的单位转换为弧度的有效单位:英里、海洋英里、英寸、码、米、米、公里、厘米、英尺

```text
> npm install @turf/helpers
```

**参数**

| 参数     | 类型   | 描述                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| distance | number | in real units                                                |
| units    | string | can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers. |

**返回**

number - radians

```js
turf.lengthToRadians(6671704.814011974, 'meters');  // 1.0471975511965976
```