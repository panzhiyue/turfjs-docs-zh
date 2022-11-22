# 获取所有坐标(coordAll)

```
> npm install @turf/meta
```

> Get all coordinates from any GeoJSON object.
> 接收任意的GeoJSON对象(包括要素集合)，以二维数组的形式返回它们的坐标

**参数**

| 参数    | 类型                                   | 描述            |
| :------ | :------------------------------------- | :-------------- |
| geojson | (FeatureCollection\|Feature\|Geometry) | 任意GeoJSON对象 |

**返回**

Array > - 二维数组坐标

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], { foo: "bar" }),
  turf.point([36, 53], { hello: "world" })
]);

var coords = turf.coordAll(features);
//= [[26, 37], [36, 53]]

var coords = turf.coordAll(turf.point([26, 37], { foo: "bar" }));
//= [[26, 37]] 虽然只有一个要素，还是以二维数组的形式返回
```