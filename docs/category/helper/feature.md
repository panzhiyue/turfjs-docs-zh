# feature

> Wraps a GeoJSON Geometry in a GeoJSON Feature.
> 在GeoJSON`Feature`中包裹GeoJSON几何图形。

```text
> npm install @turf/helpers
```

**参数**

| 参数       | 类型     | 描述                                              |
| :--------- | :------- | :------------------------------------------------ |
| geometry   | Geometry | input geometry                                    |
| properties | Object   | an Object of key-value pairs to add as properties |
| options    | Object   | Optional parameters: see below                    |

**options选项**

| 属性 | 类型             | 默认值 | 描述                                   |
| :--- | :--------------- | :----- | :------------------------------------- |
| bbox | (Array)          |        | Bounding Box Array                     |
| id   | (string\|number) |        | Identifier associated with the Feature |

**返回**

Feature - a GeoJSON Feature

**示例**

```js
var geometry = {
  "type": "Point",
  "coordinates": [110, 50]
};

var feature = turf.feature(geometry);

//=feature
```