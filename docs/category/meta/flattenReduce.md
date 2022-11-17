# flattenReduce

> Reduce flattened features in any GeoJSON object, similar to Array.reduce().
> 在GeoJSON对象中减少扁平`feature`，类似于`Array.reduce()`。

```text
> npm install @turf/meta
```

**参数**

| 参数         | 类型                                   | 描述                                                         |
| :----------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson      | (FeatureCollection\|Feature\|Geometry) | any GeoJSON object                                           |
| callback     | Function                               | a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex) |
| initialValue | (*)                                    | Value to use as the first argument to the first call of the callback. |

**返回**

- The value that results from the reduction.

**示例**

```js
var features = turf.featureCollection([
    turf.point([26, 37], {foo: 'bar'}),
    turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
]);

turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
  //=previousValue
  //=currentFeature
  //=featureIndex
  //=multiFeatureIndex
  return currentFeature
});
```