# 点(point)

```
> npm install @turf/helpers
```

> Creates a Point Feature from a Position.
> 
> 接收一个一维数组坐标，创建一个点要素(`Feature<Point>`)

**参数**

| 参数        | 类型   | 描述                   |
| :---------- | :----- | :--------------------- |
| coordinates | Array  | 任意一维数组坐标       |
| properties  | Object | 出参的 properties 属性 |
| options     | Object | 可配置项               |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

`Feature <Point>` - a Point feature

`Feature <Point>` - 点要素

**示例**

```js
var point = turf.point([-75.343, 39.984], {
  id: ""
});
/*
{
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-75.343, 39.984]
  },
  properties: {
    id: ""
  }
}
*/
```