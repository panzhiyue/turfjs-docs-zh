# coordEach

> Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
> 迭代任何GeoJSON对象中的坐标，类似于`Array.forEach()`

```text
> npm install @turf/meta
```

**参数**

| 参数             | 类型                                   | 描述                                                         |
| :--------------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson          | (FeatureCollection\|Feature\|Geometry) | any GeoJSON object                                           |
| callback         | Function                               | a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex) |
| excludeWrapCoord | boolean                                | whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration. |

**返回**

undefined - undefined

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], {"foo": "bar"}),
  turf.point([36, 53], {"hello": "world"})
]);

turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
  //=currentCoord
  //=coordIndex
  //=featureIndex
  //=multiFeatureIndex
  //=geometryIndex
});
```