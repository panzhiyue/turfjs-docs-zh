# 几何对象累加(geomReduce)

```
> npm install @turf/meta
```

> Reduce geometry in any GeoJSON object, similar to Array.reduce().
>
> 接收任意 GeoJSON 对象(包括要素集)，遍历它的每个 Geometry 并累加操作。类似于`Array.reduce()`。

**参数**

| 参数         | 类型                                 | 描述                                                         |
| :----------- | :----------------------------------- | :----------------------------------------------------------- |
| geojson      | FeatureCollection\|Feature\|Geometry | 任意 GeoJSON 对象                                            |
| callback     | Function                             | 回调，参数依次是 previousValue、currentGeometry、featureIndex、featureProperties、featureBBox、featureId |
| initialValue | (*)                                  | 初始值                                                       |

**返回**

- \* - reduce 产生的值

**示例**

```js
var features = turf.featureCollection([
    turf.point([26, 37], {foo: 'bar'}),
    turf.point([36, 53], {hello: 'world'})
]);

turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
  //=previousValue
  //=currentGeometry
  //=featureIndex
  //=featureProperties
  //=featureBBox
  //=featureId
  return currentGeometry
});
```