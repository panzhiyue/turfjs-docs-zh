# 墨卡托转WGS84(toWgs84)

> Converts a Mercator (EPSG:900913) GeoJSON object into WGS84 projection
> 将Mercator (EPSG:900913) GeoJSON对象转换为WGS84投影

```text
> npm install @turf/projection
```

**参数**

| 参数    | 类型                                     | 描述                    |
| :------ | :--------------------------------------- | :---------------------- |
| geojson | (GeoJSON\|Position)                      | Mercator GeoJSON object |
| options | Object \| Optional parameters: see below |                         |

**options选项**

| 属性   | 类型    | 默认值 | 描述                                                         |
| :----- | :------ | :----- | :----------------------------------------------------------- |
| mutate | boolean | false  | allows GeoJSON input to be mutated (significant performance increase if true) |

**返回**

GeoJSON - true/false

**示例**

```js
var pt = turf.point([-7903683.846322424, 5012341.663847514]);
var converted = turf.toWgs84(pt);
```