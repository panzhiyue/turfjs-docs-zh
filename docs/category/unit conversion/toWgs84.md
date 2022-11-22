# 墨卡托转WGS84(toWgs84)

```
> npm install @turf/projection
```

> Converts a Mercator (EPSG:900913) GeoJSON object into WGS84 projection
>
> 接收 墨卡托(EPSG:900913，等效 EPSG:3857)坐标系 的 GeoJSON 对象，转换为 WGS84 坐标投影

**参数**

| 参数    | 类型              | 描述                     |
| :------ | :---------------- | :----------------------- |
| geojson | GeoJSON\|Position | EPSG:3857 坐标系 GeoJSON |
| options | Object            | 可配置项                 |

**options选项**

| 属性   | 类型    | 默认值 | 描述                                           |
| :----- | :------ | :----- | :--------------------------------------------- |
| mutate | boolean | false  | 是否返回入参的 GeoJSON，为 true 性能能显著提高 |

**返回**

GeoJSON - 投影后的GeoJSON

**示例**

```js
var pt = turf.point([-7903683.846322424, 5012341.663847514]);
var converted = turf.toWgs84(pt);
/*
{
  type: "FeatureCollection",
  geometry: {
    type: "Point"
    coordinates: [-71, 41]
  },
  properties: {}
}
*/
```