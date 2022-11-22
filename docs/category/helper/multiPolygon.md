# 多个多边形(multiPolygon)

```
> npm install @turf/helpers
```

> Creates a Feature based on a coordinate array. Properties can be added optionally.
> 接收四维数组坐标，创建并返回多面要素(`Feature<MultiPolygon>`)

**参数**

| 参数        | 类型   | 描述                   |
| :---------- | :----- | :--------------------- |
| coordinates | Array  | 任意四维数组坐标       |
| properties  | Object | 出参的 properties 属性 |
| options     | Object | 可配置项               |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

`Feature <MultiPolygon>` - a multipolygon feature

`Feature <MultiPolygon>` - 多面要素

**示例**

```js
var multiPoly = turf.multiPolygon(
  [
    [
      [
        [0, 0],
        [0, 10],
        [10, 10],
        [10, 0],
        [0, 0]
      ]
    ]
  ],
  {
    id: "inner"
  },
  {
    id: "outter"
  }
);
/*
{
  type: "Feature",
  geometry: {
    type: "MultiPolygon",
    coordinates: [...]
  },
  properties: {
    id: "inner"
  },
  id: "outter"
}
*/
```