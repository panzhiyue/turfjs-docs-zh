# 多点(multiPoint)

```
> npm install @turf/helper
```

> Creates a Feature based on a coordinate array. Properties can be added optionally.
> 
> 接收二维数组坐标，创建并返回多点要素(`Feature<MultiPoint>`)



**参数**

| 参数        | 类型   | 描述                   |
| :---------- | :----- | :--------------------- |
| coordinates | Array  | 任意二维               |
| properties  | Object | 出参的 properties 属性 |
| options     | Object | 可配置项               |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

`Feature <MultiPoint>` - a MultiPoint feature

`Feature <MultiPoint>` - 多点要素

**示例**

```js
 var multiPt = turf.multiPoint(
  [
    [0, 0],
    [10, 10]
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
    type: "MultiPoint",
    coordinates: [...]
  },
  properties: {
    id: "inner"
  },
  id: "outter"
}
*/
```