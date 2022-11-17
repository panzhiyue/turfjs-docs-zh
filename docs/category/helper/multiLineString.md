# 多条线(multiLineString)

> Creates a Feature based on a coordinate array. Properties can be added optionally.
> 基于坐标数组创建`Feature`。属性可以随意添加。

```text
> npm install @turf/helpers
```

**参数**

| 参数        | 类型   | 描述                                              |
| :---------- | :----- | :------------------------------------------------ |
| coordinates | Array  | an array of LineStrings                           |
| properties  | Object | an Object of key-value pairs to add as properties |
| options     | Object | Optional parameters: see below                    |

**options选项**

| 属性 | 类型             | 默认值 | 描述                                   |
| :--- | :--------------- | :----- | :------------------------------------- |
| bbox | (Array)          |        | Bounding Box Array                     |
| id   | (string\|number) |        | Identifier associated with the Feature |

**返回**

`Feature <MultiLineString>` - a MultiLineString feature

**示例**

```js
var multiLine = turf.multiLineString([[[0,0],[10,10]]]);

//=multiLine
```