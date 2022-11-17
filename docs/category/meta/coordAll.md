# coordAll

> Get all coordinates from any GeoJSON object.
> 从任何GeoJSON对象获取所有坐标。

```text
> npm install @turf/meta
```

**参数**

| 参数    | 类型                                   | 描述               |
| :------ | :------------------------------------- | :----------------- |
| geojson | (FeatureCollection\|Feature\|Geometry) | any GeoJSON object |

**返回**

Array > - coordinate position array

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], {foo: 'bar'}),
  turf.point([36, 53], {hello: 'world'})
]);

var coords = turf.coordAll(features);
//= [[26, 37], [36, 53]]
```