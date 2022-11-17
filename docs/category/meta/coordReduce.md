# 坐标累加(coordReduce)

> Reduce coordinates in any GeoJSON object, similar to Array.reduce()
> 在GeoJSON对象中减少坐标，类似于`Array.reduce()`

```text
> npm install @turf/meta
```

**参数**

| 参数             | 类型                                   | 描述                                                         |
| :--------------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson          | (FeatureCollection\|Geometry\|Feature) | any GeoJSON object                                           |
| callback         | Function                               | a method that takes (previousValue, currentCoord, coordIndex) |
| initialValue     | (*)                                    | Value to use as the first argument to the first call of the callback. |
| excludeWrapCoord | boolean                                | whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration. |

**返回**

- The value that results from the reduction.

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], {"foo": "bar"}),
  turf.point([36, 53], {"hello": "world"})
]);

turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
  //=previousValue
  //=currentCoord
  //=coordIndex
  //=featureIndex
  //=multiFeatureIndex
  //=geometryIndex
  return currentCoord;
});
```