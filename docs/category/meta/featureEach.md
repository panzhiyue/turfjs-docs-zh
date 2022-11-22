# feature遍历(featureEach)

```
npm install @turf/meta
```

> Iterate over features in any GeoJSON object, similar to Array.forEach.
> 遍历任何GeoJSON对象中的`feature`，类似于`Array.forEach`。

**参数**

| 参数     | 类型                                   | 描述                                          |
| :------- | :------------------------------------- | :-------------------------------------------- |
| geojson  | (FeatureCollection\|Feature\|Geometry) | 任意 GeoJSON 对象                             |
| callback | Function                               | 回调，参数依次是 currentFeature、featureIndex |

**返回**

undefined - undefined

**示例**

```js
var features = turf.featureCollection([
  turf.point([26, 37], {foo: 'bar'}),
  turf.point([36, 53], {hello: 'world'})
]);

turf.featureEach(features, function (currentFeature, featureIndex) {
  //=currentFeature
  //=featureIndex
});
```