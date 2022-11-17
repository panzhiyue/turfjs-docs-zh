# flattenEach

> Iterate over flattened features in any GeoJSON object, similar to Array.forEach.
> 迭代任何GeoJSON对象中的扁平特性，类似于`Array.forEach`。

```text
> npm install @turf/meta
```

**参数**

| 参数     | 类型                                   | 描述                                                         |
| :------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson  | (FeatureCollection\|Feature\|Geometry) | any GeoJSON object                                           |
| callback | Function                               | a method that takes (currentFeature, featureIndex, multiFeatureIndex) |

**示例**

```js
var features = turf.featureCollection([
    turf.point([26, 37], {foo: 'bar'}),
    turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
]);

turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
  //=currentFeature
  //=featureIndex
  //=multiFeatureIndex
});
```