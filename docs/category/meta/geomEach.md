# 几何对象遍历(geomEach)

```
> npm install @turf/meta
```

> Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
> 接收任意类型的 GeoJSON，遍历它的每个 Geometry。功能类似 Array.forEach()

**参数**

| 参数     | 类型                                 | 描述                                                         |
| :------- | :----------------------------------- | :----------------------------------------------------------- |
| geojson  | FeatureCollection\|Feature\|Geometry | 任意 GeoJSON 对象                                            |
| callback | Function                             | 回调，参数依次是 currentGeometry、featureIndex、featureProperties、featureBBox、featureId |

**返回**

undefined - undefined

**示例**

```js
var features = turf.featureCollection([
    turf.point([26, 37], {foo: 'bar'}),
    turf.point([36, 53], {hello: 'world'})
]);

turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
  //=currentGeometry
  //=featureIndex
  //=featureProperties
  //=featureBBox
  //=featureId
});
```