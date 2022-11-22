# 几何对象集合(geometryCollection)

```
> npm install @turf/helpers
```

> Creates a Feature based on a coordinate array. Properties can be added optionally.
> 接收任意的Geometry数组，创建tyoe为GeometryCollection的集合



**参数**

| 参数       | 类型               | 描述                   |
| :--------- | :----------------- | :--------------------- |
| geometries | `Array <Geometry>` | 入参Geometry的数组     |
| properties | Object             | 出参的 properties 属性 |
| options    | Object             | 可配置项               |

**options选项**

| 属性 | 类型             | 默认值 | 描述   |
| :--- | :--------------- | :----- | :----- |
| bbox | (Array)          |        | 边界框 |
| id   | (string\|number) |        | 标识符 |

**返回**

`Feature <GeometryCollection>` - a GeoJSON GeometryCollection Feature

**示例**

```js
var pt = {
  type: "Point",
  coordinates: [100, 0]
};
var line = {
  type: "LineString",
  coordinates: [
    [101, 0],
    [102, 1]
  ]
};
var collection = turf.geometryCollection(
  [pt, line],
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
    type: "GeometryCollection",
    geometries: [
      {
        type: "Point",
        coordinates: [100, 0]
      },
      {
        type: "LineString",
        coordinates: [
          [101, 0],
          [102, 1]
        ]
      }
    ]
  },
  properties: {
    id: 'inner',
  },
  id: "outter"
}
*/
```