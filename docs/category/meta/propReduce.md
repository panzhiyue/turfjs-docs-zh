# 属性累加(propReduce)

> Reduce properties in any GeoJSON object into a single value, similar to how Array.reduce works. However, in this case we lazily run the reduction, so an array of all properties is unnecessary.
> 将任何GeoJSON对象中的属性减少为单个值，类似于`Array.reduce`。但是，在本例中，我们延迟地运行缩减，因此没有必要使用所有属性的数组。

```text
> npm install @turf/meta
```

**参数**

| 参数         | 类型                         | 描述                                                         |
| :----------- | :--------------------------- | :----------------------------------------------------------- |
| geojson      | (FeatureCollection\|Feature) | any GeoJSON object                                           |
| callback     | Function                     | a method that takes (previousValue, currentProperties, featureIndex) |
| initialValue | (*)                          | Value to use as the first argument to the first call of the callback. |

**返回**

- The value that results from the reduction.

**示例**

```js
var features = turf.featureCollection([
    turf.point([26, 37], {foo: 'bar'}),
    turf.point([36, 53], {hello: 'world'})
]);

turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
  //=previousValue
  //=currentProperties
  //=featureIndex
  return currentProperties
});
```