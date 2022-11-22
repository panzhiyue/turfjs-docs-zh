# feature

> npm install @turf/helpers

> Wraps a GeoJSON Geometry in a GeoJSON Feature.
> 接收Geometry，创建一个GeoJSON要素(Feature)

**参数**

| 参数       | 类型     | 描述                         |
| :--------- | :------- | :--------------------------- |
| geometry   | Geometry | 入参几何(Geometry)           |
| properties | Object   | 输出GeoJSON的properties 属性 |
| options    | Object   | 可配置项                     |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

Feature - a GeoJSON Feature

Feature - GeoJSON要素(Feature)

**示例**

```js
var geometry = {
  type: "Point",
  coordinates: [110, 50]
};

var feature = turf.feature(
  geometry,
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
    type: "Point",
    coordinates: [110, 50]
  },
  properties: {
    id: "inner" // 在properties里
  },
  id: "outter"
}
*/
```