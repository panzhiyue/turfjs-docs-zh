# 坐标小数点处理(truncate)

> Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
> 
> 获取GeoJSON`Feature`或`FeatureCollection`，并截断几何图形的精度。

**参数**

| 参数    | 类型    | 描述                                                         |
| :------ | :------ | :----------------------------------------------------------- |
| geojson | GeoJSON | any GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection. |
| options | Object  | Optional parameters: see below                               |

**options选项**

| 属性        | 类型    | 默认值 | 描述                                                         |
| :---------- | :------ | :----- | :----------------------------------------------------------- |
| precision   | number  | 6      | coordinate decimal precision                                 |
| coordinates | number  | 3      | maximum number of coordinates (primarly used to remove z coordinates) |
| mutate      | boolean | false  | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - layer with truncated geometry

**示例**

```js
var point = turf.point([
    70.46923055566859,
    58.11088890802906
]);
var options = {precision: 3, coordinates: 2};
var truncated = turf.truncate(point, options);
//=truncated.geometry.coordinates => [70.469, 58.111]
```

