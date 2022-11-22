# 坐标小数点处理(truncate)

```
> npm install @turf/truncate
```

> Takes a GeoJSON Feature or FeatureCollection and truncates the precision of the geometry.
> 
> 接收GeoJSON，返回四舍五入后的GeoJSON。

**参数**

| 参数    | 类型    | 描述            |
| :------ | :------ | :-------------- |
| geojson | GeoJSON | 任意GeoJSON对象 |
| options | Object  | 可配置项        |

**options选项**

| 属性        | 类型    | 默认值 | 描述                                           |
| :---------- | :------ | :----- | :--------------------------------------------- |
| precision   | number  | 6      | 坐标的小数点精确位数                           |
| coordinates | number  | 3      | 最大坐标数(主要用于删除 z 坐标)                |
| mutate      | boolean | false  | 是否返回入参的 GeoJSON，为 true 性能能显著提高 |

**返回**

GeoJSON - layer with truncated geometry

GeoJSON - 四舍五入后的GeoJSON



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

