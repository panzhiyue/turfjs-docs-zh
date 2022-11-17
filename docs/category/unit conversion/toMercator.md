# toMercator

> Converts a WGS84 GeoJSON object into Mercator (EPSG:900913) projection
> 将WGS84 GeoJSON对象转换为Mercator (EPSG:900913)投影

```text
> npm install @turf/projection
```

**参数**

| 参数    | 类型                                       | 描述                 |
| :------ | :----------------------------------------- | :------------------- |
| geojson | (GeoJSON\|Position)                        | WGS84 GeoJSON object |
| options | (Object) \| Optional parameters: see below |                      |

**options选项**

| 属性   | 类型    | 默认值 | 描述                                                         |
| :----- | :------ | :----- | :----------------------------------------------------------- |
| mutate | boolean | false  | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - true/false

**示例**

```js
var pt = turf.point([-71,41]);
var converted = turf.toMercator(pt);
```