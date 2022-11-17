# 点(point)

> Creates a Point Feature from a Position.
> 从一个位置创建一个`Point`。

```text
> npm install @turf/helpers
```

**参数**

| 参数        | 类型   | 描述                                                   |
| :---------- | :----- | :----------------------------------------------------- |
| coordinates | Array  | longitude, latitude position (each in decimal degrees) |
| properties  | Object | an Object of key-value pairs to add as properties      |
| options     | Object | Optional parameters: see below                         |

**options选项**

| 属性 | 类型             | 默认值 | 描述                                   |
| :--- | :--------------- | :----- | :------------------------------------- |
| bbox | (Array)          |        | Bounding Box Array                     |
| id   | (string\|number) |        | Identifier associated with the Feature |

**返回**

`Feature <Point>` - a Point feature

**示例**

```js
var point = turf.point([-75.343, 39.984]);

//=point
```