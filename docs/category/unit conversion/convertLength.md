# convertLength

> Converts a length to the requested unit. Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
> 将长度转换为所请求的单位。有效单位:英里、航海英里、英寸、码、米、米、公里、厘米、英尺

```text
> npm install @turf/helpers
```

**参数**

| 参数         | 类型   | 描述            |
| :----------- | :----- | :-------------- |
| length       | number | to be converted |
| originalUnit | string | of the length   |
| finalUnit    | string | returned unit   |

**返回**

number - the converted length

```js
turf.convertLength(1000, 'meters', 'kilometers'); // 1
```