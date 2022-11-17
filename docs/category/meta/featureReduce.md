# featureReduce

> Reduce features in any GeoJSON object, similar to Array.reduce().
> 任何GeoJSON对象中的Reduce`Feature`，类似于`Array.reduce()`。

```text
> npm install @turf/meta
```

**参数**

| 参数         | 类型                                   | 描述                                                         |
| :----------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson      | (FeatureCollection\|Feature\|Geometry) | any GeoJSON object                                           |
| callback     | Function                               | a method that takes (previousValue, currentFeature, featureIndex) |
| initialValue | (*)                                    | Value to use as the first argument to the first call of the callback. |

**返回**

- The value that results from the reduction.

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], {"foo": "bar"}),
  turf.point([36, 53], {"hello": "world"})
]);

turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
  //=previousValue
  //=currentFeature
  //=featureIndex
  return currentFeature
});
```