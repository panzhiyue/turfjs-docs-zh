# feature累加(featureReduce)

```
npm install @turf/meta
```

> Reduce features in any GeoJSON object, similar to Array.reduce().
> 接收任何GeoJSON对象(包括要素集合)，遍历累加操作，类似于`Array.reduce()`。



**参数**

| 参数         | 类型                                   | 描述                                                         |
| :----------- | :------------------------------------- | :----------------------------------------------------------- |
| geojson      | (FeatureCollection\|Feature\|Geometry) | 任意 GeoJSON 对象                                            |
| callback     | Function                               | 回调，参数依次是 previousValue、currentFeature、featureIndex |
| initialValue | (*)                                    | 要用作回调的第一个调用的第一个参数的值。                     |

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