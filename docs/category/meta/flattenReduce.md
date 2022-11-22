# flatten累加(flattenReduce)

```
> npm install @turf/meta
```

> Reduce flattened features in any GeoJSON object, similar to Array.reduce().
>
> 接收任意 GeoJSON 对象(包括要素集)，遍历累加操作。功能类似 `Array.reduce()`
>
> 值得注意的是，如果是多要素集，做扁平处理再遍历，功能类似 `Array.flat()`

**参数**

| 参数         | 类型                                 | 描述                                                         |
| :----------- | :----------------------------------- | :----------------------------------------------------------- |
| geojson      | FeatureCollection\|Feature\|Geometry | 任意 GeoJSON 对象                                            |
| callback     | Function                             | 回调，参数依次是 previousValue、currentFeature、featureIndex、multiFeatureIndex |
| initialValue | (*)                                  | 初始值                                                       |

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