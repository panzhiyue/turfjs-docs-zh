# convertArea

> Converts a area to the requested unit. Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
> 将一个区域转换为所请求的单位。有效单位:公里、公里、米、米、厘米、毫米、英亩、英里、码、英尺、英寸

```text
> npm install @turf/helpers
```

**参数**

| 参数         | 类型   | 描述            |
| :----------- | :----- | :-------------- |
| area         | number | to be converted |
| originalUnit | string | of the distance |
| finalUnit    | string | returned unit   |

**返回**

number - the converted distance

```js
turf.convertArea(1000000, 'meters', 'kilometers'); // 1
```