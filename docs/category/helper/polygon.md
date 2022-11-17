# 多边形(polygon)

> Creates a Polygon Feature from an Array of LinearRings.
> 从`LinearRing`数组创建`Polygon`。

```text
> npm install @turf/helpers
```

**参数**

| 参数        | 类型   | 描述                                              |
| :---------- | :----- | :------------------------------------------------ |
| coordinates | Array  | an array of LinearRings                           |
| properties  | Object | an Object of key-value pairs to add as properties |
| options     | Object | Optional parameters: see below                    |

**options选项**

| 属性 | 类型             | 默认值 | 描述                                   |
| :--- | :--------------- | :----- | :------------------------------------- |
| bbox | (Array)          |        | Bounding Box Array                     |
| id   | (string\|number) |        | Identifier associated with the Feature |

**返回**

`Feature <Polygon>` - Polygon Feature

**示例**

```js
var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });

//=polygon
```