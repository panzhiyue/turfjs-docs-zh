# lineString

> Creates a LineString Feature from an Array of Positions.
> 从位置数组中创建`LineString`。

```text
> npm install @turf/helpers
```

**参数**

| 参数        | 类型   | 描述                                              |
| :---------- | :----- | :------------------------------------------------ |
| coordinates | Array  | an array of Positions                             |
| properties  | Object | an Object of key-value pairs to add as properties |
| options     | Object | Optional parameters: see below                    |

**options选项**

| 属性 | 类型             | 默认值 | 描述                                   |
| :--- | :--------------- | :----- | :------------------------------------- |
| bbox | (Array)          |        | Bounding Box Array                     |
| id   | (string\|number) |        | Identifier associated with the Feature |

**返回**

`Feature <LineString>` - LineString Feature

**示例**

```js
var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});

//=linestring1
//=linestring2
```