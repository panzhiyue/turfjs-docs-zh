# 线(lineString)

```
> npm install @turf/helpers
```

> Creates a LineString Feature from an Array of Positions.
> 
> 接收二维数组坐标，创建线要素(`Feature<LineString>`)。

**参数**

| 参数        | 类型   | 描述                                |
| :---------- | :----- | :---------------------------------- |
| coordinates | Array  | 任意二维数组坐标，坐标对长度应大于1 |
| properties  | Object | 出参的properties属性                |
| options     | Object | 可配置                              |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

`Feature <LineString>` - LineString Feature

`Feature <LineString>` - 线要素

**示例**

```js
var linestring1 = turf.lineString(
  [
    [-24, 63],
    [-23, 60],
    [-25, 65],
    [-20, 69]
  ],
  { name: "line 1" }
);
var linestring2 = turf.lineString(
  [
    [-14, 43],
    [-13, 40],
    [-15, 45],
    [-10, 49]
  ],
  { id: "inner" }, // properties
  { id: "outter" }
);
/*
{
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [-14, 43],
      [-13, 40],
      [-15, 45],
      [-10, 49]
    ]
  },
  properties: {
    id: "inner"
  },
  id: "outter"
}
*/
```