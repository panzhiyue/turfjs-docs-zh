# 多条线(multiLineString)

```
> npm install @turf/helpers
```

> Creates a Feature based on a coordinate array. Properties can be added optionally.
> 
> 接收三维数组坐标，创建多线要素(`Feature<MultiLineString>`)



**参数**

| 参数        | 类型   | 描述                 |
| :---------- | :----- | :------------------- |
| coordinates | Array  | 任意三维数组坐标     |
| properties  | Object | 出参的properties属性 |
| options     | Object | 可配置项             |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

`Feature <MultiLineString>` - a MultiLineString feature

`Feature <MultiLineString>` - 多线要素

**示例**

```js
var multiLine = turf.multiLineString(
  [
    [
      [0, 0],
      [10, 10]
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
    type: "MultiLineString",
    coordinates: [...]
  },
  properties: {
    id: "inner"
  },
  id: "outter"
}
*/
```