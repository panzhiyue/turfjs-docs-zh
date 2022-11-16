# geometryCollection

> Creates a Feature based on a coordinate array. Properties can be added optionally.
> 基于坐标数组创建`Feature`。属性可以随意添加。

```text
> npm install @turf/helpers
```

**参数**

| 参数       | 类型               | 描述                                              |
| :--------- | :----------------- | :------------------------------------------------ |
| geometries | `Array <Geometry>` | an array of GeoJSON Geometries                    |
| properties | Object             | an Object of key-value pairs to add as properties |
| options    | Object             | Optional parameters: see below                    |

**options选项**

| 属性 | 类型             | 默认值 | 描述                                   |
| :--- | :--------------- | :----- | :------------------------------------- |
| bbox | (Array)          |        | Bounding Box Array                     |
| id   | (string\|number) |        | Identifier associated with the Feature |

**返回**

`Feature <GeometryCollection>` - a GeoJSON GeometryCollection Feature

**示例**

```js
var pt = {
    "type": "Point",
      "coordinates": [100, 0]
    };
var line = {
    "type": "LineString",
    "coordinates": [ [101, 0], [102, 1] ]
  };
var collection = turf.geometryCollection([pt, line]);

//=collection
```