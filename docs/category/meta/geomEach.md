# 几何对象遍历(geomEach)

> Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
> 迭代任何GeoJSON对象中的每个几何图形，类似于`Array.forEach()`

```text
> npm install @turf/meta
```

**参数**

| 参数     | 类型                                   | 描述                                                         |
| :------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson  | (FeatureCollection\|Feature\|Geometry) | any GeoJSON object                                           |
| callback | Function                               | a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) |

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