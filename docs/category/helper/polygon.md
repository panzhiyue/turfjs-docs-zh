# 多边形(polygon)

```
> npm install @turf/helpers
```

> Creates a Polygon Feature from an Array of LinearRings.
> 接收一个二维数组坐标，创建面要素(`Feature<Polygon>`)

**参数**

| 参数        | 类型   | 描述                   |
| :---------- | :----- | :--------------------- |
| coordinates | Array  | 任意二维数组坐标       |
| properties  | Object | 出参的 properties 属性 |
| options     | Object | 可配置项               |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

`Feature <Polygon>` - Polygon Feature

`Feature <Polygon>` - 面要素

**示例**

```js
var polygon = turf.polygon(
  [
    [
      [-5, 52],
      [-4, 56],
      [-2, 51],
      [-7, 54],
      [-5, 52]
    ]
  ],
  { id: "poly1" }, // properties
  { id: "poly2" }
);
/*
{
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-5, 52],
        [-4, 56],
        [-2, 51],
        [-7, 54],
        [-5, 52]
      ]
    ]
  },
  properties: {
    id: "poly1"
  },
  id: "poly2"
}
*/
```